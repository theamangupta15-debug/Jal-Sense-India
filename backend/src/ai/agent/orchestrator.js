import { TOOL_REGISTRY } from '../tools/toolRegistry.js';
import { LLMProvider } from '../providers/llmProvider.js';
import { SafetyGuardrails } from '../safety/guardrails.js';

export class AgentOrchestrator {
  static async handleUserMessage({ message, locationId = 'LOC-MH-NAG', conversationHistory = [] }) {
    const cleanMessage = SafetyGuardrails.sanitizeInput(message);
    const toolExecutions = [];
    const citations = [];
    const limitations = [];

    // 1. Resolve Location if user mentioned a place name
    let activeLocationId = locationId;
    const locationKeywords = ['nagpur', 'katol', 'saoner', 'umred', 'ramtek', 'kalmeshwar', 'hingna', 'narkhed', 'parseoni', 'mauda', 'kamptee', 'kuhi', 'bhivapur'];
    const matchedKw = locationKeywords.find((k) => cleanMessage.toLowerCase().includes(k));
    
    if (matchedKw) {
      const resolved = await TOOL_REGISTRY.resolve_location.execute({ query: matchedKw });
      if (resolved) {
        activeLocationId = resolved.locationId;
        toolExecutions.push({ toolName: 'resolve_location', result: resolved });
      }
    }

    // 2. Determine necessary tools based on user intent
    const lower = cleanMessage.toLowerCase();

    // Standard lookup
    if (lower.includes('standard') || lower.includes('limit') || lower.includes('bis') || lower.includes('is 10500')) {
      const paramMatch = ['ph', 'tds', 'turbidity', 'fluoride', 'nitrate', 'arsenic', 'coliform'].find(p => lower.includes(p)) || 'tds';
      const std = await TOOL_REGISTRY.get_bis_standard.execute({ parameterCode: paramMatch });
      if (std) {
        toolExecutions.push({ toolName: 'get_bis_standard', result: std });
        citations.push({
          sourceName: 'Bureau of Indian Standards (IS 10500:2012)',
          url: 'https://www.bis.gov.in/other/DrinWatIS10500.pdf',
          scope: 'National Drinking Water Benchmark'
        });
      }
    }

    // Health / Boiling guidance
    if (lower.includes('boil') || lower.includes('disease') || lower.includes('cholera') || lower.includes('typhoid') || lower.includes('safe')) {
      const guidance = await TOOL_REGISTRY.search_official_guidance.execute({ topic: 'boiling' });
      toolExecutions.push({ toolName: 'search_official_guidance', result: guidance });
      citations.push({
        sourceName: 'National Centre for Disease Control (IDSP/NCDC)',
        url: 'https://ncdc.mohfw.gov.in',
        scope: 'Public Health & Disease Prevention Advisory'
      });
    }

    // Location Intelligence (Groundwater + Drinking Water)
    const intel = await TOOL_REGISTRY.get_location_intelligence.execute({ locationId: activeLocationId });
    if (intel) {
      toolExecutions.push({ toolName: 'get_location_intelligence', result: intel });
      
      if (intel.groundwaterIntelligence?.hasStationData) {
        citations.push({
          sourceName: 'Central Ground Water Board (CGWB) Western Region',
          url: 'https://indiawris.gov.in/wris/#/groundWater',
          scope: `${intel.location.name} Station Observation Wells`
        });
      } else {
        limitations.push(`No dedicated observation well station records are mapped directly to ${intel.location.name}.`);
      }

      if (!intel.waterQualityIntelligence?.hasLabData) {
        limitations.push(`No public laboratory test reports are published for ${intel.location.name} at ward or locality level.`);
      }
    }

    // 3. Generate Answer via LLMProvider
    const systemInstruction = `You are the Jal Sense India Water Intelligence Assistant for Nagpur District.
Rules:
1. Base all answers strictly on the provided tool results. Never invent water quality metrics or groundwater depths.
2. If data is absent for an area, state the limitation clearly. Never label unmeasured water as "safe".
3. Boiling destroys bacterial/viral pathogens, but CANNOT remove chemical contaminants like Fluoride, Nitrate, or Arsenic.
4. Do not provide medical diagnoses.
5. Provide concise, helpful civic answers.`;

    const rawAnswer = await LLMProvider.generateAnswer({
      prompt: `User Question: ${cleanMessage}\nContext Location: ${activeLocationId}\nTool Execution Results: ${JSON.stringify(toolExecutions)}`,
      systemInstruction,
      toolResults: toolExecutions
    });

    const finalAnswer = SafetyGuardrails.postProcessSafetyCheck(rawAnswer);

    return {
      answer: finalAnswer,
      citations: Array.from(new Map(citations.map((c) => [c.sourceName, c])).values()), // Deduplicate
      limitations,
      toolsUsed: toolExecutions.map((t) => t.toolName)
    };
  }
}