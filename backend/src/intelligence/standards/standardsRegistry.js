/**
 * Bureau of Indian Standards — Drinking Water Specification (IS 10500:2012)
 * Verified against official BIS publication including Amendment No. 2 (Sept 2018).
 */
export const VERIFIED_BIS_STANDARDS = {
  ph: {
    code: 'ph',
    name: 'pH Value',
    standard: 'IS 10500:2012',
    unit: 'pH units',
    type: 'range',
    acceptableMin: 6.5,
    acceptableMax: 8.5,
    permissibleMin: 6.5,
    permissibleMax: 8.5, // No relaxation
    hasRelaxation: false,
    category: 'Physical',
    healthRelevance: 'Affects taste, mucous membrane irritation, and chlorination efficacy.'
  },
  turbidity: {
    code: 'turbidity',
    name: 'Turbidity',
    standard: 'IS 10500:2012',
    unit: 'NTU',
    type: 'max',
    acceptableMax: 1.0,
    permissibleMax: 5.0,
    hasRelaxation: true,
    category: 'Physical',
    healthRelevance: 'Suspended particles shield microbial pathogens from chemical disinfection.'
  },
  tds: {
    code: 'tds',
    name: 'Total Dissolved Solids (TDS)',
    standard: 'IS 10500:2012',
    unit: 'mg/L',
    type: 'max',
    acceptableMax: 500.0,
    permissibleMax: 2000.0,
    hasRelaxation: true,
    category: 'Chemical',
    healthRelevance: 'High TDS impairs palatability and may induce gastrointestinal distress.'
  },
  total_hardness: {
    code: 'total_hardness',
    name: 'Total Hardness (as CaCO3)',
    standard: 'IS 10500:2012',
    unit: 'mg/L',
    type: 'max',
    acceptableMax: 200.0,
    permissibleMax: 600.0,
    hasRelaxation: true,
    category: 'Chemical',
    healthRelevance: 'Causes scale deposition in piping and utensils; reduces lathering of soaps.'
  },
  fluoride: {
    code: 'fluoride',
    name: 'Fluoride (as F)',
    standard: 'IS 10500:2012',
    unit: 'mg/L',
    type: 'max',
    acceptableMax: 1.0,
    permissibleMax: 1.5,
    hasRelaxation: true,
    category: 'Toxic Chemical',
    healthRelevance: 'Excess ingestion (>1.5 mg/L) causes irreversible dental and crippling skeletal fluorosis.'
  },
  nitrate: {
    code: 'nitrate',
    name: 'Nitrate (as NO3)',
    standard: 'IS 10500:2012',
    unit: 'mg/L',
    type: 'max',
    acceptableMax: 45.0,
    permissibleMax: 45.0, // No relaxation
    hasRelaxation: false,
    category: 'Toxic Chemical',
    healthRelevance: 'Concentrations above 45 mg/L induce infantile methemoglobinemia (Blue Baby Syndrome).'
  },
  arsenic: {
    code: 'arsenic',
    name: 'Arsenic (as As)',
    standard: 'IS 10500:2012',
    unit: 'mg/L',
    type: 'max',
    acceptableMax: 0.01,
    permissibleMax: 0.05,
    hasRelaxation: true,
    category: 'Toxic Heavy Metal',
    healthRelevance: 'Carcinogenic metalloid. Chronic ingestion causes skin keratosis, hyperpigmentation, and cancer.'
  },
  coliform: {
    code: 'coliform',
    name: 'E. Coli / Thermotolerant Coliform Bacteria',
    standard: 'IS 10500:2012',
    unit: 'CFU/100 mL',
    type: 'exact',
    acceptableMax: 0,
    permissibleMax: 0,
    hasRelaxation: false,
    category: 'Microbiological',
    healthRelevance: 'Direct indicator of recent fecal contamination and high potential exposure to enteric pathogens.'
  }
};
