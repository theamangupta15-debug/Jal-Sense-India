import Location from '../../models/Location.js';
import GroundwaterObservation from '../../models/GroundwaterObservation.js';
import WaterQualitySample from '../../models/WaterQualitySample.js';
import Source from '../../models/Source.js';
import HealthGuidance from '../../models/HealthGuidance.js';
import { VERIFIED_BIS_STANDARDS } from '../../intelligence/standards/standardsRegistry.js';
import { GroundwaterTrendAnalyzer } from '../../intelligence/groundwater/trendAnalyzer.js';
import { WaterQualityComparisonEngine } from '../../intelligence/water-quality/comparisonEngine.js';
import { IntelligenceService } from '../../intelligence/summary/intelligenceService.js';

export const TOOL_REGISTRY = {
  // Tool 1: resolve_location
  resolve_location: {
    description: 'Resolves a user-provided location query string to a verified administrative location record in Nagpur District.',
    execute: async ({ query }) => {
      if (!query || query.trim().length < 2) return null;
      const q = query.trim().toLowerCase();
      const match = await Location.findOne({
        $or: [
          { name: new RegExp(q, 'i') },
          { aliases: new RegExp(q, 'i') },
          { 'localNames.hi': q },
          { 'localNames.mr': q }
        ]
      }).lean();
      return match || null;
    }
  },

  // Tool 2: get_location_data_availability
  get_location_data_availability: {
    description: 'Checks which data categories exist, their observation dates, and known data gaps for a location.',
    execute: async ({ locationId }) => {
      const hasGw = await GroundwaterObservation.exists({ locationId });
      const hasWq = await WaterQualitySample.exists({ locationId });
      return {
        locationId,
        groundwaterAvailable: Boolean(hasGw),
        drinkingWaterLabAvailable: Boolean(hasWq),
        limitations: [
          !hasWq ? 'No public laboratory test datasets exist for this location at ward or locality level.' : null,
          !hasGw ? 'No monitoring well records directly linked to this sub-unit.' : null
        ].filter(Boolean)
      };
    }
  },

  // Tool 3: get_groundwater_observations
  get_groundwater_observations: {
    description: 'Retrieves actual groundwater observations (meters below ground level) for a location.',
    execute: async ({ locationId, limit = 10 }) => {
      return await GroundwaterObservation.find({ locationId })
        .sort({ observationDate: -1 })
        .limit(Math.min(limit, 20))
        .lean();
    }
  },

  // Tool 4: analyze_groundwater_trend
  analyze_groundwater_trend: {
    description: 'Calculates historical water table delta, direction (recharging/depleting), and observation count.',
    execute: async ({ locationId }) => {
      const obs = await GroundwaterObservation.find({ locationId }).sort({ observationDate: 1 }).lean();
      return GroundwaterTrendAnalyzer.analyzeObservations(obs);
    }
  },

  // Tool 5: get_water_quality_samples
  get_water_quality_samples: {
    description: 'Retrieves authentic drinking water quality laboratory test samples for a location.',
    execute: async ({ locationId }) => {
      return await WaterQualitySample.find({ locationId }).sort({ sampleDate: -1 }).limit(5).lean();
    }
  },

  // Tool 6: interpret_water_quality
  interpret_water_quality: {
    description: 'Compares a tested water quality parameter against official BIS IS 10500:2012 benchmarks.',
    execute: async ({ parameterCode, measuredValue, unit }) => {
      return WaterQualityComparisonEngine.evaluateParameter({ parameterCode, measuredValue, unit });
    }
  },

  // Tool 7: get_bis_standard
  get_bis_standard: {
    description: 'Retrieves acceptable and permissible limit benchmarks for a parameter under BIS IS 10500:2012.',
    execute: async ({ parameterCode }) => {
      return VERIFIED_BIS_STANDARDS[parameterCode.toLowerCase()] || null;
    }
  },

  // Tool 8: search_official_guidance
  search_official_guidance: {
    description: 'Searches curated public health guidance from NCDC and MoHFW regarding waterborne diseases and treatment.',
    execute: async ({ topic }) => {
      const q = topic ? new RegExp(topic, 'i') : /.*/;
      return await HealthGuidance.find({
        $or: [{ topicSlug: q }, { title: q }, { chemicalVsBoilingNote: q }]
      }).lean();
    }
  },

  // Tool 9: get_source_details
  get_source_details: {
    description: 'Retrieves canonical metadata, publisher, and official URL for a data source.',
    execute: async ({ sourceId }) => {
      return await Source.findOne({ sourceId }).lean();
    }
  },

  // Tool 10: get_location_intelligence
  get_location_intelligence: {
    description: 'Retrieves the complete aggregated Phase 5 intelligence bundle (groundwater + water quality + recommendations).',
    execute: async ({ locationId }) => {
      return await IntelligenceService.generateLocationIntelligence(locationId);
    }
  }
};