export class UnitNormalizer {
  /**
   * Groundwater depth normalization:
   * Translates feet or cm into standard 'meters below ground level (mbgl)'
   */
  static normalizeGroundwaterDepth(val, reportedUnit) {
    if (val === null || val === undefined || isNaN(val)) return null;
    const num = Number(val);
    const u = (reportedUnit || 'mbgl').trim().toLowerCase();

    if (u === 'm' || u === 'meters' || u === 'mbgl' || u === 'm bgl') {
      return { value: Number(num.toFixed(2)), unit: 'meters below ground level (mbgl)' };
    }
    if (u === 'ft' || u === 'feet') {
      return { value: Number((num * 0.3048).toFixed(2)), unit: 'meters below ground level (mbgl)' };
    }
    if (u === 'cm') {
      return { value: Number((num / 100).toFixed(2)), unit: 'meters below ground level (mbgl)' };
    }
    return { value: num, unit: reportedUnit };
  }
}