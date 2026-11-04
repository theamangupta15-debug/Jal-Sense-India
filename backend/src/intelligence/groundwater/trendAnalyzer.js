export class GroundwaterTrendAnalyzer {
  /**
   * Evaluates time-series observations in meters below ground level (mbgl).
   * Note: Higher depth (mbgl) = deeper, more depleted aquifer.
   */
  static analyzeObservations(observations = []) {
    if (!observations || observations.length === 0) {
      return {
        status: 'insufficient_data',
        message: 'No groundwater observations available for analysis.',
        observationCount: 0
      };
    }

    // Sort chronologically ascending
    const sorted = [...observations].sort(
      (a, b) => new Date(a.observationDate).getTime() - new Date(b.observationDate).getTime()
    );

    const count = sorted.length;
    const earliest = sorted[0];
    const latest = sorted[count - 1];

    const values = sorted.map((o) => o.measurementValue);
    const minDepth = Math.min(...values);
    const maxDepth = Math.max(...values);

    if (count < 2) {
      return {
        status: 'sparse_data',
        message: 'Only a single observation exists. At least 2 temporal points are required to compute change.',
        observationCount: count,
        latestObservation: {
          date: latest.observationDate,
          depthMbgl: latest.measurementValue,
          season: latest.season,
          stationId: latest.stationId
        },
        range: { minDepthMbgl: minDepth, maxDepthMbgl: maxDepth }
      };
    }

    // Delta between earliest and latest
    const delta = Number((latest.measurementValue - earliest.measurementValue).toFixed(2));
    let direction = 'stable';
    let semanticSummary = '';

    if (delta > 0.3) {
      direction = 'depleting';
      semanticSummary = `Water table depth increased by ${delta} meters (aquifer level dropped deeper below surface) between ${new Date(earliest.observationDate).toLocaleDateString()} and ${new Date(latest.observationDate).toLocaleDateString()}.`;
    } else if (delta < -0.3) {
      direction = 'recharging';
      semanticSummary = `Water table depth decreased by ${Math.abs(delta)} meters (aquifer level rose closer to surface) between ${new Date(earliest.observationDate).toLocaleDateString()} and ${new Date(latest.observationDate).toLocaleDateString()}.`;
    } else {
      direction = 'stable';
      semanticSummary = `Water table remained relatively stable (net fluctuation of ${delta} mbgl) over the observation window.`;
    }

    return {
      status: 'analyzed',
      observationCount: count,
      direction,
      earliestObservation: { date: earliest.observationDate, depthMbgl: earliest.measurementValue },
      latestObservation: { date: latest.observationDate, depthMbgl: latest.measurementValue, season: latest.season },
      deltaMbgl: delta,
      range: { minDepthMbgl: minDepth, maxDepthMbgl: maxDepth },
      semanticSummary,
      caveat: 'Water table depths represent aquifer storage; they do not measure municipal tap pipeline pressure or household water availability.'
    };
  }
}