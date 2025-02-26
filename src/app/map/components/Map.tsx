import "leaflet/dist/leaflet.css";
import { TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import { Activity } from "../models/activity";
import customMarker from "@/components/CustomMarker";

export type Position = {
  lat: number;
  lng: number;
};

interface MapProps {
  activities?: Activity[];
  selectedActivity?: Activity | null;
  setSelectedActivity?: (activity: Activity | null) => void;
  resizeMap?: boolean;
}

const Map = ({ activities = [], selectedActivity, setSelectedActivity, resizeMap = false }: MapProps) => {
  const map = useMap();

  useEffect(() => {
    if (resizeMap) {
      map.invalidateSize();
    }
  }, [resizeMap, map]);

  useEffect(() => {
    if (selectedActivity && selectedActivity.address) {
      map.flyTo([selectedActivity.address.latitude, selectedActivity.address.longitude], 16, {
        duration: 1.5,
      });
    }
  }, [selectedActivity, map]);

  const handleZoomToMarker = (lat: number, lng: number) => {
    map.flyTo([lat, lng], 16, {
      duration: 1.5,
      easeLinearity: 0.35,
    });
  };

  return (
    <>
      <TileLayer zIndex={1} attribution="Google Maps" url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png" />
      {activities.map((activity) => {
        if (!activity.address) return null;
        return (
          <Marker
            key={activity.id}
            position={[activity.address.latitude, activity.address.longitude]}
            icon={customMarker}
            eventHandlers={{
              click: () => {
                if (activity.address) {
                  handleZoomToMarker(activity.address.latitude, activity.address.longitude);
                  setSelectedActivity?.(activity);
                }
              },
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{activity.title}</h3>
                <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
                <p className="text-sm mt-2">{activity.address.street}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default Map;
