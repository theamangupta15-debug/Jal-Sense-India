import { usePageTitle } from '../App.jsx';

const OFFICIAL_SOURCES = [
  {
    id: 'cgwb',
    name: 'Central Ground Water Board (CGWB)',
    entity: 'Ministry of Jal Shakti, Department of Water Resources',
    scope: 'National Hydrograph Well Network & Nagpur Aquifer Mapping',
    frequency: 'Quarterly (Pre-Monsoon, Monsoon, Post-Monsoon, Rabi)',
    accessMethod: 'India-WRIS Geospatial Portal & Annual Yearbooks',
    status: 'Verified Ingestion',
    statusColor: 'green',
    url: 'https://indiawris.gov.in',
    description: 'Groundwater level observations in meters below ground level (mbgl) across Maharashtra dugwells and piezometers. Used to establish static water table depths and historical trends.'
  },
  {
    id: 'bis',
    name: 'Bureau of Indian Standards (BIS IS 10500:2012)',
    entity: 'Ministry of Consumer Affairs, Food & Public Distribution',
    scope: 'National Drinking Water Specifications (Second Revision)',
    frequency: 'Statutory Standard & Amendments',
    accessMethod: 'Official Published Standard Document',
    status: 'Active Benchmark',
    statusColor: 'green',
    url: 'https://www.bis.gov.in',
    description: 'Defines Acceptable and Permissible Limits in the absence of alternate sources for physical, chemical, and bacteriological parameters including TDS, pH, Fluoride, and Nitrate.'
  },
  {
    id: 'jjm-wqms',
    name: 'Jal Jeevan Mission — WQMIS Portal',
    entity: 'Department of Drinking Water and Sanitation, Govt. of India',
    scope: 'Rural Piped Water Quality Monitoring System',
    frequency: 'Periodic Laboratory & Field Test Kit (FTK) Uploads',
    accessMethod: 'National JJM WQMIS Dashboard',
    status: 'Public Registry',
    statusColor: 'blue',
    url: 'https://ejalshakti.gov.in/WQMIS/',
    description: 'Village and Gram Panchayat level tap water laboratory test reports uploaded by state water and sanitation missions.'
  },
  {
    id: 'gsda',
    name: 'Groundwater Surveys and Development Agency (GSDA)',
    entity: 'Water Supply & Sanitation Department, Govt. of Maharashtra',
    scope: 'Maharashtra State Watershed & Taluka Aquifer Stress Studies',
    frequency: 'Biannual Aquifer Assessments',
    accessMethod: 'MAHABHUJALVEDH & GSDA Publications',
    status: 'Regional Source',
    statusColor: 'blue',
    url: 'https://gsda.maharashtra.gov.in',
    description: 'Watershed-level assessments classifying talukas as Safe, Semi-Critical, or Critical based on groundwater draft versus net annual recharge.'
  },
  {
    id: 'nmc-ocw',
    name: 'Nagpur Municipal Corporation (NMC) & Orange City Water (OCW)',
    entity: 'Municipal Water Utility Distribution Division',
    scope: 'Nagpur Urban Piped Distribution Network (Pench, Kanhan, Gorewada WTPs)',
    frequency: 'Operational Sampling (Internal Registers)',
    accessMethod: 'Utility Media Bulletins & Periodic Press Statements',
    status: 'Context Reference',
    statusColor: 'amber',
    url: 'https://www.nmcnagpur.gov.in',
    description: 'Bulk municipal water treatment plant compliance and water distribution updates. Ward-level machine-readable live APIs remain unavailable.'
  },
  {
    id: 'mohfw-who',
    name: 'MoHFW & World Health Organization (WHO)',
    entity: 'Ministry of Health and Family Welfare / WHO Guidelines for Drinking-Water Quality',
    scope: 'Public Health, Waterborne Disease & Clinical Sanitation Protocols',
    frequency: 'Standard Clinical Guidance & Epidemiological Surveillance',
    accessMethod: 'WHO 4th Edition / NCDC IDSP Surveillance Reports',
    status: 'Health Guidance',
    statusColor: 'green',
    url: 'https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health',
    description: 'Evidence base for disease symptom categorization (Cholera, Typhoid, Fluorosis, Infant Methemoglobinemia) and disinfection requirements.'
  }
];

