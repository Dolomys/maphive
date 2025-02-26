import { Button } from "@/components/ui/button";
import { MapItem } from "./MapItem";
import { PlusIcon } from "lucide-react";
import { CreateActivityModal } from "./CreateActivityModal";
import { Position } from "./Map";
import { Activity } from "../models/activity";

interface MapItemListProps {
  activities: Activity[];
  setSelectedMarker: (position: Position | undefined) => void;
}

const MapItemList = ({ activities, setSelectedMarker }: MapItemListProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <CreateActivityModal
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
            onItemClick={() =>
              activity.address && setSelectedMarker({ lat: activity.address.latitude, lng: activity.address.longitude })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MapItemList;
