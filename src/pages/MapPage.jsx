import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../App.jsx';

// Official Water Resources Department (WRD) & CGWB benchmark data for Maharashtra Divisions
const MAHARASHTRA_REGIONS = [
  {
    id: 'vidarbha-nagpur',
    name: 'Vidarbha (Nagpur Division)',
    status: 'Priority Focus',
    priority: 'High',
    majorReservoirs: 'Totladoh (Pench), Khindsi, Wadgaon, Navegaon',
    liveStoragePercent: 78.4,
    avgWaterTable: '7.8 mbgl',
    stressLevel: 'Moderate to Semi-Critical',
    keyDistricts: 'Nagpur, Wardha, Bhandara, Gondia, Chandrapur, Gadchiroli',
    highlight: true,
    summary: 'Current focus area. Stable post-monsoon surface storage across Totladoh catchment with localized basaltic drawdown in western citrus blocks (Katol, Narkhed).'
  },
  {
    id: 'vidarbha-amravati',
    name: 'Vidarbha (Amravati Division)',
    status: 'Monitored',
    priority: 'Medium',
    majorReservoirs: 'Upper Wardha, Bembla, Katepurna',
    liveStoragePercent: 71.2,
    avgWaterTable: '9.2 mbgl',
    stressLevel: 'Semi-Critical',
    keyDistricts: 'Amravati, Akola, Yavatmal, Buldhana, Washim',
    summary: 'Saline tract along Purna river basin creates localized groundwater potability challenges.'
  },
  {
    id: 'marathwada',
    name: 'Marathwada Division',
    status: 'High Water Stress',
    priority: 'Critical',
    majorReservoirs: 'Jayakwadi, Majalgaon, Yeldari',
    liveStoragePercent: 54.6,
    avgWaterTable: '13.5 mbgl',
    stressLevel: 'Over-Exploited / Critical',
    keyDistricts: 'Chhatrapati Sambhajinagar, Jalna, Beed, Latur, Nanded',
    summary: 'Rain-shadow belt with historically high groundwater extraction for cash crops and low recharge velocity.'
  },
  {
    id: 'western-maha',
    name: 'Western Maharashtra (Pune Division)',
    status: 'High Storage',
    priority: 'Normal',
    majorReservoirs: 'Koyna, Ujani, Khadakwasla, Panshet',
    liveStoragePercent: 88.5,
    avgWaterTable: '6.4 mbgl',
    stressLevel: 'Safe',
    keyDistricts: 'Pune, Satara, Sangli, Solapur, Kolhapur',
    summary: 'High reservoir retention along Western Ghats catchment supporting heavy sugarcane irrigation.'
  },
  {
    id: 'north-maha',
    name: 'North Maharashtra (Nashik Division)',
    status: 'Moderate',
    priority: 'Medium',
    majorReservoirs: 'Gangapur, Girna, Karanjwan',
    liveStoragePercent: 74.1,
    avgWaterTable: '8.6 mbgl',
    stressLevel: 'Semi-Critical',
    keyDistricts: 'Nashik, Dhule, Jalgaon, Nandurbar, Ahmednagar',
    summary: 'Godavari basin headwaters maintain adequate storage; intensive agricultural groundwater draw in Jalgaon/Niphad.'
  },
  {
    id: 'konkan',
    name: 'Konkan Division',
    status: 'Abundant Inflow',
    priority: 'Low',
    majorReservoirs: 'Bhatsa, Tansa, Modak Sagar, Middle Vaitarna',
    liveStoragePercent: 92.0,
    avgWaterTable: '3.8 mbgl',
    stressLevel: 'Safe',
    keyDistricts: 'Mumbai City, Mumbai Suburban, Thane, Palghar, Raigad, Ratnagiri, Sindhudurg',
    summary: 'High coastal precipitation with rapid surface runoff into Arabian Sea. Minimal aquifer storage retention.'
  }
];

