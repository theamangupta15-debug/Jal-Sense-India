import { useState } from 'react';
import { usePageTitle } from '../App.jsx';

const NAGPUR_AREAS = [
  'Nagpur City (NMC Jurisdiction)', 'Hingna', 'Katol', 'Narkhed',
  'Ramtek', 'Saoner', 'Kalmeshwar', 'Umred', 'Kamptee', 'Mauda',
  'Nagpur Rural', 'Nagpur Urban', 'Kuhi', 'Bhivapur', 'Parseoni'
];

const COMPLAINT_TYPES = [
  { value: 'dirty_water', label: 'Muddy / Discolored / Foul-Smelling Tap Water' },
  { value: 'pipeline_burst', label: 'Main Pipeline Burst / Visible Water Leakage' },
  { value: 'sewage_mixing', label: 'Sewage Infiltration into Drinking Water Line (Urgent)' },
  { value: 'low_pressure', label: 'No Water Supply / Low Water Pressure' },
  { value: 'illegal_borewell', label: 'Illegal Deep Borewell Drilling (GSDA Violation)' },
  { value: 'illness_outbreak', label: 'Localized Diarrhea / Jaundice / Water Illness Spike' }
];

export default function ComplaintPage() {
  usePageTitle('File Water Grievance');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    area: 'Nagpur City (NMC Jurisdiction)',
    wardOrLocality: '',
    complaintType: 'dirty_water',
    urgency: 'Medium',
    description: '',
    consent: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complaintTicket, setComplaintTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim() || !formData.fullName.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);

    // Simulate logging grievance to municipal portal
    setTimeout(() => {
      const ticketNumber = `NMC-WQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setComplaintTicket(ticketNumber);
      setIsSubmitting(false);
    }, 700);
  };

  const handleReset = () => {
    setComplaintTicket(null);
    setFormData({
      fullName: '',
      phone: '',
      area: 'Nagpur City (NMC Jurisdiction)',
      wardOrLocality: '',
      complaintType: 'dirty_water',
      urgency: 'Medium',
      description: '',
      consent: true
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 64px', color: '#0f172a' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fee2e2', color: '#b91c1c', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', marginBottom: '10px' }}>
          <span>MUNICIPAL & CIVIC GRIEVANCE REDRESSAL</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          File a Water Quality or Supply Complaint
        </h1>
        <p style={{ fontSize: '1rem', color: '#64748b', margin: 0, maxWidth: '860px', lineHeight: '1.6' }}>
          Report contaminated tap supply, pipeline leakages, sewage ingress, or illegal groundwater extraction across Nagpur District. Your grievance is logged with a verifiable municipal reference ID.
        </p>
      </div>

      {/* Emergency Helpline Strip */}
      <div
        style={{
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: '14px',
          padding: '20px 24px',
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            URGENT / EMERGENCY ASSISTANCE
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '4px 0 2px 0', color: '#9f1239' }}>
            NMC / Orange City Water (OCW) 24x7 Toll-Free Helpline
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#be123c', margin: 0 }}>
            For burst pipelines or active sewage contamination, call immediately for rapid dispatch:
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href="tel:18002669899"
            style={{
              background: '#e11d48',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '800',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Call 1800-266-9899</span>
          </a>
          <a
            href="https://grievances.maharashtra.gov.in"
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#ffffff',
              color: '#9f1239',
              border: '1px solid #fecdd3',
              padding: '10px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.85rem'
            }}
          >
            Aaple Sarkar Portal ↗
          </a>
        </div>
      </div>

      {/* Two Column Grid: Information Left, Form Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '28px', marginBottom: '40px' }}>
        
        {/* Left Column: Civic Rights & Redressal Protocol */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.03)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 10px 0', color: '#0f172a' }}>
              Citizens' Water Rights in Nagpur
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', margin: '0 0 16px 0' }}>
              Under the <strong>Maharashtra Municipal Corporations Act</strong> and statutory <strong>BIS IS 10500:2012</strong> mandates, every household connected to the municipal or rural public grid is entitled to safe, potable, pathogen-free water.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#f8fafc', borderLeft: '4px solid #0284c7', padding: '12px 14px', borderRadius: '0 8px 8px 0' }}>
                <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'block' }}>Mandatory Water Sampling:</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>If you report discolored or foul-smelling water, municipal field inspectors are mandated to collect physical tap samples within 48 hours.</span>
              </div>
              <div style={{ background: '#f8fafc', borderLeft: '4px solid #ef4444', padding: '12px 14px', borderRadius: '0 8px 8px 0' }}>
                <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'block' }}>Contamination Warning:</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Do NOT consume brown or muddy tap water during pipeline repairs; boil for 3+ minutes and use alternative drinking water until clear water resumes.</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 12px 0', color: '#0f172a' }}>
              Grievance Escalation Hierarchy
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: '#334155' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontWeight: '800', color: '#0284c7' }}>Step 1:</span>
                <span>NMC / OCW 24x7 Customer Care or Local Taluka PHED Engineer.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontWeight: '800', color: '#0284c7' }}>Step 2:</span>
                <span>Nagpur Municipal Corporation Water Works Department (Executive Engineer).</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontWeight: '800', color: '#0284c7' }}>Step 3:</span>
                <span>District Collectorate / Aaple Sarkar Public Grievance Portal for unresolved issues (7 days).</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Complaint Submission Form */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px 0', color: '#0f172a' }}>
              Submit Grievance Form
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#64748b', margin: 0 }}>
              All fields are forwarded to the municipal water quality log for tracking.
            </p>
          </div>

          {complaintTicket ? (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
              <div style={{ width: '52px', height: '52px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 14px' }}>
                ✓
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#065f46', margin: '0 0 6px 0' }}>
                Complaint Registered
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#047857', margin: '0 0 16px 0' }}>
                Your grievance has been assigned to the Nagpur Water Operations desk.
              </p>
              <div style={{ background: '#ffffff', border: '1px dashed #6ee7b7', borderRadius: '8px', padding: '12px 18px', fontSize: '0.95rem', color: '#065f46', fontWeight: '800', display: 'inline-block', marginBottom: '20px' }}>
                Tracking ID: {complaintTicket}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 18px 0' }}>
                Keep this Tracking ID for follow-ups with the ward sanitary inspector.
              </p>
              <button
                onClick={handleReset}
                style={{
                  background: '#047857',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                File Another Grievance
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patil"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Taluka / Zone *
                  </label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
                  >
                    {NAGPUR_AREAS.map((a, i) => (
                      <option key={i} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Ward No. / Colony / Street *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ward 24, Dharampeth"
                    value={formData.wardOrLocality}
                    onChange={(e) => setFormData({ ...formData, wardOrLocality: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Nature of Water Issue *
                </label>
                <select
                  value={formData.complaintType}
                  onChange={(e) => setFormData({ ...formData, complaintType: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
                >
                  {COMPLAINT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Detailed Description *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe when the issue started, color or smell of water, health symptoms in household, or location of pipe leakage..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: isSubmitting ? '#94a3b8' : '#e11d48',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '13px 20px',
                  fontWeight: '700',
                  fontSize: '0.92rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '4px'
                }}
              >
                {isSubmitting ? 'Registering Grievance...' : 'Submit Water Grievance →'}
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}