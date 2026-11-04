import { LocationMatcher } from '../../normalizers/locationMatcher.js';
import { UnitNormalizer } from '../../normalizers/unitNormalizer.js';

export class CGWBAdapter {
  constructor() {
    this.sourceId = 'SRC-CGWB';
    this.locationMatcher = new LocationMatcher();
  }

  async initialize() {
    await this.locationMatcher.initialize();
  }

  /**
   * Transforms raw CGWB portal station rows into normalized groundwater models
   */
  transformRecord(rawRow) {
    // Expected fields from CGWB extract: Station Name, Taluka, Lat, Long, Date, Depth_mbgl, Season
    const normalizedDepth = UnitNormalizer.normalizeGroundwaterDepth(rawRow.depth_mbgl, 'mbgl');
    const matchedLoc = this.locationMatcher.resolveLocation({
      talukaName: rawRow.taluka,
      stationName: rawRow.station_name
    });

    if (!matchedLoc) {
      return {
        success: false,
        rawPayload: rawRow,
        reasons: [`Could not associate taluka '${rawRow.taluka}' to known administrative location`]
      };
    }

    return {
      success: true,
      data: {
        locationId: matchedLoc.locationId,
        stationId: rawRow.station_code || `CGWB-MH-NGP-${rawRow.station_name.replace(/\s+/g, '_').toUpperCase()}`,
        measurementValue: normalizedDepth.value,
        unit: normalizedDepth.unit,
        season: rawRow.season || 'post_monsoon',
        observationDate: new Date(rawRow.observation_date),
        sourceId: this.sourceId,
        verificationStatus: 'verified',
        isDemo: false,
        notes: `CGWB National Water Monitoring Station: ${rawRow.station_name}`
      }
    };
  }
}