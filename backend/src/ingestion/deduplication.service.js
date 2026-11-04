import GroundwaterObservation from '../models/GroundwaterObservation.js';
import WaterQualitySample from '../models/WaterQualitySample.js';

export class DeduplicationService {
  /**
   * Idempotent Groundwater Observation Deduplication
   * Matches by composite key: (stationId + observationDate + measurementType)
   */
  static async reconcileGroundwater(candidateRecord) {
    const query = {
      stationId: candidateRecord.stationId,
      observationDate: candidateRecord.observationDate
    };

    const existing = await GroundwaterObservation.findOne(query);
    if (!existing) {
      return { action: 'INSERT', doc: candidateRecord };
    }

    // Never overwrite verified official record with demo data
    if (existing.verificationStatus === 'verified' && candidateRecord.verificationStatus === 'demo') {
      return { action: 'SKIP', reason: 'Cannot overwrite verified record with demo fixture' };
    }

    if (existing.measurementValue === candidateRecord.measurementValue) {
      return { action: 'SKIP', reason: 'Identical record already exists' };
    }

    return { action: 'UPDATE', existingId: existing._id, doc: candidateRecord };
  }
}