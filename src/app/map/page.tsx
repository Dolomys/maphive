"use client";
import MapItemList from "./components/MapItemList";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useActivities } from "./hooks/useActivities";
import { Activity } from "./models/activity";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
});

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});

const MapPage = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const { activities } = useActivities();

  return (
    <div className="container mx-auto h-full relative">
      <div className="flex h-full gap-5">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className={`${selectedActivity ? "w-2/4" : "w-[400px]"} h-full overflow-y-auto z-10`}
          >
            <MapItemList
              selectedActivity={selectedActivity}
              setSelectedActivity={setSelectedActivity}
              activities={activities || []}
            />
          </motion.div>
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
              <Map
                activities={activities || []}
                setSelectedActivity={setSelectedActivity}
                selectedActivity={selectedActivity}
                resizeMap={!!selectedActivity}
              />
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MapPage;
