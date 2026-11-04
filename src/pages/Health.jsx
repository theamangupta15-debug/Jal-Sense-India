import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../App.jsx';

const WATERBORNE_DISEASES = [
  {
    id: 'cholera',
    name: 'Cholera',
    category: 'Bacterial Contamination',
    cause: 'Vibrio cholerae bacteria from sewage infiltration into drinking lines.',
    symptoms: 'Rapid-onset watery diarrhea, severe dehydration, muscle cramps, and lethargy.',
    riskGroup: 'Infants, young children, and elderly individuals.',
    prevention: 'Rolling boil for minimum 3 minutes, active chlorination (0.2–0.5 ppm residual), and strict hand hygiene before meal handling.',
    treatmentNotice: 'Immediate oral rehydration solutions (ORS) and medical emergency care to replenish lost electrolytes.'
  },
  {
    id: 'typhoid',
    name: 'Typhoid & Paratyphoid Fever',
    category: 'Enteric Bacterial Pathogen',
    cause: 'Salmonella enterica serotype Typhi ingested via fecally contaminated water or raw washed produce.',
    symptoms: 'Sustained step-ladder fever (103°F–104°F), headache, stomach pain, rose spots, and dry cough.',
    riskGroup: 'School-going children, street food consumers, and households using unchlorinated well water.',
    prevention: 'Consuming only certified RO/boiled water, avoiding street ice made from untreated raw supply, and periodic typhoid conjugate vaccination (TCV).',
    treatmentNotice: 'Requires clinical blood culture diagnosis and physician-prescribed antibiotic treatment.'
  },
  {
    id: 'diarrhoeal',
    name: 'Acute Diarrhoeal Diseases & Dysentery',
    category: 'Viral & Amoebic Microorganisms',
    cause: 'Rotavirus, Norovirus, E. coli, and Entamoeba histolytica in unboiled municipal or borewell sources.',
    symptoms: 'Frequent loose or bloody stools, abdominal cramping, nausea, and low-grade fever.',
    riskGroup: 'Under-5 children and pregnant individuals.',
    prevention: 'Dual-barrier purification (UF/UV disinfection combined with physical sediment filtration). Store drinking water in clean, narrow-neck covered vessels.',
    treatmentNotice: 'Administer zinc supplementation and ORS packets while seeking primary health centre (PHC) assistance.'
  },
  {
    id: 'hepatitis',
    name: 'Hepatitis A & E (Viral Jaundice)',
    category: 'Waterborne Viral Infection',
    cause: 'Hepatitis A and E viruses entering water networks through aging distribution pipeline cross-connections.',
    symptoms: 'Dark urine, yellowing of skin and eyes (jaundice), loss of appetite, fatigue, and right upper-quadrant pain.',
    riskGroup: 'Expecting mothers (especially at high risk from Hepatitis E during the third trimester).',
    prevention: 'Avoid tap water consumption during seasonal water-main repair works. Use reliable thermal boiling or certified UV disinfection.',
    treatmentNotice: 'Symptomatic supportive treatment with complete liver rest under medical supervision.'
  },
  {
    id: 'fluorosis',
    name: 'Dental & Skeletal Fluorosis',
    category: 'Geogenic Chemical Contamination',
    cause: 'Excessive fluoride concentration (>1.5 mg/L) dissolved naturally from deep basalt rock strata in borewells.',
    symptoms: 'Permanent yellowish-brown staining and pitting of dental enamel; severe joint stiffness, spine calcification, and bone deformation.',
    riskGroup: 'Children under 8 during permanent tooth enamel development and lifelong borewell consumers.',
    prevention: 'Do NOT rely on boiling (boiling concentrates chemical fluorides). Use certified Reverse Osmosis (RO), activated alumina, or Nalgonda defluoridation techniques.',
    treatmentNotice: 'Early dietary calcium and Vitamin C intake can slow progression; damaged enamel and bone deformity are irreversible.'
  },
  {
    id: 'nitrate',
    name: 'Methemoglobinemia ("Blue Baby Syndrome")',
    category: 'Agricultural Chemical Contamination',
    cause: 'Excess nitrates (>45 mg/L) from synthetic fertilizer runoff and cesspool leaching into shallow aquifers.',
    symptoms: 'Cyanosis (bluish skin tint around lips and nails), shortness of breath, vomiting, and cardiovascular collapse in infants.',
    riskGroup: 'Infants under 6 months fed formula reconstituted with untreated well water.',
    prevention: 'Test well water nitrate levels before using it to prepare infant feed. Employ RO or ion-exchange resin filtration.',
    treatmentNotice: 'Immediate hospital admission requiring intravenous methylene blue therapy.'
  }
];

const SAFE_STEPS = [
  {
    step: '1',
    title: 'Disinfect Pathogens Thermally or Chemically',
    desc: 'Bring water to a vigorous rolling boil for 3 full minutes. For bulk household storage, use chlorine tablets (halazone / NaDCC) following certified dosage guidelines.'
  },
  {
    step: '2',
    title: 'Separate Chemical Filtration from Microbial Disinfection',
    desc: 'Boiling destroys bacteria, cysts, and viruses, but it evaporates clean steam and concentrates salts (TDS, Fluoride, Nitrates). Use validated RO or Activated Carbon filters for high-TDS water.'
  },
  {
    step: '3',
    title: 'Maintain Domestic Storage Hygiene',
    desc: 'Clean overhead and underground tanks every 90 days. Keep storage vessels elevated and dispense water using clean ladles or dedicated taps to prevent hand-to-water contamination.'
  },
  {
    step: '4',
    title: 'Routine Local Testing',
    desc: 'Submit tap or borewell water to your nearest sub-divisional Public Health Engineering Department (PHED) lab twice a year—pre-monsoon (April) and post-monsoon (October).'
  }
];