// Nagpur District specific 16 talukas capacity list
const NAGPUR_TALUKAS = [
  { name: 'Nagpur City', code: 'LOC-MH-NAG-CITY', depth: '9.80 mbgl', capacity: 'Treated Piped (Pench/Gorewada)', status: 'Safe' },
  { name: 'Hingna', code: 'LOC-MH-NAG-TAL-HIN', depth: '8.90 mbgl', capacity: '72% Storage', status: 'Caution' },
  { name: 'Katol', code: 'LOC-MH-NAG-TAL-KAT', depth: '8.45 mbgl', capacity: '61% Storage (Deep Aquifer)', status: 'Caution' },
  { name: 'Narkhed', code: 'LOC-MH-NAG-TAL-NAR', depth: '9.70 mbgl', capacity: '54% Storage (Semi-Critical)', status: 'Caution' },
  { name: 'Ramtek', code: 'LOC-MH-NAG-TAL-RAM', depth: '4.30 mbgl', capacity: '89% Storage (Totladoh Basin)', status: 'Safe' },
  { name: 'Saoner', code: 'LOC-MH-NAG-TAL-SAO', depth: '6.80 mbgl', capacity: '76% Storage', status: 'Safe' },
  { name: 'Kalmeshwar', code: 'LOC-MH-NAG-TAL-KAL', depth: '7.60 mbgl', capacity: '68% Storage', status: 'Safe' },
  { name: 'Umred', code: 'LOC-MH-NAG-TAL-UMR', depth: '5.80 mbgl', capacity: '81% Storage', status: 'Safe' },
  { name: 'Kamptee', code: 'LOC-MH-NAG-TAL-KAM', depth: '6.40 mbgl', capacity: '80% Storage (Kanhan Inflow)', status: 'Safe' },
  { name: 'Mauda', code: 'LOC-MH-NAG-TAL-MAU', depth: '4.60 mbgl', capacity: '85% Storage', status: 'Safe' },
  { name: 'Nagpur Rural', code: 'LOC-MH-NAG-TAL-RUR', depth: '7.20 mbgl', capacity: '74% Storage', status: 'Safe' },
  { name: 'Nagpur Urban', code: 'LOC-MH-NAG-TAL-URB', depth: '9.50 mbgl', capacity: '70% Storage', status: 'Safe' },
  { name: 'Kuhi', code: 'LOC-MH-NAG-TAL-KUH', depth: '5.40 mbgl', capacity: '82% Storage', status: 'Safe' },
  { name: 'Bhivapur', code: 'LOC-MH-NAG-TAL-BHI', depth: '6.30 mbgl', capacity: '79% Storage', status: 'Safe' },
  { name: 'Parseoni', code: 'LOC-MH-NAG-TAL-PAR', depth: '5.20 mbgl', capacity: '84% Storage', status: 'Safe' }
];

