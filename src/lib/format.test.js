import { describe, it, expect } from 'vitest';
import { formatMeasurement, missingProvenance, search, UNAVAILABLE } from './format.js';
import { locations } from '../data/locations.js';
describe('data integrity', () => {
  it('never renders missing values as zero', () => { for (const m of [null, {}, { value: null, unit: 'mg/L' }, { value: undefined }]) expect(formatMeasurement(m)).toBe(UNAVAILABLE); });
  it('keeps a real zero distinct from missing', () => expect(formatMeasurement({ value: 0, unit: 'NTU' })).toBe('0 NTU'));
  it('flags records lacking source, date or scope', () => expect(missingProvenance({ source: 'x' })).toEqual(['date', 'scope']));
  it('returns ambiguous names across levels', () => expect(search(locations, 'nagpur').length).toBeGreaterThan(2));
  it('empty or unknown search returns nothing', () => { expect(search(locations, '')).toEqual([]); expect(search(locations, 'zzz')).toEqual([]); });
  it('fixtures contain no measurements', () => expect(locations.some((l) => 'value' in l)).toBe(false));
});
