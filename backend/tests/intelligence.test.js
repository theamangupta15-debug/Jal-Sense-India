import { describe, it, expect } from 'vitest';
import { WaterQualityComparisonEngine } from '../src/intelligence/water-quality/comparisonEngine.js';
import { GroundwaterTrendAnalyzer } from '../src/intelligence/groundwater/trendAnalyzer.js';
import { ConcernClassifier } from '../src/intelligence/concern-classification/concernClassifier.js';
import { RecommendationEngine } from '../src/intelligence/recommendations/recommendationEngine.js';

describe('Phase 5 Data Intelligence & Risk Interpretation Tests', () => {
  it('correctly classifies pH within acceptable range (6.5 - 8.5)', () => {
    const res = WaterQualityComparisonEngine.evaluateParameter({
      parameterCode: 'ph',
      measuredValue: 7.4,
      unit: 'pH units'
    });
    expect(res.outcome).toBe('within_applicable_limit');
    expect(res.isExceedance).toBe(false);
  });

  it('correctly flags Fluoride above acceptable limit (1.0 mg/L) but below permissible (1.5 mg/L)', () => {
    const res = WaterQualityComparisonEngine.evaluateParameter({
      parameterCode: 'fluoride',
      measuredValue: 1.2,
      unit: 'mg/L'
    });
    expect(res.outcome).toBe('above_acceptable_limit');
    expect(res.isExceedance).toBe(true);
  });

  it('correctly flags Nitrate exceedance above 45 mg/L as above_permissible_limit', () => {
    const res = WaterQualityComparisonEngine.evaluateParameter({
      parameterCode: 'nitrate',
      measuredValue: 62.0,
      unit: 'mg/L'
    });
    expect(res.outcome).toBe('above_permissible_limit');
    expect(res.isExceedance).toBe(true);
  });

  it('calculates groundwater table depletion delta correctly', () => {
    const obs = [
      { observationDate: '2023-11-15', measurementValue: 6.5 },
      { observationDate: '2024-11-15', measurementValue: 8.5 }
    ];
    const trend = GroundwaterTrendAnalyzer.analyzeObservations(obs);
    expect(trend.direction).toBe('depleting');
    expect(trend.deltaMbgl).toBe(2.0);
    expect(trend.observationCount).toBe(2);
  });

  it('never classifies missing data as safe; returns insufficient_evidence', () => {
    const concern = ConcernClassifier.classifySample([]);
    expect(concern.level).toBe('insufficient_evidence');
    expect(concern.label).toContain('Insufficient Evidence');
  });

  it('strictly instructs that boiling does NOT remove chemical contaminants', () => {
    const evaluations = [
      { parameterCode: 'fluoride', isExceedance: true }
    ];
    const recs = RecommendationEngine.generateRecommendations({
      concern: { level: 'elevated_concern' },
      sampleEvaluations: evaluations
    });
    const boilingRec = recs.find((r) => r.text.includes('boiling'));
    expect(boilingRec).toBeDefined();
    expect(boilingRec.text).toContain('Do NOT rely on boiling for chemical contaminants');
  });
});