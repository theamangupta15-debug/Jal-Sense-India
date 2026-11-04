export class ConcernClassifier {
  /**
   * Classifies drinking water sample findings based on BIS parameter evaluations
   */
  static classifySample(evaluatedParams = []) {
    if (!evaluatedParams || evaluatedParams.length === 0) {
      return {
        level: 'insufficient_evidence',
        code: 'NO_TEST_DATA',
        label: 'Insufficient Evidence',
        summary: 'No verified laboratory water-quality measurements exist for this location. Tap safety cannot be determined.'
      };
    }

    const hasAbovePermissible = evaluatedParams.some((p) => p.outcome === 'above_permissible_limit');
    const hasAboveAcceptable = evaluatedParams.some((p) => p.outcome === 'above_acceptable_limit');
    const hasMicrobialColiforms = evaluatedParams.some(
      (p) => (p.parameterCode === 'coliform' || p.parameterCode === 'e_coli') && p.isExceedance
    );

    if (hasAbovePermissible || hasMicrobialColiforms) {
      const offending = evaluatedParams.filter((p) => p.outcome === 'above_permissible_limit' || p.isExceedance);
      return {
        level: 'elevated_concern',
        code: 'STANDARD_EXCEEDANCE',
        label: 'Elevated Concern (Sample-Scoped)',
        summary: `Tested sample exceeds permissible thresholds for: ${offending.map((o) => o.parameterName).join(', ')}.`,
        offendingParameters: offending.map((o) => o.parameterCode)
      };
    }

    if (hasAboveAcceptable) {
      const offending = evaluatedParams.filter((p) => p.outcome === 'above_acceptable_limit');
      return {
        level: 'moderate_concern',
        code: 'ACCEPTABLE_LIMIT_EXCEEDANCE',
        label: 'Moderate Concern (Relaxation Threshold)',
        summary: `Parameters (${offending.map((o) => o.parameterName).join(', ')}) exceed desirable limits but remain within conditional permissible limits.`,
        offendingParameters: offending.map((o) => o.parameterCode)
      };
    }

    return {
      level: 'limited_concern_identified',
      code: 'WITHIN_TESTED_LIMITS',
      label: 'Limited Concern in Tested Parameters',
      summary: 'All tested parameters in this specific sample comply with BIS IS 10500 limits. Note: This applies only to the tested parameters and does not certify the entire locality as universally safe.'
    };
  }
}