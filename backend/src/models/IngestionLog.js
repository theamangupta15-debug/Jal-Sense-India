import mongoose from 'mongoose';

const IngestionLogSchema = new mongoose.Schema(
  {
    runId: { type: String, required: true, unique: true, index: true },
    sourceId: { type: String, required: true, index: true },
    runMode: { type: String, enum: ['manual_cli', 'scheduled', 'api_trigger', 'seed'], default: 'manual_cli' },
    status: { type: String, enum: ['running', 'success', 'partial_success', 'failed'], default: 'running', index: true },
    startedAt: { type: Date, required: true, default: Date.now },
    completedAt: { type: Date, default: null },
    recordsRead: { type: Number, default: 0 },
    recordsInserted: { type: Number, default: 0 },
    recordsUpdated: { type: Number, default: 0 },
    recordsSkipped: { type: Number, default: 0 },
    recordsQuarantined: { type: Number, default: 0 },
    errorSummary: { type: String, default: null },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model('IngestionLog', IngestionLogSchema);