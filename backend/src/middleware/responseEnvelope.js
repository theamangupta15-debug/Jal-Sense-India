import { randomUUID } from 'crypto';

export function formatEnvelope(data, options = {}) {
  const {
    provenance = [],
    coverage = { geographicLevel: 'unknown', isComplete: false },
    limitations = []
  } = options;

  return {
    success: true,
    data,
    provenance,
    coverage,
    limitations,
    meta: {
      requestId: randomUUID(),
      timestamp: new Date().toISOString()
    }
  };
}