export default function HealthPage() {
  usePageTitle('Water Health & Public Prevention Guide');
  const [filter, setFilter] = useState('all');

  const filteredDiseases = filter === 'all'
    ? WATERBORNE_DISEASES
    : filter === 'biological'
    ? WATERBORNE_DISEASES.filter(d => !['fluorosis', 'nitrate'].includes(d.id))
    : WATERBORNE_DISEASES.filter(d => ['fluorosis', 'nitrate'].includes(d.id));

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 64px', color: '#0f172a' }}>
      
      {/* Compassionate Civic Mission Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0369a1 0%, #0f172a 100%)',
          borderRadius: '16px',
          padding: '36px 32px',
          color: '#ffffff',
          marginBottom: '36px',
          boxShadow: '0 8px 24px -4px rgba(3, 105, 161, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', width: 'fit-content' }}>
          PUBLIC HEALTH & WATER SANITATION
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
          Every Life Matters. Every Drop Counts.
        </h1>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#e0f2fe', maxWidth: '880px', margin: 0 }}>
          Clean water is not merely a utility; it is the foundation of family health, dignity, and longevity. 
          Understanding what flows into our homes empowers communities to detect risks early, prevent illness, and protect vulnerable lives before preventable health crises occur.
        </p>
      </div>

      {/* Medical Transparency Callout */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderLeft: '4px solid #0284c7',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '36px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
        <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
          <strong>Medical Notice:</strong> Jal Sense India provides verified civic monitoring data and accredited health guidelines from WHO, MoHFW, and BIS IS 10500 standards. This reference platform cannot replace certified clinical diagnosis. If you or a family member experience persistent abdominal pain, severe dehydration, or fever, please contact an accredited medical practitioner immediately.
        </p>
      </div>

      {/* 4-Step Practical Prevention Banner */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 6px 0' }}>
          How to Safeguard Your Household Drinking Water
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 20px 0' }}>
          Standardized civic protocols to neutralize microbial bacteria and manage harmful chemical contaminants.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {SAFE_STEPS.map((s) => (
            <div
              key={s.step}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#e0f2fe',
                  color: '#0369a1',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}
              >
                {s.step}
              </div>
              <h3 style={{ fontSize: '1.02rem', fontWeight: '700', margin: '0 0 8px 0', color: '#0f172a' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Disease Encyclopedia */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 4px 0' }}>
              Waterborne Illnesses, Causes & Preventive Care
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
              Recognizing biological pathogens vs. long-term chemical toxicity.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: filter === 'all' ? '1px solid #0284c7' : '1px solid #e2e8f0',
                background: filter === 'all' ? '#e0f2fe' : '#ffffff',
                color: filter === 'all' ? '#0369a1' : '#475569',
                fontWeight: '700',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              All Risks ({WATERBORNE_DISEASES.length})
            </button>
            <button
              onClick={() => setFilter('biological')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: filter === 'biological' ? '1px solid #0284c7' : '1px solid #e2e8f0',
                background: filter === 'biological' ? '#e0f2fe' : '#ffffff',
                color: filter === 'biological' ? '#0369a1' : '#475569',
                fontWeight: '700',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Biological / Microbial
            </button>
            <button
              onClick={() => setFilter('chemical')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: filter === 'chemical' ? '1px solid #0284c7' : '1px solid #e2e8f0',
                background: filter === 'chemical' ? '#e0f2fe' : '#ffffff',
                color: filter === 'chemical' ? '#0369a1' : '#475569',
                fontWeight: '700',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Chemical (Fluoride / Nitrate)
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          {filteredDiseases.map((d) => (
            <div
              key={d.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                  {d.name}
                </h3>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: ['fluorosis', 'nitrate'].includes(d.id) ? '#fef3c7' : '#fee2e2',
                    color: ['fluorosis', 'nitrate'].includes(d.id) ? '#b45309' : '#b91c1c'
                  }}
                >
                  {d.category}
                </span>
              </div>

              <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                <strong style={{ color: '#0f172a' }}>Root Cause: </strong>
                {d.cause}
              </div>

              <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                <strong style={{ color: '#0f172a' }}>Typical Symptoms: </strong>
                {d.symptoms}
              </div>

              <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                <strong style={{ color: '#0f172a' }}>High-Risk Demographics: </strong>
                {d.riskGroup}
              </div>

              {/* Prevention Highlight */}
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '0.84rem',
                  color: '#166534',
                  lineHeight: '1.45',
                  marginTop: 'auto'
                }}
              >
                <strong>Prevention Protocol: </strong>
                {d.prevention}
              </div>

              {/* Treatment Advisory */}
              <div
                style={{
                  background: '#f8fafc',
                  borderLeft: '3px solid #cbd5e1',
                  padding: '8px 10px',
                  fontSize: '0.8rem',
                  color: '#64748b',
                  lineHeight: '1.4'
                }}
              >
                <strong>Clinical Action: </strong>
                {d.treatmentNotice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Link Banner */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '0 0 4px 0', color: '#0f172a' }}>
            Questions regarding specific symptoms or purification methods?
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Inquire with our verified civic water assistant about boiling standards, RO filtration, or child hydration safety.
          </p>
        </div>
        <Link
          to="/assistant"
          style={{
            background: '#0284c7',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.88rem',
            whiteSpace: 'nowrap'
          }}
        >
          Ask Water Assistant →
        </Link>
      </div>

    </div>
  );
}