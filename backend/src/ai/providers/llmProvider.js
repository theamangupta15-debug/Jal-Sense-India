import { ENV } from '../../config/env.js';

export class LLMProvider {
  /**
   * Generates completion with tool execution history
   */
  static async generateAnswer({ prompt, systemInstruction, toolResults = [] }) {
    const apiKey = process.env.AI_API_KEY;
    const provider = process.env.AI_PROVIDER || 'offline_deterministic';

    // In test environment, or if no API key or offline mode is set, use deterministic synthesizer immediately
    if (ENV.NODE_ENV === 'test' || !apiKey || provider === 'offline_deterministic') {
      return this.deterministicSynthesizer(prompt, toolResults);
    }

    try {
      const response = await fetch(`${process.env.AI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai'}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL || 'gemini-1.5-flash',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: prompt }
          ],
          temperature: 0.1,
          max_tokens: 800
        }),
        signal: AbortSignal.timeout(Number(process.env.AI_REQUEST_TIMEOUT_MS) || 4000)
      });

      if (!response.ok) {
        throw new Error(`LLM upstream returned status ${response.status}`);
      }

      const json = await response.json();
      return json.choices?.[0]?.message?.content || this.deterministicSynthesizer(prompt, toolResults);
    } catch (err) {
      console.warn('[LLMProvider Warning] Falling back to deterministic synthesizer:', err.message);
      return this.deterministicSynthesizer(prompt, toolResults);
    }
  }

  static deterministicSynthesizer(prompt, toolResults) {
    if (!toolResults || toolResults.length === 0) {
      return "I could not find verified water records matching your question. Under our data integrity rules, I will not estimate or fabricate readings.";
    }

    const sections = [];

    const intelTool = toolResults.find((t) => t.toolName === 'get_location_intelligence');
    if (intelTool && intelTool.result) {
      const { location, groundwaterIntelligence, waterQualityIntelligence, recommendations } = intelTool.result;
      sections.push(`### Water Intelligence for ${location.name}\n`);
      if (groundwaterIntelligence?.hasStationData) {
        sections.push(`**Groundwater Observations (CGWB):**\n${groundwaterIntelligence.analysis.semanticSummary}`);
      } else {
        sections.push(`**Groundwater Observations:** No dedicated observation well station records are mapped directly to this sub-unit.`);
      }

      if (waterQualityIntelligence?.hasLabData) {
        sections.push(`\n**Drinking Water Quality (BIS IS 10500):**\n${waterQualityIntelligence.concernClassification.summary}`);
      } else {
        sections.push(`\n**Drinking Water Quality:** No public, machine-readable laboratory water quality test reports exist for this location at ward or locality level. We cannot certify tap water as safe based on missing data.`);
      }

      if (recommendations && recommendations.length > 0) {
        sections.push(`\n**Evidence-Based Guidance:**\n${recommendations.map(r => `• ${r.text}`).join('\n')}`);
      }
    }

    const standardTool = toolResults.find((t) => t.toolName === 'get_bis_standard');
    if (standardTool && standardTool.result) {
      const s = standardTool.result;
      sections.push(`### Standard Benchmark for ${s.name} (${s.standard})\n• **Acceptable Limit:** ${s.acceptableLimit} ${s.unit}\n• **Permissible Limit:** ${s.permissibleLimit} ${s.unit}\n• **Health Relevance:** ${s.healthRelevance}`);
    }

    const healthTool = toolResults.find((t) => t.toolName === 'search_official_guidance');
    if (healthTool && healthTool.result) {
      sections.push(`\n**Public Health Guidance:**\n${healthTool.result.map(h => `• **${h.title}**: ${h.chemicalVsBoilingNote || h.prevention}`).join('\n')}`);
    }

    return sections.length > 0 ? sections.join('\n\n') : "I have checked our records, but there is insufficient data to answer this specific inquiry.";
  }
}
