import "leaflet/dist/leaflet.css";
import { TileLayer, Marker, useMap, MapContainer } from "react-leaflet";
import { Icon } from "leaflet";

const customMarker = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

interface SmallMapProps {
  latitude: number;
  longitude: number;
  className?: string;
}

const MapContent = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const map = useMap();

  // Center the map on the marker when it mounts
  map.setView([latitude, longitude], 15);

  return (
    <>
      <TileLayer zIndex={1} attribution="Google Maps" url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]} icon={customMarker} />
    </>
  );
};

const SmallMap = ({ latitude, longitude, className }: SmallMapProps) => {
  return (
    <div className={className}>
      <MapContainer
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
      >
        <MapContent latitude={latitude} longitude={longitude} />
      </MapContainer>
    </div>
  );
};

export default SmallMap;