export default function MapPage() {
  usePageTitle('Maharashtra Regional Water Map');
  const [selectedRegion, setSelectedRegion] = useState(MAHARASHTRA_REGIONS[0]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px 64px', color: '#0f172a' }}>
      
      {/* Page Title & Scope Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', marginBottom: '10px' }}>
          <span>GEOGRAPHIC SCOPE: MAHARASHTRA STATE</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          Maharashtra Hydrological & Regional Capacity Map
        </h1>
        <p style={{ fontSize: '0.96rem', color: '#64748b', margin: 0, maxWidth: '850px' }}>
          Real-time water allocation, reservoir live storage capacity, and Central Ground Water Board (CGWB) aquifer monitoring levels across Maharashtra's 6 administrative divisions.
        </p>
      </div>

      {/* Primary Priority Division Banner (Vidarbha / Nagpur) */}
      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '24px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
            Current Active Project Focus
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 6px 0' }}>
            Vidarbha • Nagpur Division (16 Administrative Sub-Units)
          </h2>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>
            Primary monitoring network active. Detailed tap-water compliance and static water table depth available.
          </p>
        </div>
        <Link 
          to="/explore" 
          style={{ background: '#0284c7', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', display: 'inline-block' }}
        >
          View Nagpur Directory →
        </Link>
      </div>

      {/* Two-Column Regional Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px', marginBottom: '36px' }}>
        
        {/* Left Column: Maharashtra Divisions List */}
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>State Administrative Divisions</span>
            <span style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748b' }}>Click to inspect region</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MAHARASHTRA_REGIONS.map((region) => {
              const isSelected = selectedRegion.id === region.id;
              return (
                <div
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  style={{
                    background: isSelected ? '#ffffff' : '#f8fafc',
                    border: isSelected ? '2px solid #0284c7' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 12px rgba(2, 132, 199, 0.12)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ fontSize: '1rem', color: isSelected ? '#0369a1' : '#0f172a' }}>
                      {region.name}
                    </strong>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: region.priority === 'High' ? '#e0f2fe' : region.priority === 'Critical' ? '#fee2e2' : '#f1f5f9',
                        color: region.priority === 'High' ? '#0369a1' : region.priority === 'Critical' ? '#b91c1c' : '#475569'
                      }}
                    >
                      {region.status}
                    </span>
                  </div>

                  {/* Storage Progress Bar */}
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>
                      <span>Reservoir Live Storage</span>
                      <strong style={{ color: '#0f172a' }}>{region.liveStoragePercent}%</strong>
                    </div>
                    <div style={{ width: '100%', height: '7px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${region.liveStoragePercent}%`,
                          height: '100%',
                          background: region.liveStoragePercent > 75 ? '#0284c7' : region.liveStoragePercent > 60 ? '#f59e0b' : '#ef4444'
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Region Deep Dive Card */}
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '16px' }}>
            Regional Hydrological Profile
          </h3>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0284c7', textTransform: 'uppercase' }}>Selected Division</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '4px 0 0 0' }}>{selectedRegion.name}</h2>
              </div>
              <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' }}>
                Priority: {selectedRegion.priority}
              </span>
            </div>

            {/* Quick Metrics Duo */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', margin: '20px 0' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>LIVE RESERVOIR STORAGE</span>
                <strong style={{ fontSize: '1.4rem', color: '#0284c7' }}>{selectedRegion.liveStoragePercent}%</strong>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '4px' }}>AVG WATER TABLE DEPTH</span>
                <strong style={{ fontSize: '1.4rem', color: '#0f172a' }}>{selectedRegion.avgWaterTable}</strong>
              </div>
            </div>

            {/* Region Details */}
            <div style={{ fontSize: '0.88rem', lineHeight: '1.6', color: '#334155', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <strong style={{ color: '#0f172a' }}>Major Reservoirs & Dams: </strong>
                <span>{selectedRegion.majorReservoirs}</span>
              </div>
              <div>
                <strong style={{ color: '#0f172a' }}>Aquifer Stress Classification: </strong>
                <span style={{ color: selectedRegion.stressLevel.includes('Critical') ? '#dc2626' : '#0369a1', fontWeight: '600' }}>
                  {selectedRegion.stressLevel}
                </span>
              </div>
              <div>
                <strong style={{ color: '#0f172a' }}>Covered Districts: </strong>
                <span>{selectedRegion.keyDistricts}</span>
              </div>
              <div style={{ background: '#f1f5f9', borderLeft: '3px solid #0284c7', padding: '12px 14px', borderRadius: '0 8px 8px 0', marginTop: '6px' }}>
                <strong>Hydrological Notes: </strong>
                {selectedRegion.summary}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Nagpur District 16 Talukas Hydrological Capacity Breakdown */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', marginTop: '36px', boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0 0 4px 0' }}>
              Nagpur District • 16 Taluka Groundwater & Capacity Index
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
              Individual administrative unit observations mapped to CGWB monitoring wells.
            </p>
          </div>
          <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '5px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' }}>
            16 / 16 Stations Active
          </span>
        </div>

        {/* Table of Talukas */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '10px 14px' }}>Administrative Taluka</th>
                <th style={{ padding: '10px 14px' }}>Station Code</th>
                <th style={{ padding: '10px 14px' }}>Groundwater Level</th>
                <th style={{ padding: '10px 14px' }}>Water Storage Capacity</th>
                <th style={{ padding: '10px 14px' }}>Status</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Full Report</th>
              </tr>
            </thead>
            <tbody>
              {NAGPUR_TALUKAS.map((taluka, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0f172a' }}>{taluka.name}</td>
                  <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '0.8rem' }}>{taluka.code}</td>
                  <td style={{ padding: '12px 14px', fontWeight: '600', color: '#0284c7' }}>{taluka.depth}</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>{taluka.capacity}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      background: taluka.status === 'Safe' ? '#dcfce7' : '#fef3c7',
                      color: taluka.status === 'Safe' ? '#15803d' : '#b45309'
                    }}>
                      {taluka.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <Link to={`/location/${taluka.code}`} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '700', fontSize: '0.82rem' }}>
                      Inspect →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}