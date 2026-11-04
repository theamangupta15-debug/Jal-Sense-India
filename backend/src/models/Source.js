import mongoose from 'mongoose';

const SourceSchema = new mongoose.Schema({
  sourceId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  publisher: { type: String, required: true },
  granularity: { type: String, required: true },
  updateFrequency: { type: String, required: true },
  accessMethod: { type: String, required: true },
  licenceStatus: { type: String, required: true },
  url: { type: String, required: true },
  notes: { type: String, default: null }
});

export default mongoose.model('Source', SourceSchema);