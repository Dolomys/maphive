import "leaflet/dist/leaflet.css";
import { TileLayer, Marker, MapContainer, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import { useState } from "react";

const customMarker = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

interface SelectLocationMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLatitude?: number;
  initialLongitude?: number;
}

const LocationMarker = ({
  position,
  onLocationSelect,
}: {
  position: [number, number] | null;
  onLocationSelect: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} icon={customMarker} /> : null;
};

const SelectLocationMap = ({ onLocationSelect, initialLatitude, initialLongitude }: SelectLocationMapProps) => {
  const [position, setPosition] = useState<[number, number] | null>(
    initialLatitude && initialLongitude ? [initialLatitude, initialLongitude] : null
  );

  const handleLocationSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationSelect(lat, lng);
  };

  return (
    <MapContainer
      center={position || [43.2965, 5.3698]} // Default to Marseille if no position
      zoom={13}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
      scrollWheelZoom={true}
    >
      <TileLayer zIndex={1} attribution="Google Maps" url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png" />
      <LocationMarker position={position} onLocationSelect={handleLocationSelect} />
    </MapContainer>
  );
};

export default SelectLocationMap;
