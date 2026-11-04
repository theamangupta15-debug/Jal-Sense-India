import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { usePageTitle } from '../App.jsx';
export default function Home() {
  usePageTitle('Home'); const nav = useNavigate(); const [q, setQ] = useState('');
  return (<>
    <section className="hero"><p className="tagline">Understand Your Water. Protect Your Health.</p><h1>What is publicly known about the water where you live?</h1>
      <p>Groundwater levels and drinking-water quality are different questions. Jal Sense India keeps them apart, shows the source and date of every record, and says plainly when nothing is documented.</p>
      <form role="search" onSubmit={(e) => { e.preventDefault(); nav('/explore?q=' + encodeURIComponent(q)); }}>
        <label htmlFor="q">Search a place (pilot: Nagpur district)</label>
        <div className="row"><input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Katol" /><button>Search</button></div>
      </form>
      <p className="muted">Your location is never read automatically. Choose a place manually.</p></section>
    <div className="grid2">
      <section className="card"><h2>Groundwater</h2><p>Well readings from monitoring agencies, shown per well or taluka, never per street. <Link to="/explore">Pick a location</Link> to see what exists.</p></section>
      <section className="card"><h2>Drinking-water quality</h2><p>Test results appear only where a published record exists. For Nagpur city none were found yet; the page explains how to get water tested.</p></section>
    </div>
    <section className="card"><h2>Transparency</h2><p>Every value shows source, date and scope. Sources and their verification status are on the <Link to="/methodology">sources page</Link>.</p></section>
  </>);
}
