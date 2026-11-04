import Location from '../../models/Location.js';
import GroundwaterObservation from '../../models/GroundwaterObservation.js';
import WaterQualitySample from '../../models/WaterQualitySample.js';
import Source from '../../models/Source.js';
import { WaterQualityComparisonEngine } from '../water-quality/comparisonEngine.js';
import { GroundwaterTrendAnalyzer } from '../groundwater/trendAnalyzer.js';
import { FreshnessEvaluator } from '../data-quality/freshnessEvaluator.js';
import { ConcernClassifier } from '../concern-classification/concernClassifier.js';
import { RecommendationEngine } from '../recommendations/recommendationEngine.js';

export class IntelligenceService {
  static async generateLocationIntelligence(locationId) {
    const location = await Location.findOne({ locationId }).lean();
    if (!location) return null;

    // 1. Fetch Groundwater Observations
    const gwObservations = await GroundwaterObservation.find({ locationId })
      .sort({ observationDate: 1 })
      .lean();
    const gwAnalysis = GroundwaterTrendAnalyzer.analyzeObservations(gwObservations);
    const gwFreshness = gwObservations.length
      ? FreshnessEvaluator.evaluateFreshness(gwObservations[gwObservations.length - 1].observationDate, 'groundwater')
      : null;

    // 2. Fetch Latest Water Quality Sample
    const latestSample = await WaterQualitySample.findOne({ locationId })
      .sort({ sampleDate: -1 })
      .lean();

    let sampleEvaluations = [];
    if (latestSample && latestSample.parameters) {
      sampleEvaluations = latestSample.parameters.map((p) =>
        WaterQualityComparisonEngine.evaluateParameter(p)
      );
    }

    const concern = ConcernClassifier.classifySample(sampleEvaluations);
    const wqFreshness = latestSample
      ? FreshnessEvaluator.evaluateFreshness(latestSample.sampleDate, 'water_quality')
      : null;

    // 3. Generate Recommendations
    const recommendations = RecommendationEngine.generateRecommendations({
      concern,
      sampleEvaluations,
      groundwaterAnalysis: gwAnalysis
    });

    // 4. Sources
    const sources = await Source.find({ sourceId: { $in: ['SRC-CGWB', 'SRC-BIS-10500', 'SRC-NMC-OCW'] } }).lean();

    return {
      location: {
        id: location.locationId,
        name: location.name,
        level: location.level,
        jurisdiction: location.jurisdiction
      },
      groundwaterIntelligence: {
        analysis: gwAnalysis,
        freshness: gwFreshness,
        hasStationData: gwObservations.length > 0
      },
      waterQualityIntelligence: {
        sampleInfo: latestSample ? { id: latestSample.sampleId, date: latestSample.sampleDate, type: latestSample.sampleType } : null,
        parameterEvaluations: sampleEvaluations,
        concernClassification: concern,
        freshness: wqFreshness,
        hasLabData: Boolean(latestSample)
      },
      recommendations,
      sources,
      generatedAt: new Date().toISOString()
    };
  }
}