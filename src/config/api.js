const configuredApiUrl = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  ''
).trim();

function isLocalApiUrl(value) {
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `http://${value}`);
    return url.hostname === 'localhost' || url.hostname === '::1' || /^127\./.test(url.hostname);
  } catch {
    return false;
  }
}

const useProductionFallback = import.meta.env.PROD && isLocalApiUrl(configuredApiUrl);
const normalizedConfiguredApiUrl = (
  isLocalApiUrl(configuredApiUrl) &&
  !/^[a-z][a-z\d+.-]*:\/\//i.test(configuredApiUrl)
)
  ? `http://${configuredApiUrl}`
  : configuredApiUrl;

const rawApiUrl =
  (configuredApiUrl && !useProductionFallback ? normalizedConfiguredApiUrl : '') ||
  (import.meta.env.PROD
    ? 'https://jal-sense-india.onrender.com'
    : 'http://localhost:5000');

export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

export function apiUrl(path) {
  return `${API_BASE_URL}/${path.replace(/^\/+/, '')}`;
}
