import WaterQualitySample from '../models/WaterQualitySample.js';
import Source from '../models/Source.js';
import { formatEnvelope } from '../middleware/responseEnvelope.js';

export async function getWaterQualityByLocation(req, res, next) {
  try {
    const { id } = req.params;
    const sample = await WaterQualitySample.findOne({ locationId: id })
      .sort({ sampleDate: -1 })
      .lean();

    const source = await Source.findOne({ sourceId: 'SRC-NMC-OCW' }).lean();

    const limitations = [
      'No public, machine-readable laboratory water quality test reports exist for Nagpur city wards or localities in open data repositories.',
      'Do not assume water is safe simply because specific parameters are unmeasured.'
    ];

    res.json(formatEnvelope(sample || null, {
      provenance: source ? [source] : [],
      coverage: { geographicLevel: 'City narrative only', isComplete: false },
      limitations
    }));
  } catch (err) {
    next(err);
  }
}