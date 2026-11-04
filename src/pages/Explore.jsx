import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchLocations, getChildren, getPath } from '../services/locationService.js';
import { Crumbs, LocationRow, Empty } from '../components/Bits.jsx';
import { usePageTitle } from '../App.jsx';
export default function Explore() {
  usePageTitle('Explore locations');
  const [sp, setSp] = useSearchParams(); const q = sp.get('q') || ''; const at = sp.get('in') || 'in';
  const [rows, setRows] = useState([]); const [path, setPath] = useState([]);
  useEffect(() => { (async () => {
    if (q) { const r = await searchLocations(q);
      setRows(await Promise.all(r.map(async (l) => ({ l, path: (await getPath(l.parentId)).map((p) => p.name).join(' › ') })))); setPath([]); }
    else { setPath(await getPath(at)); setRows((await getChildren(at)).map((l) => ({ l }))); }
  })(); }, [q, at]);
  return (<>
    <h1>Explore locations</h1>
    <form role="search" onSubmit={(e) => { e.preventDefault(); setSp({ q: new FormData(e.target).get('q') }); }}>
      <label htmlFor="s">Search by name</label>
      <div className="row"><input id="s" name="q" defaultValue={q} /><button>Search</button>{q && <button type="button" className="ghost" onClick={() => setSp({})}>Browse instead</button>}</div>
    </form>
    {!q && <Crumbs path={path} />}
    <p className="muted" aria-live="polite">{q ? `${rows.length} match(es) for "${q}". The same name can refer to different levels; the path shows which.` : 'Only configured areas are listed. Not every locality is covered.'}</p>
    {rows.length ? <ul className="list">{rows.map(({ l, path: p }) => <LocationRow key={l.id} l={l} path={p} />)}</ul>
      : <Empty title="No matching location">This pilot lists only Nagpur district and its talukas. Try a taluka name, or browse.</Empty>}
  </>);
}
