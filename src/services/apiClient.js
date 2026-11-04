const BASE = import.meta.env?.VITE_API_BASE_URL || '';
export const hasBackend = Boolean(BASE);
export async function api(path, opts) {
  if (!hasBackend) throw Object.assign(new Error('Backend not configured'), { code: 'NO_BACKEND' });
  const r = await fetch(BASE + path, opts);
  if (!r.ok) throw new Error(`Request failed (${r.status})`);
  const j = await r.json();
  if (!j || typeof j !== 'object' || !('data' in j) || !Array.isArray(j.provenance)) throw new Error('Unexpected response shape');
  return j; // Phase 1 envelope: { data, provenance[], coverage, limitations[] }
}
