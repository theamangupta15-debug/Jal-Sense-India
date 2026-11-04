import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../App.jsx';

const NAGPUR_LOCATIONS = [
  { id: 'LOC-MH-NAG', name: 'Nagpur District', level: 'District' },
  { id: 'LOC-MH-NAG-CITY', name: 'Nagpur City', level: 'City' },
  { id: 'LOC-MH-NAG-TAL-KAT', name: 'Katol', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-NAR', name: 'Narkhed', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-SAO', name: 'Saoner', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-KAL', name: 'Kalmeshwar', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-RAM', name: 'Ramtek', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-PAR', name: 'Parseoni', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-MAU', name: 'Mauda', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-KAM', name: 'Kamptee', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-RUR', name: 'Nagpur Rural', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-URB', name: 'Nagpur Urban', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-HIN', name: 'Hingna', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-UMR', name: 'Umred', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-KUH', name: 'Kuhi', level: 'Taluka' },
  { id: 'LOC-MH-NAG-TAL-BHI', name: 'Bhivapur', level: 'Taluka' }
];

export default function Home() {
  usePageTitle('Home');

  const [selectedId, setSelectedId] = useState('LOC-MH-NAG');
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setFetchError(null);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    fetch(`${baseUrl}/api/v1/locations/${encodeURIComponent(selectedId)}/intelligence`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json && json.success) {
          setIntel(json.data);
        } else {
          setIntel(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setFetchError('Backend service unreachable or database offline.');
        setLoading(false);
      });
  }, [selectedId]);

  const activeLocObj = NAGPUR_LOCATIONS.find((l) => l.id === selectedId) || NAGPUR_LOCATIONS[0];

  return (
    <div className="home-dashboard">
      {/* Hero Header Section */}
      <section className="hero-banner">
        <div className="hero-badge">Civic Water Intelligence • Nagpur Pilot</div>
        <h1 className="hero-title">Understand Your Water. Protect Your Health.</h1>
        <p className="hero-subtitle">
          Evidence-based groundwater monitoring, BIS drinking water benchmarks, and public-health prevention guidance for Nagpur District.
        </p>
      </section>

      {/* Interactive Location Picker */}
      <section className="selector-card">
        <div className="selector-header">
          <div className="selector-icon">📍</div>
          <div>
            <label htmlFor="area-select" className="selector-label">
              Select Administrative Area
            </label>
            <span className="selector-sub">Filter observations by district, city, or taluka</span>
          </div>
        </div>

        <div className="selector-controls">
          <div className="custom-select-wrap">
            <select
              id="area-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="styled-select"
            >
              {NAGPUR_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.level})
                </option>
              ))}
            </select>
          </div>

          <div className="selector-actions">
            <Link to={`/location/${selectedId}`} className="btn-secondary">
              Open Full Area Report →
            </Link>
            <Link to="/explore" className="btn-ghost">
              Browse All Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Loading & Error States */}
      {loading && (
        <div className="state-card state-loading">
          <div className="spinner"></div>
          <span>Loading verified data records for {activeLocObj.name}...</span>
        </div>
      )}

      {fetchError && (
        <div className="state-card state-error">
          <span className="error-icon">⚠️</span>
          <div>
            <strong>Service Notice:</strong> {fetchError}
            <div className="error-sub">Ensure the Express server is running on <code>http://localhost:5000</code></div>
          </div>
        </div>
      )}

      {/* Main Intelligence Grid */}
      {!loading && intel && (
        <main className="dashboard-content">
          {/* Main Assessment Header Card */}
          <section className="intel-card main-assessment">
            <div className="card-top-bar">
              <div>
                <span className="area-type-tag">{intel.location?.level || activeLocObj.level}</span>
                <h2 className="card-heading">{intel.location?.name || activeLocObj.name} Assessment</h2>
              </div>
              <span className={`status-pill status-${intel.waterQualityIntelligence?.concernClassification?.level || 'insufficient_evidence'}`}>
                {intel.waterQualityIntelligence?.concernClassification?.label || 'Assessment Active'}
              </span>
            </div>

            <p className="assessment-desc">
              {intel.waterQualityIntelligence?.concernClassification?.summary}
            </p>

            {/* Split Information Columns */}
            <div className="metrics-grid">
              {/* Groundwater Block */}
              <div className="metric-box groundwater-box">
                <div className="metric-header">
                  <span className="metric-icon">🌊</span>
                  <div>
                    <h3 className="metric-title">Groundwater Status</h3>
                    <span className="metric-sub">CGWB Station Monitoring</span>
                  </div>
                </div>
                <p className="metric-body">
                  {intel.groundwaterIntelligence?.analysis?.semanticSummary ||
                    'No dedicated observation well station records are mapped directly to this sub-unit.'}
                </p>
                <div className="metric-footer">
                  {intel.groundwaterIntelligence?.freshness?.label ? (
                    <span className="freshness-badge">🕒 {intel.groundwaterIntelligence.freshness.label}</span>
                  ) : (
                    <span className="freshness-badge empty">No station records</span>
                  )}
                </div>
              </div>

              {/* Drinking Water Quality Block */}
              <div className="metric-box waterquality-box">
                <div className="metric-header">
                  <span className="metric-icon">🧪</span>
                  <div>
                    <h3 className="metric-title">Drinking Water Quality</h3>
                    <span className="metric-sub">BIS IS 10500:2012 Standards</span>
                  </div>
                </div>
                <p className="metric-body">
                  {intel.waterQualityIntelligence?.hasLabData
                    ? 'Sample records analyzed against verified Bureau of Indian Standards benchmarks.'
                    : 'No public machine-readable laboratory water quality test reports are published at ward or locality level.'}
                </p>
                <div className="metric-footer">
                  <span className={`freshness-badge ${intel.waterQualityIntelligence?.hasLabData ? 'verified' : 'empty'}`}>
                    {intel.waterQualityIntelligence?.hasLabData ? '✓ Laboratory Tested' : '⚠️ Absence of data is not proof of purity'}
                  </span>
                </div>
              </div>
            </div>

            {/* Evidence-Based Recommendations */}
            {intel.recommendations && intel.recommendations.length > 0 && (
              <div className="recommendations-container">
                <h4 className="rec-heading">Evidence-Based Civic Guidance</h4>
                <div className="rec-list">
                  {intel.recommendations.map((rec, idx) => (
                    <div key={idx} className={`rec-card priority-${rec.priority || 'medium'}`}>
                      <div className="rec-content">
                        <strong className="rec-text">{rec.text}</strong>
                        <div className="rec-meta">
                          <span><strong>Rationale:</strong> {rec.rationale}</span>
                          <span className="meta-sep">•</span>
                          <span><strong>Source:</strong> {rec.source}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Large Interactive Navigation Action Buttons */}
          <section className="action-buttons-section">
            <h3 className="section-label">Explore Specialized Tools & Guidance</h3>
            <div className="action-buttons-grid">
              <Link to="/map" className="action-btn-card">
                <div className="action-btn-icon map-icon">🗺️</div>
                <div className="action-btn-text">
                  <strong>Water Availability Map</strong>
                  <span>View spatial groundwater observations & water stations</span>
                </div>
                <div className="action-arrow">→</div>
              </Link>

              <Link to="/health" className="action-btn-card">
                <div className="action-btn-icon health-icon">🛡️</div>
                <div className="action-btn-text">
                  <strong>Disease Prevention Guide</strong>
                  <span>NCDC/MoHFW guidelines on boiling vs chemical filtration</span>
                </div>
                <div className="action-arrow">→</div>
              </Link>

              <Link to="/assistant" className="action-btn-card primary-action">
                <div className="action-btn-icon ai-icon">🤖</div>
                <div className="action-btn-text">
                  <strong>Ask Water Assistant</strong>
                  <span>Natural language Q&A backed by verified records</span>
                </div>
                <div className="action-arrow">→</div>
              </Link>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}