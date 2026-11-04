import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../App.jsx';

const NAGPUR_LOCATIONS = [
  { id: 'LOC-MH-NAG', name: 'Nagpur District', level: 'district' },
  { id: 'LOC-MH-NAG-CITY', name: 'Nagpur City', level: 'city' },
  { id: 'LOC-MH-NAG-TAL-KAT', name: 'Katol', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-NAR', name: 'Narkhed', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-SAO', name: 'Saoner', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-KAL', name: 'Kalmeshwar', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-RAM', name: 'Ramtek', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-PAR', name: 'Parseoni', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-MAU', name: 'Mauda', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-KAM', name: 'Kamptee', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-RUR', name: 'Nagpur Rural', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-URB', name: 'Nagpur Urban', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-HIN', name: 'Hingna', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-UMR', name: 'Umred', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-KUH', name: 'Kuhi', level: 'taluka' },
  { id: 'LOC-MH-NAG-TAL-BHI', name: 'Bhivapur', level: 'taluka' }
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
      .catch((err) => {
        setFetchError('Backend service unreachable or database not connected.');
        setLoading(false);
      });
  }, [selectedId]);

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Understand Your Water. Protect Your Health.</h1>
        <p>
          Traceable water quality interpretations, groundwater dynamics, and public-health prevention guidance for Nagpur District[cite: 1].
        </p>
      </section>

      {/* Location Selector */}
      <section className="card location-picker">
        <label htmlFor="home-loc-select"><strong>Select Administrative Area:</strong></label>
        <select
          id="home-loc-select"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {NAGPUR_LOCATIONS.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name} ({loc.level.toUpperCase()})
            </option>
          ))}
        </select>
        <div className="picker-links">
          <Link to={`/location/${selectedId}`}>Open full area report →</Link>
          <span style={{ margin: '0 8px' }}>•</span>
          <Link to="/explore">Browse all areas</Link>
        </div>
      </section>

      {loading && <p className="loading">Loading water intelligence assessment...</p>}

      {fetchError && (
        <div className="notice-box notice-warning">
          <strong>Backend Notice:</strong> {fetchError}
          <br />
          <small>Ensure the Express backend is running via <code>npm run dev</code> on port 5000.</small>
        </div>
      )}

      {!loading && intel && (
        <div className="intel-stack">
          {/* Main Assessment Card */}
          <section className="card">
            <div className="card-header">
              <h2>{intel.location?.name} Assessment</h2>
              <span className={`status-pill status-${intel.waterQualityIntelligence?.concernClassification?.level}`}>
                {intel.waterQualityIntelligence?.concernClassification?.label || 'Assessment Active'}
              </span>
            </div>

            <p className="summary-text">
              {intel.waterQualityIntelligence?.concernClassification?.summary}
            </p>

            {/* Split Information: Groundwater vs Drinking Water */}
            <div className="split-grid">
              {/* Groundwater */}
              <div className="split-col">
                <h3>Groundwater Status (CGWB Station Data)[cite: 3]</h3>
                <p>
                  {intel.groundwaterIntelligence?.analysis?.semanticSummary || 'No station observations directly linked to this sub-unit.'}
                </p>
                {intel.groundwaterIntelligence?.freshness && (
                  <small>{intel.groundwaterIntelligence.freshness.label}</small>
                )}
              </div>

              {/* Drinking Water Lab */}
              <div className="split-col">
                <h3>Drinking Water Tests (BIS IS 10500)[cite: 6]</h3>
                <p>
                  {intel.waterQualityIntelligence?.hasLabData
                    ? 'Sample analyzed against BIS IS 10500:2012 benchmarks[cite: 6].'
                    : 'No public machine-readable laboratory water quality test reports published at ward/locality level[cite: 1, 8].'}
                </p>
                <small>
                  {intel.waterQualityIntelligence?.hasLabData
                    ? 'Lab Verified'
                    : 'Absence of data is not proof of purity.'}
                </small>
              </div>
            </div>

            {/* Recommendations */}
            {intel.recommendations && intel.recommendations.length > 0 && (
              <div className="recommendations-box">
                <h4>Evidence-Based Recommendations</h4>
                <ul>
                  {intel.recommendations.map((rec, idx) => (
                    <li key={idx}>
                      <strong>{rec.text}</strong>
                      <br />
                      <small>Rationale: {rec.rationale} • Source: {rec.source}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Quick Links */}
          <div className="quick-links">
            <Link to="/map" className="btn">View Water Map →</Link>
            <Link to="/health" className="btn">Disease Prevention Guide →</Link>
            <Link to="/assistant" className="btn">Ask Water Assistant →</Link>
          </div>
        </div>
      )}
    </div>
  );
}