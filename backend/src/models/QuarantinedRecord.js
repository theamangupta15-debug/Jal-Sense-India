import mongoose from 'mongoose';

const QuarantinedRecordSchema = new mongoose.Schema(
  {
    batchId: { type: String, required: true, index: true },
    sourceId: { type: String, required: true, index: true },
    sourceRecordId: { type: String, default: null },
    rawPayload: { type: mongoose.Schema.Types.Mixed, required: true },
    rejectionReasons: [{ type: String, required: true }],
    validationStage: {
      type: String,
      enum: ['schema', 'range', 'location_matching', 'unit_normalization', 'duplicate_conflict'],
      required: true
    },
    quarantinedAt: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

export default mongoose.model('QuarantinedRecord', QuarantinedRecordSchema);