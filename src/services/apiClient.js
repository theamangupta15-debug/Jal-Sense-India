import { API_BASE_URL, apiUrl } from '../config/api.js';

export const hasBackend = Boolean(API_BASE_URL);

export async function api(path, opts) {
  if (!hasBackend) throw Object.assign(new Error('Backend not configured'), { code: 'NO_BACKEND' });
  const r = await fetch(apiUrl(path), opts);
  if (!r.ok) throw new Error(`Request failed (${r.status})`);
  const j = await r.json();
  if (!j || typeof j !== 'object' || !('data' in j) || !Array.isArray(j.provenance)) throw new Error('Unexpected response shape');
  return j; // Phase 1 envelope: { data, provenance[], coverage, limitations[] }
}
