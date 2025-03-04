"use client";
import ActivityList from "./components/ActivityList";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Activity } from "./models/activity";
import { LYON_CENTER, LYON_ZOOM } from "@/utils/const";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MapIcon, ListIcon, ArrowLeft } from "lucide-react";
import ActivityDetail from "./components/ActivityDetail";
import { Button } from "@/components/ui/button";
import { ActivityFilters } from "./components/ActivityFilters";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
});

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});

const MapPage = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = useState<string>("list");

  const handleActivitySelect = (activity: Activity | null) => {
    setSelectedActivity(activity);
  };

  const mapContent = (
    <motion.div layout transition={{ duration: 0.3 }} className="flex-1 h-full">
      <div className="rounded-2xl overflow-hidden relative h-[calc(100vh-120px)]">
        <MapContainer
          zoomControl={false}
          style={{
            height: "100%",
            width: "100%",
            zIndex: 1,
          }}
          center={LYON_CENTER}
          zoom={LYON_ZOOM}
        >
          <Map
            setSelectedActivity={handleActivitySelect}
            selectedActivity={selectedActivity}
            resizeMap={!isMobile && !!selectedActivity}
          />
        </MapContainer>
      </div>
    </motion.div>
  );

  const listContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.3 }}
        className={`${
          selectedActivity && !isMobile ? (isMobile ? "w-full" : "w-2/4") : isMobile ? "w-full" : "w-[400px]"
        } h-full overflow-y-auto z-10`}
      >
        {selectedActivity && !isMobile && (
          <Button
            variant="ghost"
            className="w-fit flex items-center gap-2 hover:bg-gray-100/80 transition-colors"
            onClick={() => setSelectedActivity(null)}
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </Button>
        )}
        {!selectedActivity && (
          <div className="pl-4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ActivityFilters />
            </Suspense>
          </div>
        )}
        <div className={`${selectedActivity ? "hidden" : "block"}`}>
          <Suspense fallback={<div>Loading activities...</div>}>
            <ActivityList
              selectedActivity={isMobile ? null : selectedActivity}
              setSelectedActivity={handleActivitySelect}
            />
          </Suspense>
        </div>
        {selectedActivity && !isMobile && (
          <ActivityDetail activity={selectedActivity} onBack={() => setSelectedActivity(null)} />
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="container mx-auto h-full relative">
      {isMobile ? (
        <>
          <div className="flex flex-col h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <ListIcon className="w-4 h-4" /> Liste
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <MapIcon className="w-4 h-4" /> Carte
                </TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-0">
                {listContent}
              </TabsContent>
              <TabsContent value="map" className="mt-0">
                {mapContent}
              </TabsContent>
            </Tabs>

            {selectedActivity && (
              <ActivityDetail activity={selectedActivity} onBack={() => setSelectedActivity(null)} />
            )}
          </div>
        </>
      ) : (
        <div className="flex h-full">
          {listContent}
          {mapContent}
        </div>
      )}
    </div>
  );
};

export default MapPage;
