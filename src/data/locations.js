// FIXTURE: administrative names only (from Phase 1 research). No measurements, no localities.
// lgdCode is null until verified in Phase 1b. 'coverage' says what exists, per Phase 1 findings.
const gw = { groundwater: 'station-level (CGWB/India-WRIS), access pending', quality: 'none found' };
const talukas = ['Nagpur (taluka)','Hingna','Kamptee','Katol','Narkhed','Saoner','Kalmeshwar','Ramtek','Mauda','Parseoni','Umred','Kuhi','Bhiwapur'];
export const locations = [
  { id: 'in', name: 'India', level: 'country', parentId: null },
  { id: 'mh', name: 'Maharashtra', level: 'state', parentId: 'in' },
  { id: 'nagpur-district', name: 'Nagpur', level: 'district', parentId: 'mh', lgdCode: null, coverage: gw },
  { id: 'nagpur-city', name: 'Nagpur', level: 'city (Nagpur Municipal Corporation)', parentId: 'nagpur-district', lgdCode: null,
    coverage: { groundwater: 'sparse urban wells; none loaded', quality: 'operator statements only; no published results found' } },
  ...talukas.map((n) => ({ id: 'taluka-' + n.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, ''),
    name: n, level: 'taluka', parentId: 'nagpur-district', lgdCode: null, coverage: gw })),
];
