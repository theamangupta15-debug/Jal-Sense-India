import { randomUUID } from 'crypto';
import IngestionLog from '../models/IngestionLog.js';
import QuarantinedRecord from '../models/QuarantinedRecord.js';
import GroundwaterObservation from '../models/GroundwaterObservation.js';
import { ValidationService } from './validation.service.js';
import { DeduplicationService } from './deduplication.service.js';

export class IngestionService {
  static async ingestGroundwaterBatch(records, sourceId = 'SRC-CGWB', runMode = 'manual_cli') {
    const runId = `RUN-GW-${Date.now()}-${randomUUID().slice(0, 6)}`;
    const log = await IngestionLog.create({
      runId,
      sourceId,
      runMode,
      recordsRead: records.length,
      startedAt: new Date()
    });

    let inserted = 0;
    let updated = 0;
    let skipped = 0;
    let quarantined = 0;

    for (const raw of records) {
      // 1. Validation
      const validation = ValidationService.validateGroundwaterRecord(raw);
      if (!validation.isValid) {
        await QuarantinedRecord.create({
          batchId: runId,
          sourceId,
          sourceRecordId: raw.stationId,
          rawPayload: raw,
          rejectionReasons: validation.errors,
          validationStage: 'range'
        });
        quarantined++;
        continue;
      }

      // 2. Deduplication & Idempotent persistence
      const recon = await DeduplicationService.reconcileGroundwater(raw);
      if (recon.action === 'INSERT') {
        await GroundwaterObservation.create(recon.doc);
        inserted++;
      } else if (recon.action === 'UPDATE') {
        await GroundwaterObservation.findByIdAndUpdate(recon.existingId, recon.doc);
        updated++;
      } else {
        skipped++;
      }
    }

    log.completedAt = new Date();
    log.status = quarantined === 0 ? 'success' : 'partial_success';
    log.recordsInserted = inserted;
    log.recordsUpdated = updated;
    log.recordsSkipped = skipped;
    log.recordsQuarantined = quarantined;
    await log.save();

    return {
      runId,
      summary: { total: records.length, inserted, updated, skipped, quarantined }
    };
  }
}