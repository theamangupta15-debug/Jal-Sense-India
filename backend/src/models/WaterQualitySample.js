import mongoose from 'mongoose';

const ParameterResultSchema = new mongoose.Schema(
  {
    parameterCode: { type: String, required: true },
    parameterName: { type: String, required: true },
    measuredValue: { type: Number, default: null }, // NEVER default to 0
    unit: { type: String, required: true },
    status: {
      type: String,
      enum: ['Safe', 'Caution', 'Potential Health Risk', 'InsufficientData', 'not_assessed'],
      default: 'not_assessed'
    },
    healthRelevance: { type: String, default: null }
  },
  { _id: false }
);

const WaterQualitySampleSchema = new mongoose.Schema(
  {
    sampleId: { type: String, required: true, unique: true, index: true },
    locationId: { type: String, required: true, index: true },
    sampleDate: { type: Date, required: true, index: true },
    sampleType: {
      type: String,
      enum: ['tap_water', 'groundwater', 'surface_water'],
      required: true
    },
    samplingMethod: {
      type: String,
      enum: ['laboratory_tested', 'field_test_kit', 'government_reported', 'demo'],
      default: 'laboratory_tested'
    },
    laboratoryName: { type: String, default: null },
    overallComplianceStatus: {
      type: String,
      enum: ['Safe', 'Caution', 'Potential Health Risk', 'InsufficientData'],
      default: 'InsufficientData'
    },
    parameters: [ParameterResultSchema],
    sourceId: { type: String, required: true, default: 'SRC-NMC-OCW' },
    verificationStatus: {
      type: String,
      enum: ['verified', 'unverified', 'demo', 'stale'],
      default: 'demo'
    },
    isDemo: { type: Boolean, default: true }
  },
  { timestamps: true }
);

WaterQualitySampleSchema.index({ locationId: 1, sampleDate: -1 });

export default mongoose.model('WaterQualitySample', WaterQualitySampleSchema);