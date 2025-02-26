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
  map.setView([latitude, longitude], 15);
  return (
    <>
      <Marker position={[latitude, longitude]} icon={customMarker} />
    </>
  );
};

const SmallMap = ({ latitude, longitude }: SmallMapProps) => {
  return (
    <MapContainer
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
      center={[latitude, longitude]}
      zoom={15}
      //   zoomControl={false}
      //   scrollWheelZoom={false}
      //   dragging={false}
    >
      <TileLayer zIndex={1} attribution="Google Maps" url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png" />
      <MapContent latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
};

export default SmallMap;
