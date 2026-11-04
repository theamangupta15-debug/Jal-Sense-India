import { useState } from 'react';
import { usePageTitle } from '../App.jsx';

const STARTER_QUESTIONS = [
  'What is the groundwater status in Katol?',
  'Does boiling tap water remove chemical contaminants?',
  'What is the BIS standard limit for TDS and Fluoride?',
  'Why is water quality data unavailable for my locality?'
];

export default function Assistant() {
  usePageTitle('Water Assistant');

  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Namaskar. I am the Jal Sense India Water Safety Assistant. I can help explain verified groundwater observations, BIS IS 10500 standards, and public health guidance for Nagpur District. I do not fabricate numbers or give medical diagnoses.',
      citations: [{ sourceName: 'Jal Sense India Pilot Registry', url: 'https://indiawris.gov.in' }],
      limitations: []
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const res = await fetch(`${baseUrl}/api/v1/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, locationId: 'LOC-MH-NAG' })
      });

      const json = await res.json();
      if (json && json.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'assistant',
            text: json.data.answer,
            citations: json.provenance || [],
            limitations: json.limitations || []
          }
        ]);
      } else {
        throw new Error(json.error?.message || 'Server error');
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: 'Unable to reach backend assistant service. Please verify server is running on port 5000.',
          citations: [],
          limitations: ['Network or connection error']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 16px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#0f3958', margin: '0 0 6px 0' }}>AI Water Safety Assistant</h1>
        <p style={{ color: '#475569', margin: 0 }}>
          Evidence-grounded water intelligence for Nagpur District. Every claim is linked to verified records.
        </p>
      </header>

      {/* Suggested Question Chips */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {STARTER_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(q)}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '16px',
              padding: '6px 12px',
              fontSize: '0.85rem',
              color: '#0f3958',
              cursor: 'pointer'
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px', minHeight: '380px', maxHeight: '550px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              background: m.sender === 'user' ? '#0284c7' : '#f8fafc',
              color: m.sender === 'user' ? '#fff' : '#1e293b',
              padding: '12px 16px',
              borderRadius: '8px',
              border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
              lineHeight: '1.5'
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '0.75rem', marginBottom: '4px', opacity: 0.8 }}>
              {m.sender === 'user' ? 'You' : 'Jal Sense Assistant'}
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>

            {/* Citations Box */}
            {m.citations && m.citations.length > 0 && (
              <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #cbd5e1', fontSize: '0.8rem', color: '#475569' }}>
                <strong>Verified Sources Cited:</strong>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
                  {m.citations.map((c, i) => (
                    <li key={i}>
                      <a href={c.url} target="_blank" rel="noreferrer" style={{ color: '#0369a1', textDecoration: 'underline' }}>
                        {c.sourceName}
                      </a> {c.scope ? `(${c.scope})` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Limitations Notice */}
            {m.limitations && m.limitations.length > 0 && (
              <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#b45309', background: '#fef3c7', padding: '4px 8px', borderRadius: '4px' }}>
                <strong>Limitation:</strong> {m.limitations.join('; ')}
              </div>
            )}
          </div>
        ))}
        {loading && <div style={{ color: '#64748b', fontStyle: 'italic', fontSize: '0.9rem' }}>Consulting verified water tools...</div>}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        style={{ display: 'flex', gap: '8px', marginTop: '14px' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about water quality, standards, or groundwater..."
          style={{ flex: 1, padding: '12px 14px', borderRadius: '6px', border: '1px solid #94a3b8', fontSize: '1rem' }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: '#0f3958',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '0 20px',
            fontWeight: 600,
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer'
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}