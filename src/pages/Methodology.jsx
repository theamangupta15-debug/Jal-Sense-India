import { sources } from '../data/sources.js';
import { usePageTitle } from '../App.jsx';
export default function Methodology() { usePageTitle('Sources and methodology');
  return (<><h1>Sources and methodology</h1>
    <ul><li>Groundwater levels (wells) and drinking-water test results (samples) are different measurements and are never combined.</li>
      <li>Every record shows source, date and geographic scope; records missing these are withheld.</li>
      <li>Drinking-water results are compared with IS 10500 acceptable and permissible limits. Classification rules and freshness thresholds are pending configuration.</li>
      <li>Conflicting statements are shown with their baselines, not merged.</li></ul>
    <h2>Sources</h2><ul className="list">{sources.map((s) => <li key={s.name}>{s.url ? <a href={s.url} rel="noopener noreferrer">{s.name}</a> : s.name}
      {' '}<strong>{s.status === 'seen' ? '(found in research)' : '(pending verification)'}</strong> <span className="muted">{s.note}</span></li>)}</ul></>); }
