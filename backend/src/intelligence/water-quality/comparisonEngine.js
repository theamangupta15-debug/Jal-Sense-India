import { VERIFIED_BIS_STANDARDS } from '../standards/standardsRegistry.js';
import { UnitConverter } from './unitConverter.js';

export class WaterQualityComparisonEngine {
  /**
   * Evaluates a single measured parameter against BIS IS 10500:2012
   */
  static evaluateParameter(param) {
    const std = VERIFIED_BIS_STANDARDS[param.parameterCode];

    if (!std) {
      return {
        parameterCode: param.parameterCode,
        parameterName: param.parameterName || param.parameterCode,
        measuredValue: param.measuredValue,
        unit: param.unit,
        outcome: 'not_assessed',
        explanation: 'No verified BIS IS 10500:2012 benchmark is registered for this parameter.'
      };
    }

    if (param.measuredValue === null || param.measuredValue === undefined) {
      return {
        parameterCode: std.code,
        parameterName: std.name,
        measuredValue: null,
        unit: std.unit,
        outcome: 'insufficient_data',
        explanation: 'Measurement was not recorded or reported for this parameter.'
      };
    }

    // Convert units if applicable
    let evalVal = param.measuredValue;
    if (std.unit === 'mg/L' && param.unit !== 'mg/L') {
      const converted = UnitConverter.convertChemicalConcentration(param.measuredValue, param.unit);
      evalVal = converted.value;
    }

    // Range Check (e.g. pH: 6.5 - 8.5)
    if (std.type === 'range') {
      if (evalVal < std.acceptableMin) {
        return {
          parameterCode: std.code,
          parameterName: std.name,
          measuredValue: evalVal,
          unit: std.unit,
          standard: std.standard,
          acceptableLimit: `${std.acceptableMin} - ${std.acceptableMax}`,
          permissibleLimit: 'No relaxation',
          outcome: 'below_acceptable_limit',
          isExceedance: true,
          explanation: `Measured value (${evalVal}) is below the acceptable acidic baseline of ${std.acceptableMin}. Can induce pipe corrosion.`
        };
      }
      if (evalVal > std.acceptableMax) {
        return {
          parameterCode: std.code,
          parameterName: std.name,
          measuredValue: evalVal,
          unit: std.unit,
          standard: std.standard,
          acceptableLimit: `${std.acceptableMin} - ${std.acceptableMax}`,
          permissibleLimit: 'No relaxation',
          outcome: 'above_acceptable_limit',
          isExceedance: true,
          explanation: `Measured value (${evalVal}) exceeds the acceptable alkaline threshold of ${std.acceptableMax}. Reduces chlorination efficacy.`
        };
      }
      return {
        parameterCode: std.code,
        parameterName: std.name,
        measuredValue: evalVal,
        unit: std.unit,
        standard: std.standard,
        acceptableLimit: `${std.acceptableMin} - ${std.acceptableMax}`,
        permissibleLimit: 'No relaxation',
        outcome: 'within_applicable_limit',
        isExceedance: false,
        explanation: `Measured value (${evalVal}) is strictly within the acceptable range of ${std.acceptableMin} - ${std.acceptableMax}.`
      };
    }

    // Microbiological Check (Coliform count must be strictly 0)
    if (std.type === 'exact') {
      if (evalVal > 0) {
        return {
          parameterCode: std.code,
          parameterName: std.name,
          measuredValue: evalVal,
          unit: std.unit,
          standard: std.standard,
          acceptableLimit: '0',
          permissibleLimit: 'Must not be detectable',
          outcome: 'above_permissible_limit',
          isExceedance: true,
          explanation: `Presence of coliforms (${evalVal} CFU/100mL) detected. Indicates potential fecal pathogen exposure.`
        };
      }
      return {
        parameterCode: std.code,
        parameterName: std.name,
        measuredValue: 0,
        unit: std.unit,
        standard: std.standard,
        acceptableLimit: '0',
        permissibleLimit: 'Must not be detectable',
        outcome: 'within_applicable_limit',
        isExceedance: false,
        explanation: 'Zero bacterial coliforms detected in sample at time of testing.'
      };
    }

    // Maximum Value Check (e.g., TDS, Fluoride, Arsenic, Nitrate)
    if (evalVal > std.permissibleMax) {
      return {
        parameterCode: std.code,
        parameterName: std.name,
        measuredValue: evalVal,
        unit: std.unit,
        standard: std.standard,
        acceptableLimit: `${std.acceptableMax}`,
        permissibleLimit: `${std.permissibleMax}`,
        outcome: 'above_permissible_limit',
        isExceedance: true,
        explanation: `Concentration (${evalVal} ${std.unit}) exceeds even the maximum permissible limit (${std.permissibleMax} ${std.unit}) in absence of alternate source.`
      };
    }

    if (evalVal > std.acceptableMax) {
      return {
        parameterCode: std.code,
        parameterName: std.name,
        measuredValue: evalVal,
        unit: std.unit,
        standard: std.standard,
        acceptableLimit: `${std.acceptableMax}`,
        permissibleLimit: `${std.permissibleMax}`,
        outcome: 'above_acceptable_limit',
        isExceedance: true,
        explanation: `Concentration (${evalVal} ${std.unit}) exceeds the desirable acceptable limit (${std.acceptableMax} ${std.unit}), but remains within conditional permissible limit.`
      };
    }

    return {
      parameterCode: std.code,
      parameterName: std.name,
      measuredValue: evalVal,
      unit: std.unit,
      standard: std.standard,
      acceptableLimit: `${std.acceptableMax}`,
      permissibleLimit: `${std.permissibleMax}`,
      outcome: 'within_applicable_limit',
      isExceedance: false,
      explanation: `Concentration (${evalVal} ${std.unit}) complies with the acceptable limit (≤ ${std.acceptableMax} ${std.unit}).`
    };
  }
}