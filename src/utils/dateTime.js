export function formatBdDateTime(value) {
  if (!value) return '-';

  const raw = String(value);

  // If backend sends no timezone suffix, assume UTC
  const normalized =
    /z$/i.test(raw) || /[+-]\d{2}:\d{2}$/.test(raw) ? raw : `${raw}Z`;

  return new Date(normalized).toLocaleString('en-BD', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}