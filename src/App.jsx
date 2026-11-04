import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import LocationPage from './pages/LocationPage.jsx';
import MapPage from './pages/MapPage.jsx';
import Health from './pages/Health.jsx';
import Assistant from './pages/Assistant.jsx';
import Methodology from './pages/Methodology.jsx';
import About from './pages/About.jsx';

const nav = [['/explore','Explore'],['/map','Map'],['/health','Health'],['/assistant','Assistant'],['/methodology','Sources'],['/about','About']];

export function usePageTitle(t) { useEffect(() => { document.title = `${t} · Jal Sense India`; }, [t]); }

export default function App() {
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <header className="top"><div className="wrap bar">
      <Link to="/" className="brand">Jal Sense India</Link>
      <nav aria-label="Main"><ul>{nav.map(([to,l]) => <li key={to}><NavLink to={to}>{l}</NavLink></li>)}</ul></nav>
    </div></header>
    <main id="main" className="wrap" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/location/:id" element={<LocationPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/health" element={<Health />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<p>Page not found. <Link to="/">Go home</Link></p>} />
      </Routes>
    </main>
    <footer className="wrap foot">Jal Sense India shows what is publicly documented. It does not certify any water as safe and does not diagnose illness.</footer>
  </>);
}
