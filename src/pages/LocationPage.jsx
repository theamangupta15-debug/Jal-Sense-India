import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLocation, getPath, getChildren } from '../services/locationService.js';
import { getGroundwater, getWaterQuality } from '../services/waterService.js';
import { Crumbs, Empty } from '../components/Bits.jsx';
import { missingProvenance } from '../lib/format.js';
import { usePageTitle } from '../App.jsx';

function Records({ res, what }) {
  if (!res) return <p role="status">Loading…</p>;
  if (res.status === 'error') return <Empty title="Could not load">{res.reason}. Nothing is being shown instead.</Empty>;
  const recs = res.status === 'ok' && Array.isArray(res.data) ? res.data : [];
  if (!recs.length) return <Empty>{res.reason || `No ${what} records for this area.`}</Empty>;
  return <ul>{recs.map((r, i) => { const miss = missingProvenance(r);
    return <li key={i}>{miss.length ? <Empty title="Record withheld">Missing {miss.join(', ')}.</Empty>
      : <>{r.label}: <strong>{r.value ?? 'Data unavailable'}{r.value != null && r.unit ? ' ' + r.unit : ''}</strong> <span className="muted">({r.status || 'unverified'} · {r.source} · {r.date} · {r.scope})</span></>}</li>; })}</ul>;
}

export default function LocationPage() {
  const { id } = useParams(); const [loc, setLoc] = useState(undefined); const [path, setPath] = useState([]);
  const [kids, setKids] = useState([]); const [gw, setGw] = useState(); const [wq, setWq] = useState();
  usePageTitle(loc ? loc.name : 'Location');
  useEffect(() => { (async () => {
    const l = await getLocation(id); setLoc(l); if (!l) return;
    setPath(await getPath(id)); setKids(await getChildren(id)); setGw(await getGroundwater(id)); setWq(await getWaterQuality(id));
  })(); }, [id]);
  if (loc === undefined) return <p role="status">Loading…</p>;
  if (!loc) return <Empty title="Location not found">Try <Link to="/explore">exploring locations</Link>.</Empty>;
  return (<>
    <Crumbs path={path} /><h1>{loc.name} <span className="muted">{loc.level}</span></h1>
    {loc.coverage && <p className="muted">What exists (Phase 1 research): groundwater, {loc.coverage.groundwater}; drinking-water quality, {loc.coverage.quality}.</p>}
    {kids.length > 0 && <p>Areas inside: {kids.map((k, i) => <span key={k.id}>{i ? ', ' : ''}<Link to={'/location/' + k.id}>{k.name}</Link></span>)}</p>}
    <section className="card" aria-labelledby="gw"><h2 id="gw">Groundwater</h2>
      <p className="muted">Depth to water in monitoring wells. A well reading describes that well, not the water supplied to a home.</p>
      <Records res={gw} what="groundwater" />
      <Empty title="No trend chart">A chart appears only when enough real observations exist.</Empty></section>
    <section className="card" aria-labelledby="wq"><h2 id="wq">Drinking-water quality</h2>
      <p className="muted">Laboratory or field-kit results compared with IS 10500. No status is shown without documented rules and measurements.</p>
      <Records res={wq} what="drinking-water test" />
      <h3>Next steps when evidence is insufficient</h3>
      <ul><li>Ask the water supplier or municipal body for recent test reports for your area.</li><li>Use an accredited laboratory to test your own supply; microbial and chemical tests answer different questions.</li><li>Boiling addresses microbes but does not remove arsenic, fluoride or nitrate.</li></ul></section>
    <p><Link to="/health">Health and prevention</Link> · <Link to="/methodology">Sources and methodology</Link></p>
  </>);
}
