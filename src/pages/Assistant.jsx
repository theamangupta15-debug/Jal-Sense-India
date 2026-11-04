import { useState } from 'react';
import { ask } from '../services/assistantService.js';
import { usePageTitle } from '../App.jsx';
const ex = ['What is the latest available groundwater level in my selected area?','Explain the drinking-water quality results for this location.','What does a high nitrate measurement mean?','How can I reduce the risk of waterborne diseases?','Where can I get my drinking water tested?'];
export default function Assistant() { usePageTitle('Assistant');
  const [msgs, setMsgs] = useState([]); const [t, setT] = useState(''); const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  async function send(e) { e.preventDefault(); const q = t.trim(); if (!q) return; setT(''); setErr(''); setBusy(true);
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    try { const r = await ask(q);
      setMsgs((m) => [...m, r.status === 'ok' ? { role: 'assistant', text: String(r.data?.answer ?? ''), cites: r.provenance } : { role: 'system', text: 'The assistant is not connected, so no answer was generated. Nothing here was retrieved from records.' }]);
    } catch (x) { setErr(x.message); } setBusy(false); }
  return (<><h1>Jal Sense India water safety assistant</h1>
    <p className="muted">Interface only. It answers only when the backend is connected, and then shows sources.</p>
    <div className="row wrapr">{ex.map((x) => <button key={x} className="ghost" onClick={() => setT(x)}>{x}</button>)}</div>
    <div aria-live="polite" className="chat">{msgs.map((m, i) => <p key={i} className={m.role}><strong>{m.role === 'user' ? 'You' : m.role === 'system' ? 'Notice' : 'Assistant'}:</strong> {m.text}{m.cites?.map((c, j) => <span key={j} className="muted"> [{c.source || 'source'}]</span>)}</p>)}
      {busy && <p role="status">Working…</p>}{err && <p role="alert">Error: {err}</p>}</div>
    <form onSubmit={send}><label htmlFor="m">Your question</label><div className="row"><input id="m" value={t} onChange={(e) => setT(e.target.value)} /><button disabled={busy}>Send</button>
      <button type="button" className="ghost" onClick={() => { setMsgs([]); setErr(''); }}>Clear</button></div></form></>); }
