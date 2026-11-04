export const UNAVAILABLE = 'Data unavailable';
// Missing values are never shown as zero.
export function formatMeasurement(m) {
  if (!m || m.value === null || m.value === undefined || Number.isNaN(Number(m.value))) return UNAVAILABLE;
  return `${m.value}${m.unit ? ' ' + m.unit : ''}`;
}
// Records must carry source, date and scope to be displayable.
export function missingProvenance(r) { return ['source', 'date', 'scope'].filter((k) => !r?.[k]); }
export function hierarchy(list, id) {
  const out = []; let cur = list.find((l) => l.id === id);
  while (cur) { out.unshift(cur); cur = list.find((l) => l.id === cur.parentId); }
  return out;
}
export function search(list, q) {
  const s = q.trim().toLowerCase();
  return s ? list.filter((l) => l.level !== 'country' && l.name.toLowerCase().includes(s)) : [];
}
