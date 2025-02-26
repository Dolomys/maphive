import { Button } from "@/components/ui/button";
import { MapItem } from "./MapItem";
import { PlusIcon } from "lucide-react";
import { CreateActivityModal } from "./CreateActivityModal";
import { Activity } from "../models/activity";
import ActivityDetail from "./ActivityDetail";
import { useAuth } from "@/app/(auth)/hooks/useAuth";
interface MapItemListProps {
  activities: Activity[];
  selectedActivity: Activity | null;
  setSelectedActivity: (activity: Activity | null) => void;
}

const MapItemList = ({ activities, selectedActivity, setSelectedActivity }: MapItemListProps) => {
  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
  };
  const { user } = useAuth();

  const handleBack = () => {
    setSelectedActivity(null);
  };

  if (selectedActivity) {
    return <ActivityDetail activity={selectedActivity} onBack={handleBack} />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {user && (
        <CreateActivityModal
          trigger={
            <Button size="sm">
              <PlusIcon className="w-6 h-6 mr-2" /> Ajouter un lieu
            </Button>
          }
        />
      )}
      <div className="space-y-4 mt-4 overflow-y-auto max-h-[80vh] pb-4">
        {activities.map((activity) => (
          <MapItem key={activity.id} activity={activity} onItemClick={() => handleActivityClick(activity)} />
        ))}
      </div>
    </div>
  );
};

export default MapItemList;
