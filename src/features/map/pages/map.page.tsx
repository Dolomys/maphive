"use client";
import MapItemList from "../components/MapItemList";
import Map, { Position } from "../components/Map";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "../components/MapItemList";
import { MapContainer } from "react-leaflet";

// Initial activities data
const initialActivities: Activity[] = [
  {
    id: "1",
    title: "Florent SAS",
    subtitle: "Chargé de communication",
    address: "13 Rue de la République, Marseille",
    contact: "@emieflo",
    description: "Chargé de la communication sur les différents canaux de communication de l'entreprise",
    imageUrl: "/company1.jpg",
    coordinates: {
      lat: 43.2988,
      lng: 5.3738,
    },
  },
  {
    id: "2",
    title: "Festival Marsatac",
    subtitle: "Responsable marketing digital",
    address: "25 Avenue du Prado, Marseille",
    contact: "@marsatac_official",
    description: "Gestion de la stratégie marketing digital et des réseaux sociaux pour le festival",
    imageUrl: "/festival.jpg",
    coordinates: {
      lat: 43.2747,
      lng: 5.3905,
    },
  },
  {
    id: "3",
    title: "Le Petit Pavillon",
    subtitle: "Chef de cuisine",
    address: "54 Corniche Président John F Kennedy, Marseille",
    contact: "@lepetitpavillon",
    description: "Restaurant gastronomique avec vue sur la mer Méditerranée",
    imageUrl: "/restaurant.jpg",
    coordinates: {
      lat: 43.2897,
      lng: 5.3589,
    },
  },
  {
    id: "4",
    title: "Mucem",
    subtitle: "Responsable des expositions",
    address: "1 Esplanade du J4, Marseille",
    contact: "@mucem",
    description: "Musée des Civilisations de l'Europe et de la Méditerranée",
    imageUrl: "/museum.jpg",
    coordinates: {
      lat: 43.2967,
      lng: 5.3621,
    },
  },
];

const MapPage = () => {
  const [seeMapItems, setSeeMapItems] = useState(false);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [selectedMarker, setSelectedMarker] = useState<Position | undefined>(undefined);
  const handleCreateActivity = (newActivity: Omit<Activity, "id">) => {
    const activity: Activity = {
      ...newActivity,
      id: Math.random().toString(36).substr(2, 9),
    };
    setActivities([...activities, activity]);
  };

  return (
    <div className="container mx-auto h-full relative ">
      <div className="absolute top-4 right-4" style={{ zIndex: 2 }}>
        <Button
          onClick={() => {
            setSeeMapItems(!seeMapItems);
          }}
        >
          {seeMapItems ? "Hide map items" : "Show map items"}
        </Button>
      </div>
      <div className="flex h-full gap-5">
        <AnimatePresence>
          {seeMapItems && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
              className="w-[400px] h-full overflow-y-auto z-10"
            >
              <MapItemList
                setSelectedMarker={setSelectedMarker}
                activities={activities}
                onCreateActivity={handleCreateActivity}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div layout transition={{ duration: 0.3 }} className="flex-1 h-full">
          <div className="rounded-2xl overflow-hidden relative h-[900px] w-full">
            <MapContainer
              zoomControl={false}
              style={{
                height: "900px",
                width: "100%",
                zIndex: 1,
              }}
              center={[43.2965, 5.3698]} // Centered on Marseille
              zoom={13}
            >
              <Map activities={activities} selectedMarker={selectedMarker} resizeMap={seeMapItems} />
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MapPage;
