import { api, hasBackend } from './apiClient.js';
// Never simulates answers. Without a working backend this reports unavailable.
export async function ask(question, locationId) {
  if (!hasBackend) return { status: 'unavailable' };
  const j = await api('/api/assistant/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question, locationId }) });
  return { status: 'ok', ...j };
}
