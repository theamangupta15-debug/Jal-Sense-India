import IngestionLog from '../models/IngestionLog.js';
import QuarantinedRecord from '../models/QuarantinedRecord.js';
import { formatEnvelope } from '../middleware/responseEnvelope.js';

export async function getIngestionHistory(req, res, next) {
  try {
    const logs = await IngestionLog.find().sort({ startedAt: -1 }).limit(20).lean();
    res.json(formatEnvelope(logs, {
      coverage: { description: 'Ingestion run logs and system audit trail' }
    }));
  } catch (err) {
    next(err);
  }
}

export async function getQuarantinedRecords(req, res, next) {
  try {
    const { batchId } = req.query;
    const filter = batchId ? { batchId } : {};
    const quarantined = await QuarantinedRecord.find(filter).sort({ quarantinedAt: -1 }).limit(50).lean();
    res.json(formatEnvelope(quarantined, {
      coverage: { description: 'Quarantined and rejected records' }
    }));
  } catch (err) {
    next(err);
  }
}