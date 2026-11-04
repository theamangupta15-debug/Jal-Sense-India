import mongoose from 'mongoose';
import ParameterStandard from '../models/ParameterStandard.js';
import Source from '../models/Source.js';
import HealthGuidance from '../models/HealthGuidance.js';
import { formatEnvelope } from '../middleware/responseEnvelope.js';

export async function getHealthStatus(req, res) {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    success: true,
    data: {
      status: 'healthy',
      database: isDbConnected ? 'connected' : 'disconnected',
      pilot: 'Nagpur, Maharashtra'
    },
    meta: { timestamp: new Date().toISOString() }
  });
}

export async function getStandards(req, res, next) {
  try {
    const standards = await ParameterStandard.find().lean();
    res.json(formatEnvelope(standards));
  } catch (err) {
    next(err);
  }
}

export async function getSources(req, res, next) {
  try {
    const sources = await Source.find().lean();
    res.json(formatEnvelope(sources));
  } catch (err) {
    next(err);
  }
}

export async function getHealthGuidance(req, res, next) {
  try {
    const guidance = await HealthGuidance.find().lean();
    res.json(formatEnvelope(guidance));
  } catch (err) {
    next(err);
  }
}

export async function assistantChatPlaceholder(req, res) {
  const { message = '' } = req.body;
  const lower = message.toLowerCase();

  let reply = 'JalRakshak Assistant: In Phase 3 backend mode, responses are verified against BIS IS 10500 standards and CGWB/NMC records. Complex RAG agent pipelines will be connected in Phase 6.';
  
  if (lower.includes('boil')) {
    reply = 'Notice: Boiling destroys microbiological pathogens (e.g. E. coli, Cholera), but CANNOT remove dissolved chemical contaminants like Fluoride, Nitrate, or Arsenic.';
  } else if (lower.includes('safe')) {
    reply = 'Notice: Under Phase 1 research findings, no public laboratory water quality reports are published for Nagpur city localities. JalRakshak will never label water as safe without certified laboratory measurements.';
  }

  res.json(formatEnvelope({ reply }, {
    limitations: ['Phase 3 deterministic placeholder response.']
  }));
}