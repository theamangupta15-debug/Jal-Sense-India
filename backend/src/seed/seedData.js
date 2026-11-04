export const SEED_LOCATIONS = [
  { locationId: 'LOC-MH-NAG', name: 'Nagpur District', localNames: { hi: 'नागपुर जिला', mr: 'नागपूर जिल्हा' }, level: 'district', parentId: 'LOC-MH', aliases: ['Nagpur', 'Nagpur District'] },
  { locationId: 'LOC-MH-NAG-CITY', name: 'Nagpur City', localNames: { hi: 'नागपुर शहर', mr: 'नागपूर शहर' }, level: 'city', parentId: 'LOC-MH-NAG', jurisdiction: 'Nagpur Municipal Corporation (NMC)', aliases: ['Nagpur City', 'NMC'] },
  { locationId: 'LOC-MH-NAG-TAL-KAT', name: 'Katol', localNames: { hi: 'काटोल', mr: 'काटोल' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Katol'] },
  { locationId: 'LOC-MH-NAG-TAL-NAR', name: 'Narkhed', localNames: { hi: 'नरखेड', mr: 'नरखेड' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Narkhed'] },
  { locationId: 'LOC-MH-NAG-TAL-SAO', name: 'Saoner', localNames: { hi: 'सावनेर', mr: 'सावनेर' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Saoner', 'Savner'] },
  { locationId: 'LOC-MH-NAG-TAL-KAL', name: 'Kalmeshwar', localNames: { hi: 'कलमेश्वर', mr: 'कलमेश्वर' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Kalmeshwar'] },
  { locationId: 'LOC-MH-NAG-TAL-RAM', name: 'Ramtek', localNames: { hi: 'रामटेक', mr: 'रामटेक' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Ramtek'] },
  { locationId: 'LOC-MH-NAG-TAL-PAR', name: 'Parseoni', localNames: { hi: 'पारशिवनी', mr: 'पारशिवनी' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Parseoni'] },
  { locationId: 'LOC-MH-NAG-TAL-MAU', name: 'Mauda', localNames: { hi: 'मौदा', mr: 'मौदा' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Mauda'] },
  { locationId: 'LOC-MH-NAG-TAL-KAM', name: 'Kamptee', localNames: { hi: 'कामठी', mr: 'कामठी' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Kamptee'] },
  { locationId: 'LOC-MH-NAG-TAL-RUR', name: 'Nagpur Rural', localNames: { hi: 'नागपुर ग्रामीण', mr: 'नागपूर ग्रामीण' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Nagpur Rural'] },
  { locationId: 'LOC-MH-NAG-TAL-URB', name: 'Nagpur Urban', localNames: { hi: 'नागपुर शहरी', mr: 'नागपूर शहरी' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Nagpur Urban'] },
  { locationId: 'LOC-MH-NAG-TAL-HIN', name: 'Hingna', localNames: { hi: 'हिंगणा', mr: 'हिंगणा' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Hingna'] },
  { locationId: 'LOC-MH-NAG-TAL-UMR', name: 'Umred', localNames: { hi: 'उमरेड', mr: 'उमरेड' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Umred'] },
  { locationId: 'LOC-MH-NAG-TAL-KUH', name: 'Kuhi', localNames: { hi: 'कुही', mr: 'कुही' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Kuhi'] },
  { locationId: 'LOC-MH-NAG-TAL-BHI', name: 'Bhivapur', localNames: { hi: 'भिवापूर', mr: 'भिवापूर' }, level: 'taluka', parentId: 'LOC-MH-NAG', aliases: ['Bhivapur'] }
];

export const SEED_SOURCES = [
  { sourceId: 'SRC-CGWB', name: 'Central Ground Water Board (CGWB)', publisher: 'Ministry of Jal Shakti', granularity: 'Monitoring Wells & Taluka', updateFrequency: 'Quarterly', accessMethod: 'India-WRIS portal', licenceStatus: 'Government Domain; Attribution required', url: 'https://indiawris.gov.in', notes: 'Groundwater table depths' },
  { sourceId: 'SRC-NMC-OCW', name: 'Nagpur Municipal Corp & Orange City Water', publisher: 'NMC / OCW', granularity: 'City narrative', updateFrequency: 'Daily sampling claimed', accessMethod: 'Press releases / ESR', licenceStatus: 'Utility statements only', url: 'https://ocwindia.com', notes: 'No open ward-level dataset' },
  { sourceId: 'SRC-BIS-10500', name: 'Bureau of Indian Standards IS 10500:2012', publisher: 'BIS', granularity: 'National', updateFrequency: 'Periodic amendments', accessMethod: 'Standard publication', licenceStatus: 'Copyrighted standard', url: 'https://www.bis.gov.in', notes: 'Drinking water specification' }
];

export const SEED_STANDARDS = [
  { parameterCode: 'ph', name: 'pH Value', unit: 'pH units', category: 'Physical', acceptableLimit: '6.5 - 8.5', permissibleLimit: 'No relaxation', significance: 'Controls pipe corrosion and disinfection.' },
  { parameterCode: 'turbidity', name: 'Turbidity', unit: 'NTU', category: 'Physical', acceptableLimit: '1.0', permissibleLimit: '5.0', significance: 'Particulate matter shielding microbes.' },
  { parameterCode: 'tds', name: 'Total Dissolved Solids (TDS)', unit: 'mg/L', category: 'Chemical', acceptableLimit: '500', permissibleLimit: '2000', significance: 'Dissolved mineral salts and palatability.' },
  { parameterCode: 'fluoride', name: 'Fluoride', unit: 'mg/L', category: 'Chemical', acceptableLimit: '1.0', permissibleLimit: '1.5', significance: 'Causes dental and skeletal fluorosis if >1.5 mg/L.' },
  { parameterCode: 'nitrate', name: 'Nitrate', unit: 'mg/L', category: 'Chemical', acceptableLimit: '45.0', permissibleLimit: 'No relaxation', significance: 'Causes blue-baby syndrome if >45 mg/L.' },
  { parameterCode: 'arsenic', name: 'Arsenic', unit: 'mg/L', category: 'Toxic Chemical', acceptableLimit: '0.01', permissibleLimit: '0.05', significance: 'Carcinogenic heavy metalloid.' }
];

export const SEED_HEALTH_GUIDANCE = [
  { topicSlug: 'boiling-clarification', title: 'Boiling vs Chemical Contamination', causativeAgent: 'Pathogens vs Chemicals', transmission: 'Direct ingestion', warningSigns: 'Variable', prevention: 'Boiling kills pathogens; filtration (RO) required for dissolved chemicals', chemicalVsBoilingNote: 'CRITICAL: Boiling eliminates bacteria and viruses, but CANNOT remove chemical contaminants like Fluoride, Nitrate, or Arsenic.' }
];

export const SEED_DEMO_GROUNDWATER = [
  { locationId: 'LOC-MH-NAG-TAL-KAT', stationId: 'CGWB-MH-NGP-KAT-01', measurementValue: 8.42, unit: 'meters below ground level (mbgl)', season: 'post_monsoon', observationDate: new Date('2024-11-15'), sourceId: 'SRC-CGWB', isDemo: true, verificationStatus: 'demo' }
];

export const SEED_DEMO_SAMPLES = [
  {
    sampleId: 'WQ-DEMO-NGP-001',
    locationId: 'LOC-MH-NAG-CITY',
    sampleDate: new Date('2024-10-20'),
    sampleType: 'tap_water',
    samplingMethod: 'demo',
    overallComplianceStatus: 'Caution',
    parameters: [
      { parameterCode: 'ph', parameterName: 'pH', measuredValue: 7.4, unit: 'pH units', status: 'Safe', healthRelevance: 'Within limits' },
      { parameterCode: 'tds', parameterName: 'TDS', measuredValue: 680, unit: 'mg/L', status: 'Caution', healthRelevance: 'Exceeds acceptable limit (500) but below permissible (2000)' }
    ],
    sourceId: 'SRC-NMC-OCW',
    isDemo: true,
    verificationStatus: 'demo'
  }
];