export class UnitConverter {
  /**
   * Normalizes chemical concentrations to standard mg/L
   */
  static convertChemicalConcentration(value, fromUnit) {
    if (value === null || value === undefined || isNaN(value)) return null;
    const u = (fromUnit || '').trim().toLowerCase();

    if (u === 'mg/l' || u === 'ppm') {
      return { value: Number(value), unit: 'mg/L' };
    }
    if (u === 'ug/l' || u === 'µg/l' || u === 'ppb') {
      return { value: Number((value / 1000).toFixed(6)), unit: 'mg/L' };
    }
    // Return original if no valid conversion exists
    return { value: Number(value), unit: fromUnit };
  }
}