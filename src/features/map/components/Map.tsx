import "leaflet/dist/leaflet.css";
import { TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { Activity } from "./MapItemList";
import { useEffect } from "react";

const customMarker = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

export type Position = {
  lat: number;
  lng: number;
};

interface MapProps {
  activities?: Activity[];
  selectedMarker?: Position;
  resizeMap?: boolean;
}

const Map = ({ activities = [], selectedMarker, resizeMap = false }: MapProps) => {
  const map = useMap();

  useEffect(() => {
    if (resizeMap) {
      map.invalidateSize();
    }
  }, [resizeMap, map]);

  useEffect(() => {
    if (selectedMarker) {
      map.flyTo([selectedMarker.lat, selectedMarker.lng], 16, {
        duration: 1.5,
      });
    }
  }, [selectedMarker, map]);

  const handleZoomToMarker = (lat: number, lng: number) => {
    map.flyTo([lat, lng], 16, {
      duration: 1.5,
      easeLinearity: 0.35,
    });
  };

  return (
    <>
      <TileLayer zIndex={1} attribution="Google Maps" url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png" />
      {activities.map((activity) => (
        <Marker
          key={activity.id}
          position={[activity.coordinates.lat, activity.coordinates.lng]}
          icon={customMarker}
          eventHandlers={{
            click: () => handleZoomToMarker(activity.coordinates.lat, activity.coordinates.lng),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{activity.title}</h3>
              <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
              <p className="text-sm mt-2">{activity.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default Map;
