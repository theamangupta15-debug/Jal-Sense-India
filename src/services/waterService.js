import { api, hasBackend } from './apiClient.js';
// Groundwater and drinking-water quality are separate calls. No fixture measurements exist.
async function load(path) {
  if (!hasBackend) return { status: 'unavailable', reason: 'No backend connected and no verified records loaded.' };
  try { const j = await api(path); return { status: 'ok', ...j }; }
  catch (e) { return { status: 'error', reason: e.message }; }
}
export const getGroundwater = (id) => load(`/api/locations/${id}/groundwater`);
export const getWaterQuality = (id) => load(`/api/locations/${id}/water-quality`);
