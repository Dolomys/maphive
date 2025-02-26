"use client";
import MapItemList from "./components/MapItemList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Position } from "./components/Map";
import { useActivities } from "./hooks/useActivities";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
});

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});

const MapPage = () => {
  const [seeMapItems, setSeeMapItems] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<Position | undefined>(undefined);
  const { activities, isLoading } = useActivities();

  console.log("ACTIVITIES", activities);

  if (isLoading) {
    return (
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

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
              <MapItemList setSelectedMarker={setSelectedMarker} activities={activities || []} />
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
              <Map activities={activities || []} selectedMarker={selectedMarker} resizeMap={seeMapItems} />
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MapPage;
