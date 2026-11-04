import { Link } from 'react-router-dom';
import { Empty } from '../components/Bits.jsx';
import { usePageTitle } from '../App.jsx';
export default function MapPage() { usePageTitle('Map');
  return (<><h1>Map</h1>
    <Empty title="Map not yet available">Needs verified well coordinates and taluka boundaries (Phase 1b), then Leaflet with a licensed tile provider. No hotspots or boundaries are drawn without verified geometry.</Empty>
    <p>Use the <Link to="/explore">location list</Link> in the meantime.</p></>); }
