import { Link } from 'react-router-dom';
import { UNAVAILABLE } from '../lib/format.js';
export const Empty = ({ title = UNAVAILABLE, children }) => <div className="empty" role="status"><strong>{title}</strong><p>{children}</p></div>;
export const Crumbs = ({ path }) => <nav aria-label="Location hierarchy" className="crumbs">{path.map((p, i) => i < path.length - 1
  ? <span key={p.id}><Link to={p.level === 'country' || p.level === 'state' ? '/explore?in=' + p.id : '/location/' + p.id}>{p.name}</Link> / </span>
  : <span key={p.id} aria-current="page">{p.name}</span>)}</nav>;
export const LocationRow = ({ l, path }) => <li><Link to={'/location/' + l.id}>{l.name}</Link> <span className="muted">{l.level}{path ? ' · ' + path : ''}</span></li>;
