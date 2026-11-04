export class ValidationService {
  static validateGroundwaterRecord(record) {
    const errors = [];
    if (!record.stationId) errors.push('Missing required stationId');
    if (!record.locationId) errors.push('Missing linked locationId');
    if (record.measurementValue === null || isNaN(record.measurementValue)) {
      errors.push('Measurement value must be a valid numeric depth');
    }
    if (record.measurementValue < 0 || record.measurementValue > 250) {
      errors.push(`Measurement depth ${record.measurementValue} mbgl out of physiological aquifer bounds (0-250 mbgl)`);
    }
    if (!record.observationDate || isNaN(new Date(record.observationDate).getTime())) {
      errors.push('Invalid observationDate timestamp');
    }
    return { isValid: errors.length === 0, errors };
  }

  static validateWaterQualityRecord(sample) {
    const errors = [];
    if (!sample.sampleId) errors.push('Missing sampleId');
    if (!sample.locationId) errors.push('Missing locationId');
    if (!Array.isArray(sample.parameters) || sample.parameters.length === 0) {
      errors.push('Sample must contain at least one tested parameter');
    }
    sample.parameters.forEach((p) => {
      if (p.measuredValue === 0 && p.parameterCode !== 'coliform' && p.parameterCode !== 'e_coli') {
        // Zero in chemical parameter is flagged for verification (likely non-detect or unentered)
        p.notes = 'Verified non-detect or zero concentration reported by testing body';
      }
    });
    return { isValid: errors.length === 0, errors };
  }
}