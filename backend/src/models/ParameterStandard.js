import mongoose from 'mongoose';

const ParameterStandardSchema = new mongoose.Schema({
  parameterCode: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  category: { type: String, required: true },
  acceptableLimit: { type: String, required: true },
  permissibleLimit: { type: String, required: true },
  significance: { type: String, required: true }
});

export default mongoose.model('ParameterStandard', ParameterStandardSchema);