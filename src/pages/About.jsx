import { usePageTitle } from '../App.jsx';
export default function About() { usePageTitle('About');
  return (<><h1>About and feedback</h1><p>Jal Sense India is a pilot for Nagpur, Maharashtra. It collects no personal data.</p>
    <h2>Report a data issue</h2><p className="muted">Frontend-only: this form does not send or store anything yet, and nothing is passed to any authority.</p>
    <form onSubmit={(e) => e.preventDefault()}><label htmlFor="f">Describe the issue</label><textarea id="f" rows="4" /><button disabled>Submit (not available yet)</button></form></>); }
