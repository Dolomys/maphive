import "leaflet/dist/leaflet.css";
import { TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import customMarker from "@/components/CustomMarker";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles";
import { useGetActivities } from "../hooks/useGetActivities";
import { useGetActivity } from "@/hooks/useGetActivity";
export type Position = {
  lat: number;
  lng: number;
};

interface MapProps {
  resizeMap?: boolean;
}

const Map = ({ resizeMap = false }: MapProps) => {
  const map = useMap();
  const { data: activities } = useGetActivities({ withCoordinates: true });
  const { activity, setSelectedActivityId } = useGetActivity();
  const activitiesWithCoordinates = activities?.filter(
    (activity) => activity.address?.latitude && activity.address?.longitude
  );

  useEffect(() => {
    if (resizeMap) {
      map.invalidateSize();
    }
  }, [resizeMap, map]);

  useEffect(() => {
    console.log("activity", activity);
    if (activity?.address?.latitude && activity.address.longitude) {
      console.log("zooming to", activity.address.latitude, activity.address.longitude);
      map.flyTo([activity.address.latitude, activity.address.longitude], 16, {
        duration: 1.5,
      });
    }
  }, [activity, map]);

  const handleZoomToMarker = (lat: number, lng: number) => {
    console.log("zooming to", lat, lng);
    map.flyTo([lat, lng], 16, {
      duration: 1.5,
      easeLinearity: 0.35,
    });
  };

  return (
    <>
      <TileLayer zIndex={1} attribution="Google Maps" url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png" />
      <MarkerClusterGroup>
        {activitiesWithCoordinates?.map((activity) => {
          if (!activity.address || !activity.address.latitude || !activity.address.longitude) return null;
          return (
            <Marker
              key={activity.id}
              position={[activity.address.latitude, activity.address.longitude]}
              icon={customMarker}
              eventHandlers={{
                click: () => {
                  if (activity.address?.latitude && activity.address?.longitude) {
                    handleZoomToMarker(activity.address.latitude, activity.address.longitude);
                    setSelectedActivityId?.(activity.id);
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
      </MarkerClusterGroup>
    </>
  );
};

export default Map;
