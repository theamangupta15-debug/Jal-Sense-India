import { locations } from '../data/locations.js';
import { hierarchy, search } from '../lib/format.js';
// Fixture-backed; replace bodies with GET /api/locations/... when the backend exists.
export const searchLocations = async (q) => search(locations, q);
export const getLocation = async (id) => locations.find((l) => l.id === id) || null;
export const getChildren = async (id) => locations.filter((l) => l.parentId === id);
export const getPath = async (id) => hierarchy(locations, id);
