import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../App.jsx';

const NAGPUR_AREAS = [
  'Nagpur District (Overview)', 'Nagpur City', 'Hingna', 'Katol', 'Narkhed',
  'Ramtek', 'Saoner', 'Kalmeshwar', 'Umred', 'Kamptee', 'Mauda',
  'Nagpur Rural', 'Nagpur Urban', 'Kuhi', 'Bhivapur', 'Parseoni'
];

const ISSUE_CATEGORIES = [
  'Groundwater Depth Discrepancy (CGWB)',
  'Drinking Water Lab Standard (BIS IS 10500)',
  'Missing Station or Monitoring Well Record',
  'Civic Advisory / Recommendation Inaccuracy',
  'Feature Request or Open API Integration'
];

export default function AboutPage() {
  usePageTitle('About & Civic Feedback');

  const [formData, setFormData] = useState({
    area: 'Nagpur District (Overview)',
    category: 'Groundwater Depth Discrepancy (CGWB)',
    email: '',
    description: '',
    sourceReference: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) return;

    setIsSubmitting(true);

    // Simulate submission to civic audit logger
    setTimeout(() => {
      const ticketId = `JAL-AUDIT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setFormData({
      area: 'Nagpur District (Overview)',
      category: 'Groundwater Depth Discrepancy (CGWB)',
      email: '',
      description: '',
      sourceReference: ''
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 64px', color: '#0f172a' }}>
      
      {/* Hero Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', marginBottom: '10px' }}>
          <span>CIVIC PLATFORM MISSION & ACCOUNTABILITY</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          About Jal Sense India
        </h1>
        <p style={{ fontSize: '1rem', color: '#64748b', margin: 0, maxWidth: '860px', lineHeight: '1.6' }}>
          A public-interest civic intelligence platform democratizing access to official hydrogeological data, drinking water benchmarks, and evidence-grounded health guidance for Nagpur District.
        </p>
      </div>

      {/* Two-Column Grid: Mission Info (Left) & Feedback Form (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '28px', marginBottom: '44px' }}>
        
        {/* Left Column: Platform Mission & Architecture */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.03)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 12px 0', color: '#0f172a' }}>
              Why We Built This Platform
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: '1.6', margin: '0 0 14px 0' }}>
              In many regions across India, essential water metrics remain locked inside static government gazettes, quarterly PDFs, or unlinked portals. 
              <strong> Jal Sense India</strong> bridges this civic information gap by organizing published records from the Central Ground Water Board (CGWB) and statutory Bureau of Indian Standards (BIS IS 10500:2012) into a clear, verifiable interface.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase' }}>Focus District</span>
                <strong style={{ fontSize: '1.05rem', color: '#0f172a', display: 'block', marginTop: '2px' }}>Nagpur, MH</strong>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#16a34a', textTransform: 'uppercase' }}>Privacy Policy</span>
                <strong style={{ fontSize: '1.05rem', color: '#0f172a', display: 'block', marginTop: '2px' }}>Zero Tracking</strong>
              </div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 10px 0', color: '#0f172a' }}>
              Core Civic Commitments
            </h3>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.88rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: '1.5' }}>
              <li>
                <strong>Absence of Data Is Not Proof of Safety:</strong> When laboratory sample registries are unavailable at the ward level, we never fabricate claims of potability.
              </li>
              <li>
                <strong>No Personal Data Collection:</strong> We do not ask for telephone numbers, home addresses, or KYC credentials to access public data.
              </li>
              <li>
                <strong>Open Ingestion Pipeline:</strong> All data normalization scripts and API routes adhere to open-source governance.
              </li>
            </ul>
          </div>

          {/* Quick Stats Pill Bar */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Monitored Sub-Units</span>
              <strong style={{ fontSize: '1.1rem', color: '#0284c7', display: 'block' }}>16 Talukas & Clusters</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>API Status</span>
              <strong style={{ fontSize: '1.1rem', color: '#16a34a', display: 'block' }}>Operational v1.0</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Target LLM</span>
              <strong style={{ fontSize: '1.1rem', color: '#0f172a', display: 'block' }}>Grok RAG</strong>
            </div>
          </div>

        </div>

        {/* Right Column: Functional Civic Issue & Feedback Reporter */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>
              Report a Data Issue or Submit Feedback
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
              Notice an outdated well depth reading, an unmapped station, or an inaccurate guideline? Help improve dataset precision.
            </p>
          </div>

          {submittedTicket ? (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 12px' }}>
                ✓
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#065f46', margin: '0 0 6px 0' }}>
                Feedback Logged Successfully
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#047857', margin: '0 0 14px 0' }}>
                Your observation has been tagged for review in the next CGWB/PHED ingestion verification cycle.
              </p>
              <div style={{ background: '#ffffff', border: '1px dashed #6ee7b7', borderRadius: '8px', padding: '10px 14px', fontSize: '0.85rem', color: '#065f46', fontWeight: '700', display: 'inline-block', marginBottom: '18px' }}>
                Audit Reference ID: {submittedTicket}
              </div>
              <div>
                <button
                  onClick={handleReset}
                  style={{
                    background: '#047857',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 18px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Submit Another Report
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Target Administrative Location
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    background: '#ffffff',
                    outline: 'none'
                  }}
                >
                  {NAGPUR_AREAS.map((a, i) => (
                    <option key={i} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Issue Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    background: '#ffffff',
                    outline: 'none'
                  }}
                >
                  {ISSUE_CATEGORIES.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Describe the Issue or Inaccuracy[cite: 13]
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="State the discrepancy clearly (e.g., Katol pre-monsoon reading differs from local GSDA report, or station code mapping issue)..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Source Reference / Document Link (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CGWB Report 2026 page 14, or laboratory report link..."
                  value={formData.sourceReference}
                  onChange={(e) => setFormData({ ...formData, sourceReference: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Email Address (Optional — only for verification updates)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.description.trim()}
                style={{
                  background: isSubmitting || !formData.description.trim() ? '#94a3b8' : '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 20px',
                  fontWeight: '700',
                  fontSize: '0.92rem',
                  cursor: isSubmitting || !formData.description.trim() ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '6px',
                  transition: 'background 0.15s ease'
                }}
              >
                {isSubmitting ? (
                  <span>Logging to Registry...</span>
                ) : (
                  <>
                    <span>Submit Civic Report</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>

      {/* Frequently Asked Questions (FAQ) Section */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>
          Frequently Asked Questions
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 24px 0' }}>
          Clarifications regarding platform authority, testing procedures, and data governance.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
            <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              Does Jal Sense India certify water as safe to drink?
            </strong>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
              No. Jal Sense India synthesizes publicly documented government records and statutory benchmarks[cite: 13]. Physical pipeline variations and internal plumbing biofilms require direct point-of-use laboratory testing before declaring water potable[cite: 13].
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
            <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              Where can I get my home tap or borewell water tested in Nagpur?
            </strong>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
              Water samples can be submitted to the Public Health Engineering Laboratory (PHED) at Sadar, Nagpur, or accredited NABL environmental testing facilities across the district.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
            <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              How frequently are groundwater tables updated?
            </strong>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
              The Central Ground Water Board (CGWB) records national hydrograph observations four times annually (Pre-monsoon, Monsoon, Post-monsoon, and Rabi cycles). Our ingestion pipeline reflects these quarterly publications.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}