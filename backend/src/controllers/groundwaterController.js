import GroundwaterObservation from '../models/GroundwaterObservation.js';
import Source from '../models/Source.js';
import { formatEnvelope } from '../middleware/responseEnvelope.js';

export async function getGroundwaterByLocation(req, res, next) {
  try {
    const { id } = req.params;
    const records = await GroundwaterObservation.find({ locationId: id })
      .sort({ observationDate: -1 })
      .lean();

    const source = await Source.findOne({ sourceId: 'SRC-CGWB' }).lean();

    const limitations = [
      'Groundwater levels reflect regional aquifer table depths in meters below ground level (mbgl); they do not measure municipal tap pipeline supply.',
      'Observations are recorded at fixed monitoring wells, not ward-level polygons.'
    ];

    res.json(formatEnvelope(records.length ? records : null, {
      provenance: source ? [source] : [],
      coverage: { geographicLevel: 'Station / Taluka', isComplete: records.length > 0 },
      limitations
    }));
  } catch (err) {
    next(err);
  }
}