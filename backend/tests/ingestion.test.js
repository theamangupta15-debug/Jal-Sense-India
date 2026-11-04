import { describe, it, expect } from 'vitest';
import { ValidationService } from '../src/ingestion/validation.service.js';
import { UnitNormalizer } from '../src/integrations/normalizers/unitNormalizer.js';

describe('Phase 4 Data Ingestion & Quality Tests', () => {
  it('normalizes various length units into meters below ground level (mbgl)', () => {
    const fromFeet = UnitNormalizer.normalizeGroundwaterDepth(32.8, 'feet');
    expect(fromFeet.unit).toBe('meters below ground level (mbgl)');
    expect(fromFeet.value).toBeCloseTo(10.0, 1);

    const fromCm = UnitNormalizer.normalizeGroundwaterDepth(750, 'cm');
    expect(fromCm.value).toBe(7.5);
  });

  it('rejects groundwater depth values outside realistic aquifer bounds', () => {
    const validRec = {
      stationId: 'TEST-W01',
      locationId: 'LOC-MH-NAG-TAL-KAT',
      measurementValue: 12.4,
      observationDate: new Date()
    };
    expect(ValidationService.validateGroundwaterRecord(validRec).isValid).toBe(true);

    const outOfBoundsRec = {
      ...validRec,
      measurementValue: 450.0 // Beyond 250 mbgl limit
    };
    const res = ValidationService.validateGroundwaterRecord(outOfBoundsRec);
    expect(res.isValid).toBe(false);
    expect(res.errors[0]).toContain('out of physiological aquifer bounds');
  });

  it('preserves untested water quality parameters as null and flags suspicious zeros', () => {
    const sample = {
      sampleId: 'TEST-SMP-01',
      locationId: 'LOC-MH-NAG-CITY',
      parameters: [
        { parameterCode: 'tds', parameterName: 'TDS', measuredValue: 0 }
      ]
    };
    const check = ValidationService.validateWaterQualityRecord(sample);
    expect(check.isValid).toBe(true);
    expect(sample.parameters[0].notes).toContain('Verified non-detect or zero concentration');
  });
});