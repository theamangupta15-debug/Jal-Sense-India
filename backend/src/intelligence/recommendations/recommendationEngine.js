export class RecommendationEngine {
  static generateRecommendations({ concern, sampleEvaluations = [], groundwaterAnalysis = null }) {
    const recommendations = [];

    // 1. Missing Data condition
    if (concern.level === 'insufficient_evidence') {
      recommendations.push({
        priority: 'high',
        text: 'Do not assume water is safe due to absence of data. If using for drinking, send a tap sample to an accredited public health laboratory in Nagpur.',
        rationale: 'Absence of published test data is not proof of purity.',
        source: 'MoHFW / BIS Guidelines'
      });
      return recommendations;
    }

    // 2. Microbial contamination
    const hasMicrobial = sampleEvaluations.some(
      (p) => (p.parameterCode === 'coliform' || p.parameterCode === 'e_coli') && p.isExceedance
    );
    if (hasMicrobial) {
      recommendations.push({
        priority: 'urgent',
        text: 'Vigorously boil all drinking water for at least 1 minute or use certified UV disinfection to inactivate pathogenic bacteria.',
        rationale: 'Biological coliform bacteria detected in sample.',
        source: 'NCDC / IDSP Waterborne Disease Advisory'
      });
    }

    // 3. Chemical contamination (Fluoride, Nitrate, Arsenic, TDS)
    const hasChemicalExceedance = sampleEvaluations.some(
      (p) => ['fluoride', 'nitrate', 'arsenic', 'tds'].includes(p.parameterCode) && p.isExceedance
    );
    if (hasChemicalExceedance) {
      recommendations.push({
        priority: 'urgent',
        text: 'CRITICAL: Do NOT rely on boiling for chemical contaminants. Boiling evaporates pure steam and concentrates dissolved chemical salts. Utilize validated Reverse Osmosis (RO) or certified defluoridation filtration.',
        rationale: 'Elevated chemical/heavy metal concentrations cannot be destroyed by thermal boiling.',
        source: 'BIS IS 10500 / WHO Drinking Water Guidelines'
      });
    }

    // 4. Groundwater Depletion
    if (groundwaterAnalysis?.direction === 'depleting') {
      recommendations.push({
        priority: 'medium',
        text: 'Local aquifer observations show seasonal depletion. Borewell users should practice rooftop rainwater harvesting to recharge the local water table.',
        rationale: 'CGWB monitoring stations indicate increasing depth to water table.',
        source: 'Central Ground Water Board (CGWB) Advisory'
      });
    }

    return recommendations;
  }
}