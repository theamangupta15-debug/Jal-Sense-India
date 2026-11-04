import mongoose from 'mongoose';

const GroundwaterObservationSchema = new mongoose.Schema(
  {
    locationId: { type: String, required: true, index: true },
    stationId: { type: String, required: true, index: true },
    measurementValue: { type: Number, required: true },
    unit: { type: String, required: true, default: 'meters below ground level (mbgl)' },
    season: {
      type: String,
      enum: ['pre_monsoon', 'post_monsoon', 'rabi', 'annual_average'],
      default: 'post_monsoon'
    },
    observationDate: { type: Date, required: true, index: true },
    sourceId: { type: String, required: true, default: 'SRC-CGWB' },
    verificationStatus: {
      type: String,
      enum: ['verified', 'unverified', 'demo', 'stale'],
      default: 'verified'
    },
    isDemo: { type: Boolean, default: false }
  },
  { timestamps: true }
);

GroundwaterObservationSchema.index({ locationId: 1, observationDate: -1 });

export default mongoose.model('GroundwaterObservation', GroundwaterObservationSchema);