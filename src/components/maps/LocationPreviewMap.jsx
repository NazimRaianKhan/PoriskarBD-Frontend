import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';

function RecenterMap({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    if (lat != null && lng != null) {
      map.setView([lat, lng], 16, { animate: true });
    }
  }, [lat, lng, map]);

  return null;
}

function OpenPopupOnLoad({ lat, lng, address }) {
  const map = useMap();

  useEffect(() => {
    if (lat != null && lng != null) {
      // slight delay helps popup appear after render
      const timer = setTimeout(() => {
        map.setView([lat, lng], 16);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [lat, lng, map]);

  return (
    <Marker position={[lat, lng]}>
      <Popup autoOpen>
        <div>
          <p className="font-semibold">Selected Location</p>
          <p>{address || `${lat}, ${lng}`}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default function LocationPreviewMap({ lat, lng, address }) {
  if (lat == null || lng == null) return null;

  return (
    <div className="h-72 w-full overflow-hidden rounded-2xl border border-secondary/15">
      <MapContainer
        center={[lat, lng]}
        zoom={16}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <RecenterMap lat={lat} lng={lng} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <OpenPopupOnLoad lat={lat} lng={lng} address={address} />
      </MapContainer>
    </div>
  );
}