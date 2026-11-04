import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    locationId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    localNames: {
      hi: { type: String, default: null },
      mr: { type: String, default: null }
    },
    level: {
      type: String,
      required: true,
      enum: ['country', 'state', 'district', 'taluka', 'city', 'ward', 'village'],
      index: true
    },
    parentId: { type: String, default: null, index: true },
    stateCode: { type: String, default: 'MH' },
    districtCode: { type: String, default: 'NAG' },
    lgdCode: { type: Number, default: null },
    jurisdiction: { type: String, default: null },
    aliases: [{ type: String, index: true }],
    sourceId: { type: String, default: 'SRC-LOC-LGD' },
    lastVerifiedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

LocationSchema.index({ parentId: 1, level: 1 });

export default mongoose.model('Location', LocationSchema);