const METHODOLOGY_RULES = [
  {
    rule: '01',
    title: 'Separation of Disparate Data Streams',
    summary: 'Groundwater well depths and drinking-water laboratory samples are fundamentally separate hydrogeological metrics and are never averaged or combined into a single composite score.'
  },
  {
    rule: '02',
    title: 'Mandatory Metadata & Provenance Tracking',
    summary: 'Every data record displayed in Jal Sense India must preserve its source agency, collection timestamp, and administrative level. Incomplete records without spatial attribution are quarantined.'
  },
  {
    rule: '03',
    title: 'Absence of Data Policy',
    summary: 'The lack of public laboratory test records does NOT certify tap water as safe or potable. Where testing data is unverified or missing at ward level, the platform explicitly flags "Insufficient Evidence".'
  },
  {
    rule: '04',
    title: 'Chemical vs. Biological Disinfection Honesty',
    summary: 'Thermal boiling destroys microbial bacteria and viruses, but it evaporates clean steam and concentrates chemical ions (TDS, Fluorides, Nitrates). Civic guidance enforces this strict distinction.'
  }
];

export default function MethodologyPage() {
  usePageTitle('Sources & Data Methodology');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 64px', color: '#0f172a' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', marginBottom: '10px' }}>
          <span>OPEN CIVIC DATA ARCHITECTURE</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          Data Sources & Ingestion Methodology
        </h1>
        <p style={{ fontSize: '1rem', color: '#64748b', margin: 0, maxWidth: '860px', lineHeight: '1.6' }}>
          Jal Sense India synthesizes official government datasets, statutory Bureau of Indian Standards (BIS) potable benchmarks, and hydrological field surveys for Nagpur District through an open and verifiable ingestion framework.
        </p>
      </div>

      {/* Core Methodology Principles Grid */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 4px 0', color: '#0f172a' }}>
              Scientific & Ethical Principles
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
              Engineered constraints that prevent algorithmic hallucination and preserve civic trust.
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', background: '#f1f5f9', color: '#475569', padding: '4px 12px', borderRadius: '6px' }}>
            Deterministic Rules
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {METHODOLOGY_RULES.map((m) => (
            <div
              key={m.rule}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '22px',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0284c7' }}>
                {m.rule}
              </span>
              <h3 style={{ fontSize: '1.02rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
                {m.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: '1.55', margin: 0 }}>
                {m.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Sources & References Section */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 4px 0', color: '#0f172a' }}>
            Primary Data Sources & External Registries
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Every data claim in this platform links directly to published government publications and statutory portals.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          {OFFICIAL_SOURCES.map((src) => {
            const isGreen = src.statusColor === 'green';
            const isBlue = src.statusColor === 'blue';
            return (
              <div
                key={src.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      {src.name}
                    </h3>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: isGreen ? '#dcfce7' : isBlue ? '#e0f2fe' : '#fef3c7',
                        color: isGreen ? '#15803d' : isBlue ? '#0369a1' : '#b45309',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {src.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b', marginBottom: '12px' }}>
                    {src.entity}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.55', margin: '0 0 16px 0' }}>
                    {src.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#64748b', marginBottom: '18px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                    <div><strong style={{ color: '#0f172a' }}>Monitoring Scope:</strong> {src.scope}</div>
                    <div><strong style={{ color: '#0f172a' }}>Ingestion Cadence:</strong> {src.frequency}</div>
                    <div><strong style={{ color: '#0f172a' }}>Access Protocol:</strong> {src.accessMethod}</div>
                  </div>
                </div>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    color: '#0284c7',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    padding: '9px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.borderColor = '#0284c7'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                >
                  Visit Official Agency Portal
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statutory Disclaimer Box */}
      <div
        style={{
          background: '#fffbeb',
          border: '1px solid #fef3c7',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}
      >
        <span style={{ fontSize: '1.3rem' }}></span>
        <p style={{ margin: 0, fontSize: '0.84rem', color: '#92400e', lineHeight: '1.5' }}>
          <strong>Statutory Civic Disclaimer:</strong> Jal Sense India compiles and displays verified public data for civic transparency, educational evaluation, and municipal accountability. It does not certify any tap water as safe or potable and does not provide clinical diagnoses. Point-of-use tap testing via accredited laboratories is recommended for drinking water.
        </p>
      </div>

    </div>
  );
}