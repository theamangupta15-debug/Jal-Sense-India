import { IntelligenceService } from '../intelligence/summary/intelligenceService.js';
import { formatEnvelope } from '../middleware/responseEnvelope.js';

export async function getLocationIntelligence(req, res, next) {
  try {
    const { id } = req.params;
    const report = await IntelligenceService.generateLocationIntelligence(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        error: { code: 'LOCATION_NOT_FOUND', message: `Location ${id} does not exist.` }
      });
    }

    const limitations = [];
    if (!report.waterQualityIntelligence.hasLabData) {
      limitations.push('No public laboratory water quality reports exist for this location at ward or locality level.');
    }
    if (!report.groundwaterIntelligence.hasStationData) {
      limitations.push('No direct observation wells linked to this specific administrative sub-unit.');
    }

    res.json(
      formatEnvelope(report, {
        provenance: report.sources,
        coverage: { geographicLevel: report.location.level },
        limitations
      })
    );
  } catch (err) {
    next(err);
  }
}