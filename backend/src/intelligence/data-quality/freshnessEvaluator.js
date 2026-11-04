export class FreshnessEvaluator {
  /**
   * Groundwater observations are quarterly; valid freshness window is 180 days.
   * Drinking water samples are routine; valid freshness window is 60 days.
   */
  static evaluateFreshness(recordDate, category = 'groundwater') {
    if (!recordDate) {
      return { status: 'unknown', ageDays: null, label: 'Date unavailable' };
    }

    const obsTime = new Date(recordDate).getTime();
    const now = Date.now();
    const ageDays = Math.floor((now - obsTime) / (1000 * 60 * 60 * 24));

    const thresholdDays = category === 'groundwater' ? 180 : 60;

    if (ageDays <= thresholdDays) {
      return { status: 'fresh', ageDays, label: `Observed ${ageDays} days ago (Within expected ${thresholdDays}-day monitoring cycle)` };
    }
    return { status: 'stale', ageDays, label: `Observed ${ageDays} days ago (Exceeds current ${thresholdDays}-day freshness cycle)` };
  }
}