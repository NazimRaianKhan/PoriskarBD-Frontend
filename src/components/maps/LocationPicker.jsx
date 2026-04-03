import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';

function LocationMarker({ onPick }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onPick(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function LocationPicker({ onPick }) {
  return (
    <div className="h-72 w-full overflow-hidden rounded-2xl border border-secondary/15">
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onPick={onPick} />
      </MapContainer>
    </div>
  );
}