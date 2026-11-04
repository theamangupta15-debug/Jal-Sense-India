// status: 'seen' = found in Phase 1 research; 'pending' = not yet verified.
export const sources = [
  { name: 'India-WRIS groundwater (CGWB)', url: 'https://indiawris.gov.in/wris/#/groundWater', status: 'seen', note: 'Station-level levels; no documented API; licence/terms pending' },
  { name: 'CGWB Nagpur district aquifer plan', url: 'https://cgwb.gov.in/sites/default/files/2022-11/6_nagpur_district.pdf', status: 'seen', note: 'Static report, 2021' },
  { name: 'BIS IS 10500 drinking water specification', url: 'https://www.bis.gov.in/other/DrinWatIS10500.pdf', status: 'seen', note: 'Latest amendment pending check' },
  { name: 'Jal Jeevan Mission WQMIS dashboard', url: 'https://ejalshakti.gov.in/jjmreport/Quality/WQMIS_Dashboard.aspx', status: 'seen', note: 'Rural, dashboard only; no API found' },
  { name: 'NCDC/IDSP weekly outbreak reports', url: 'https://ncdc.mohfw.gov.in/wp-content/uploads/2024/02/462023.pdf', status: 'seen', note: 'Example report; reported outbreaks only' },
  { name: 'GSDA Maharashtra / MAHABHUJALVEDH', url: null, status: 'pending', note: 'Public access unverified' },
  { name: 'NMC / Orange City Water test results', url: null, status: 'pending', note: 'No public results found; data request planned' },
  { name: 'MPCB / CPCB, MoHFW and WHO guidance', url: null, status: 'pending', note: 'Not yet checked' },
];
