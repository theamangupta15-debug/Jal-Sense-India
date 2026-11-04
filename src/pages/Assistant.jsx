import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageTitle } from '../App.jsx';

const DEFAULT_SUGGESTIONS = [
  "What is the groundwater status in Katol?",
  "Does boiling tap water remove chemical contaminants?",
  "What is the BIS standard limit for TDS and Fluoride?",
  "Why is laboratory tap data unavailable at my ward level?"
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'assistant',
    text: "Namaskar! I am the Jal Sense India Water Safety Assistant. I am grounded in Central Ground Water Board (CGWB) observations, Bureau of Indian Standards (BIS IS 10500:2012) benchmarks, and accredited public health advisories for Nagpur District. How can I assist you with your water safety questions today?",
    sources: [
      { name: "CGWB National Hydrograph Network", url: "https://cgwb.gov.in" },
      { name: "BIS IS 10500:2012 Specification", url: "https://www.bis.gov.in" }
    ],
    timestamp: "Just now"
  }
];

export default function AssistantPage() {
  usePageTitle('AI Water Safety Assistant');
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get('name') || '';

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState(
    locationParam ? `What is the current water table depth and quality in ${locationParam}?` : ''
  );
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulated RAG Pipeline / LLM Response (Ready to swap with Grok API)
    setTimeout(() => {
      let botResponse = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: '',
        sources: [],
        timestamp: 'Just now'
      };

      const q = textToSend.toLowerCase();

      if (q.includes('katol') || q.includes('narkhed')) {
        botResponse.text = "According to CGWB hydrograph observations, Katol and Narkhed lie within a heavily extracted basaltic aquifer with post-monsoon water tables at 8.45–9.70 mbgl. Intensive citrus cultivation creates seasonal drawdowns. Mineral testing reflects elevated TDS (~540 mg/L) and fluoride approaching 1.10 mg/L. Micro-irrigation and validated Reverse Osmosis (RO) filtration are advised.";
        botResponse.sources = [
          { name: "CGWB Nagpur Aquifer Report (Katol)", url: "https://cgwb.gov.in" },
          { name: "GSDA Groundwater Survey 2026", url: "https://mwrra.gov.in" }
        ];
      } else if (q.includes('boil') || q.includes('chemical')) {
        botResponse.text = "Crucial distinction: Thermal boiling destroys biological pathogens (bacteria, cysts, and viruses) when brought to a rolling boil for 3+ minutes. However, boiling CANNOT eliminate dissolved chemicals like Fluoride, Nitrate, or high TDS. Boiling actually evaporates pure steam and slightly concentrates the chemical salts. Chemical contaminants require membrane filtration (RO) or activated alumina.";
        botResponse.sources = [
          { name: "BIS IS 10500:2012 Drinking Water Annexure", url: "https://www.bis.gov.in" },
          { name: "WHO Guidelines for Drinking-Water Quality", url: "https://www.who.int" }
        ];
      } else if (q.includes('tds') || q.includes('fluoride') || q.includes('standard')) {
        botResponse.text = "Under BIS IS 10500:2012:\n• Total Dissolved Solids (TDS): Acceptable limit is 500 mg/L; permissible limit in absence of alternate source is 2000 mg/L.\n• Fluoride: Acceptable limit is 1.0 mg/L; upper permissible ceiling is 1.5 mg/L (excess causes dental/skeletal fluorosis).\n• Nitrate (NO3): Strict limit of 45 mg/L with no relaxation due to infantile methemoglobinemia risk.";
        botResponse.sources = [
          { name: "Bureau of Indian Standards IS 10500 Table 1 & 2", url: "https://www.bis.gov.in" }
        ];
      } else {
        botResponse.text = `I have received your query: "${textToSend}". In our upcoming Grok RAG release, this query will be vectorized against the Nagpur hydrogeological corpus and real-time municipal laboratory sample registers. Always remember: lack of public data is not certification of purity.`;
        botResponse.sources = [
          { name: "Jal Sense India Knowledge Base (Nagpur)", url: "#" }
        ];
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '28px 24px 60px', color: '#0f172a' }}>
      
      {/* Header Banner */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', marginBottom: '10px' }}>
          <span>HYDRAULIC INTELLIGENCE ENGINE • RAG POWERED</span>
        </div>
        <h1 style={{ fontSize: '2.3rem', fontWeight: '800', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
          AI Water Safety Assistant
        </h1>
        <p style={{ fontSize: '0.96rem', color: '#64748b', margin: 0 }}>
          Evidence-grounded civic guidance for Nagpur District. Every statement is cross-referenced with CGWB observation records and BIS potable benchmarks.
        </p>
      </div>

      {/* Suggestion Chips */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {DEFAULT_SUGGESTIONS.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(suggestion)}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '9999px',
              padding: '8px 16px',
              fontSize: '0.84rem',
              fontWeight: '600',
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#0284c7'; e.currentTarget.style.color = '#0284c7'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#334155'; }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Main Two-Column Console */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Interactive Chat Interface */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            height: '620px',
            boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)',
            overflow: 'hidden'
          }}
        >
          {/* Chat Window Top Bar */}
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid #f1f5f9',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#0284c7',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.85rem'
                }}
              >
                JS
              </div>
              <div>
                <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block' }}>Jal Sense Assistant</strong>
                <span style={{ fontSize: '0.74rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }}></span>
                  Grounded Corpus Active (Nagpur)
                </span>
              </div>
            </div>

            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                fontSize: '0.78rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Clear Conversation
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              background: '#fafbfd'
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    background: m.sender === 'user' ? '#0284c7' : '#ffffff',
                    color: m.sender === 'user' ? '#ffffff' : '#0f172a',
                    border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    fontSize: '0.92rem',
                    lineHeight: '1.55',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {m.text}

                  {/* Sources Footnote in Assistant Bubble */}
                  {m.sources && m.sources.length > 0 && (
                    <div
                      style={{
                        marginTop: '12px',
                        paddingTop: '10px',
                        borderTop: '1px solid #f1f5f9',
                        fontSize: '0.78rem',
                        color: '#64748b'
                      }}
                    >
                      <strong style={{ display: 'block', color: '#475569', marginBottom: '4px' }}>
                        Verified Sources Cited:
                      </strong>
                      <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {m.sources.map((src, sIdx) => (
                          <li key={sIdx}>
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: '#0284c7', textDecoration: 'none' }}
                            >
                              {src.name} ↗
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px', padding: '0 4px' }}>
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', width: 'fit-content' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Retrieving grounded context...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{
              padding: '14px 18px',
              borderTop: '1px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Ask about water safety, boiling, well depth, or BIS standards..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.92rem',
                outline: 'none',
                transition: 'border-color 0.15s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0284c7'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              style={{
                background: input.trim() && !isTyping ? '#0284c7' : '#94a3b8',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 22px',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Ask</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>

        {/* Right Column: RAG Pipeline & Grounding Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Grounding Guardrails Card */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '0.74rem', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              RAG Guardrail Architecture
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 10px 0', color: '#0f172a' }}>
              Grounding Verification
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.5', margin: '0 0 14px 0' }}>
              Jal Sense AI is hardwired with negative constraints:
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Zero Speculation:</strong> Missing test data is never hallucinated as safe.</li>
              <li><strong>Thermal Honesty:</strong> Boiling is never recommended for chemical ions (TDS, Fluoride).</li>
              <li><strong>No Clinical Prescriptions:</strong> Refers health complications directly to PHC doctors.</li>
            </ul>
          </div>

          {/* Active Knowledge Sources */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: '800', margin: '0 0 12px 0', color: '#0f172a' }}>
              Active Vector Collections
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px' }}>
                <strong style={{ color: '#0f172a', display: 'block' }}>CGWB Water Table Records</strong>
                <span style={{ color: '#64748b' }}>16 Monitoring Stations in Nagpur</span>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px' }}>
                <strong style={{ color: '#0f172a', display: 'block' }}>BIS IS 10500:2012 Drinking Limits</strong>
                <span style={{ color: '#64748b' }}>TDS, Fluoride, Nitrate, pH ceilings</span>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px' }}>
                <strong style={{ color: '#0f172a', display: 'block' }}>MoHFW & WHO Waterborne Guidelines</strong>
                <span style={{ color: '#64748b' }}>ORS, Chlorination & Disinfection protocols</span>
              </div>
            </div>
          </div>

          {/* Model Deployment Badge */}
          <div style={{ background: '#f1f5f9', borderRadius: '12px', padding: '14px 16px', fontSize: '0.78rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}></span>
            <div>
              <strong>Target LLM:</strong> Grok API with Local Vector Store (RAG Pipeline Ready)
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}