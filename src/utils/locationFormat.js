export function buildStoredLocation(address, lat, lng) {
  return `${address} || ${lat.toFixed(6)},${lng.toFixed(6)}`;
}

export function parseStoredLocation(location) {
  if (!location || typeof location !== 'string') {
    return { address: '', lat: null, lng: null, hasCoords: false };
  }

  const parts = location.split('||').map((p) => p.trim());

  if (parts.length < 2) {
    return { address: location, lat: null, lng: null, hasCoords: false };
  }

  const address = parts[0];
  const coordPart = parts[1];
  const [latStr, lngStr] = coordPart.split(',').map((v) => v.trim());

  const lat = Number(latStr);
  const lng = Number(lngStr);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return { address, lat: null, lng: null, hasCoords: false };
  }

  return {
    address,
    lat,
    lng,
    hasCoords: true,
  };
}