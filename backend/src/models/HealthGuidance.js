import mongoose from 'mongoose';

const HealthGuidanceSchema = new mongoose.Schema({
  topicSlug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  causativeAgent: { type: String, required: true },
  transmission: { type: String, required: true },
  warningSigns: { type: String, required: true },
  prevention: { type: String, required: true },
  chemicalVsBoilingNote: { type: String, required: true }
});

export default mongoose.model('HealthGuidance', HealthGuidanceSchema);