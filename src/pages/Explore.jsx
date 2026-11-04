import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../App.jsx';

const NAGPUR_AREAS = [
  { id: 'LOC-MH-NAG', name: 'Nagpur District', level: 'District', hasGw: true, hasWq: false, stations: '6 Active Stations' },
  { id: 'LOC-MH-NAG-CITY', name: 'Nagpur City', level: 'City', hasGw: false, hasWq: false, stations: 'Municipal Zone' },
  { id: 'LOC-MH-NAG-TAL-KAT', name: 'Katol', level: 'Taluka', hasGw: true, hasWq: false, stations: 'Katol Well Station' },
  { id: 'LOC-MH-NAG-TAL-SAO', name: 'Saoner', level: 'Taluka', hasGw: true, hasWq: false, stations: 'Saoner Well Station' },
  { id: 'LOC-MH-NAG-TAL-KAL', name: 'Kalmeshwar', level: 'Taluka', hasGw: true, hasWq: false, stations: 'Kalmeshwar Station' },
  { id: 'LOC-MH-NAG-TAL-RAM', name: 'Ramtek', level: 'Taluka', hasGw: true, hasWq: false, stations: 'Ramtek Well Station' },
  { id: 'LOC-MH-NAG-TAL-UMR', name: 'Umred', level: 'Taluka', hasGw: true, hasWq: false, stations: 'Umred Station' },
  { id: 'LOC-MH-NAG-TAL-HIN', name: 'Hingna', level: 'Taluka', hasGw: true, hasWq: false, stations: 'Hingna Well Station' },
  { id: 'LOC-MH-NAG-TAL-NAR', name: 'Narkhed', level: 'Taluka', hasGw: false, hasWq: false, stations: 'Regional Coverage' },
  { id: 'LOC-MH-NAG-TAL-PAR', name: 'Parseoni', level: 'Taluka', hasGw: false, hasWq: false, stations: 'Regional Coverage' },
  { id: 'LOC-MH-NAG-TAL-MAU', name: 'Mauda', level: 'Taluka', hasGw: false, hasWq: false, stations: 'Regional Coverage' },
  { id: 'LOC-MH-NAG-TAL-KAM', name: 'Kamptee', level: 'Taluka', hasGw: false, hasWq: false, stations: 'Regional Coverage' },
  { id: 'LOC-MH-NAG-TAL-RUR', name: 'Nagpur Rural', level: 'Taluka', hasGw: false, hasWq: false, stations: 'Regional Coverage' },
  { id: 'LOC-MH-NAG-TAL-URB', name: 'Nagpur Urban', level: 'Taluka', hasGw: false, hasWq: false, stations: 'Regional Coverage' },
  { id: 'LOC-MH-NAG-TAL-KUH', name: 'Kuhi', level: 'Taluka', hasGw: false, hasWq: false, stations: 'Regional Coverage' },
  { id: 'LOC-MH-NAG-TAL-BHI', name: 'Bhivapur', level: 'Taluka', hasGw: false, hasWq: false, stations: 'Regional Coverage' }
];

export default function Explore() {
  usePageTitle('Explore Areas');

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');

  const filteredAreas = useMemo(() => {
    return NAGPUR_AREAS.filter((area) => {
      const matchesSearch = area.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesLevel = levelFilter === 'ALL' || area.level.toUpperCase() === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, levelFilter]);

  return (
    <div className="explore-page-container">
      {/* Page Header */}
      <header className="explore-header">
        <div className="header-badge">Administrative Data Registry</div>
        <h1 className="explore-title">Explore Water Information by Area</h1>
        <p className="explore-subtitle">
          Browse verified groundwater stations, monitoring availability, and laboratory test coverage across Nagpur District and its 13 talukas.
        </p>
      </header>

      {/* Search & Filter Toolbar */}
      <section className="explore-toolbar-card">
        <div className="search-input-group">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by area name (e.g., Katol, Saoner, Ramtek)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        {/* Level Filters */}
        <div className="filter-pill-group">
          {['ALL', 'DISTRICT', 'CITY', 'TALUKA'].map((lvl) => (
            <button
              key={lvl}
              className={`filter-pill ${levelFilter === lvl ? 'active' : ''}`}
              onClick={() => setLevelFilter(lvl)}
            >
              {lvl === 'ALL' ? 'All Areas' : lvl.charAt(0) + lvl.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Results Header */}
      <div className="results-meta-bar">
        <span>Showing <strong>{filteredAreas.length}</strong> administrative areas</span>
        {searchQuery && <span className="query-tag">Filtered by: "{searchQuery}"</span>}
      </div>

      {/* Areas Grid */}
      {filteredAreas.length > 0 ? (
        <div className="areas-grid">
          {filteredAreas.map((area) => (
            <article key={area.id} className="area-card">
              <div className="area-card-top">
                <div>
                  <span className={`level-tag tag-${area.level.toLowerCase()}`}>{area.level}</span>
                  <h2 className="area-name">{area.name}</h2>
                </div>
                <div className="hierarchy-indicator">Nagpur, MH</div>
              </div>

              {/* Data Availability Indicators */}
              <div className="area-metrics">
                <div className="metric-row">
                  <span className="metric-label">Groundwater (CGWB):</span>
                  <span className={`status-tag ${area.hasGw ? 'tag-available' : 'tag-regional'}`}>
                    {area.hasGw ? '✓ Active Well Station' : 'Regional Model'}
                  </span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Drinking Water (NMC):</span>
                  <span className="status-tag tag-untested">
                    {area.hasWq ? '✓ Laboratory Tested' : '⚠️ Ward Lab Data Missing'}
                  </span>
                </div>
                <div className="metric-row station-row">
                  <span className="metric-label">Observation Link:</span>
                  <span className="station-text">{area.stations}</span>
                </div>
              </div>

              {/* Single Full-Width Action Button */}
              <div className="area-card-actions">
                <Link to={`/location/${area.id}`} className="btn-card-primary" style={{ width: '100%', textAlign: 'center' }}>
                  View Full Report →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-search-state">
          <div className="empty-icon">📂</div>
          <h3>No matching administrative area found</h3>
          <p>We could not find an area matching "{searchQuery}". Try searching for another taluka in Nagpur.</p>
          <button className="btn-reset" onClick={() => { setSearchQuery(''); setLevelFilter('ALL'); }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}