import Location from '../models/Location.js';
import { formatEnvelope } from '../middleware/responseEnvelope.js';

export async function getAllLocations(req, res, next) {
  try {
    const { level, parentId } = req.query;
    const filter = {};
    if (level) filter.level = level;
    if (parentId) filter.parentId = parentId;

    const locations = await Location.find(filter).lean();
    res.json(formatEnvelope(locations, {
      provenance: [{ source: 'LGD & CGWB Administrative Index' }],
      coverage: { geographicLevel: 'Nagpur District Hierarchy' }
    }));
  } catch (err) {
    next(err);
  }
}

export async function searchLocations(req, res, next) {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.json(formatEnvelope([]));
    }
    const term = q.trim();
    const regex = new RegExp(term, 'i');

    const results = await Location.find({
      $or: [
        { name: regex },
        { 'localNames.hi': regex },
        { 'localNames.mr': regex },
        { aliases: regex }
      ]
    }).lean();

    res.json(formatEnvelope(results));
  } catch (err) {
    next(err);
  }
}

export async function getLocationById(req, res, next) {
  try {
    const { id } = req.params;
    const loc = await Location.findOne({ locationId: id }).lean();
    if (!loc) {
      return res.status(404).json({
        success: false,
        error: { code: 'LOCATION_NOT_FOUND', message: `Location ${id} not found.` }
      });
    }
    res.json(formatEnvelope(loc));
  } catch (err) {
    next(err);
  }
}