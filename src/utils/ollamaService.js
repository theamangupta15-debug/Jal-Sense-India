const OLLAMA_HOST = 'http://localhost:11434';

// Grounded civic facts injected as system context
const JAL_SENSE_SYSTEM_PROMPT = `You are the Jal Sense AI Civic Water Intelligence Assistant for Nagpur District, Maharashtra.
You must adhere strictly to the following public health and hydrogeological rules:

1. THERMAL HONESTY: Boiling water vigorously kills microbial pathogens (bacteria, viruses, cysts). Boiling DOES NOT remove chemical contaminants, heavy metals, Fluoride, Nitrate, or high TDS. Prolonged boiling actually increases dissolved chemical concentrations through evaporation.
2. BIS IS 10500:2012 DRINKING WATER BENCHMARKS:
   - TDS: 500 mg/L (acceptable), 2000 mg/L (permissible max).
   - pH: 6.5 to 8.5.
   - Fluoride (F): 1.0 mg/L (acceptable), 1.5 mg/L (permissible max).
   - Nitrate (NO3): 45 mg/L strict limit (no relaxation permitted).
3. HYDROLOGICAL DATA FOR NAGPUR TALUKAS:
   - Katol: 8.4 - 12.2 mbgl (meters below ground level), seasonal stress due to citrus irrigation.
   - Saoner / Kalmeshwar: Basaltic unconfined aquifers, 7.5 - 11.0 mbgl.
   - Hingna: Semi-critical extraction zones near industrial belts.
4. ABSENCE OF DATA: If public lab records are unavailable for an area, state clearly that lack of public data does not certify tap water as safe.
5. NO MEDICAL DIAGNOSIS: Provide hydration and ORS guidance for acute diarrhea, but explicitly advise consulting a Primary Health Centre (PHC) or GMCH Nagpur.

Keep answers concise, objective, and citizen-friendly.`;

export async function askOllama({ model = 'llama3.2', messages, onStreamChunk }) {
  const formattedMessages = [
    { role: 'system', content: JAL_SENSE_SYSTEM_PROMPT },
    ...messages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }))
  ];

  try {
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: formattedMessages,
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama HTTP Error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter((line) => line.trim() !== '');

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.message?.content) {
            fullResponse += json.message.content;
            if (onStreamChunk) {
              onStreamChunk(fullResponse);
            }
          }
        } catch (e) {
          // ignore partial json chunks
        }
      }
    }

    return fullResponse;
  } catch (error) {
    console.error('Ollama connection failed:', error);
    throw error;
  }
}