import Location from '../models/Location.js';
import GroundwaterObservation from '../models/GroundwaterObservation.js';
import WaterQualitySample from '../models/WaterQualitySample.js';
import { formatEnvelope } from '../middleware/responseEnvelope.js';

export async function getLocationDashboard(req, res, next) {
  try {
    const { id } = req.params;
    const location = await Location.findOne({ locationId: id }).lean();
    if (!location) {
      return res.status(404).json({
        success: false,
        error: { code: 'LOCATION_NOT_FOUND', message: `Location ${id} not found.` }
      });
    }

    const latestGw = await GroundwaterObservation.findOne({ locationId: id })
      .sort({ observationDate: -1 })
      .lean();

    const latestWq = await WaterQualitySample.findOne({ locationId: id })
      .sort({ sampleDate: -1 })
      .lean();

    const data = {
      location,
      groundwater: latestGw,
      drinkingWaterQuality: latestWq
    };

    const limitations = [];
    if (!latestGw) limitations.push('No direct groundwater observation well records linked to this specific administrative sub-unit.');
    if (!latestWq) limitations.push('No open laboratory test reports available for this ward or locality.');

    res.json(formatEnvelope(data, {
      coverage: {
        geographicLevel: location.level,
        hasGroundwaterData: Boolean(latestGw),
        hasWaterQualityData: Boolean(latestWq)
      },
      limitations
    }));
  } catch (err) {
    next(err);
  }
}