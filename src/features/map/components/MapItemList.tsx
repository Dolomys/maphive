import { Button } from "@/components/ui/button";
import { MapItem } from "./MapItem";
import { PlusIcon } from "lucide-react";
import { CreateActivityModal } from "./CreateActivityModal";
import { Position } from "./Map";

export type Activity = {
  id: string;
  title: string;
  subtitle: string;
  address: string;
  contact: string;
  description: string;
  imageUrl?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

interface MapItemListProps {
  activities: Activity[];
  onCreateActivity: (newActivity: Omit<Activity, "id">) => void;
  setSelectedMarker: (marker: Position) => void;
}

const MapItemList = ({ activities, onCreateActivity, setSelectedMarker }: MapItemListProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <CreateActivityModal
        onSubmit={onCreateActivity}
        trigger={
          <Button size="sm">
            <PlusIcon className="w-6 h-6 mr-2" /> Suggest a Spot
          </Button>
        }
      />
      <div className="space-y-4 mt-4 overflow-y-auto" style={{ maxHeight: "850px" }}>
        {activities.map((activity) => (
          <MapItem
            key={activity.id}
            activity={activity}
            onItemClick={() => setSelectedMarker({ lat: activity.coordinates.lat, lng: activity.coordinates.lng })}
          />
        ))}
      </div>
    </div>
  );
};

export default MapItemList;
