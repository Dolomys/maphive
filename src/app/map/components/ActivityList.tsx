import { Button } from "@/components/ui/button";
import { ActivityCard } from "./ActivityCard";
import { PlusIcon } from "lucide-react";
import { CreateUpdateActivityModal } from "./CreateUpdateActivityModal";
import { Activity } from "../models/activity";
import ActivityDetail from "./ActivityDetail";
import { useAuth } from "@/app/(auth)/hooks/useAuth";
import { useGetActivities } from "../hooks/useGetActivities";
import { Loader } from "@/components/ui/loader";
import { useGetActivity } from "@/hooks/useGetActivity";

const ActivityList = () => {
  const { user } = useAuth();
  const { data: activities, isPending } = useGetActivities({ onlyPublished: true, userId: user?.id });
  const { selectedActivityId, setSelectedActivityId } = useGetActivity();

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivityId(activity.id);
  };

  const handleBack = () => {
    setSelectedActivityId(null);
  };

  if (selectedActivityId) {
    return <ActivityDetail onBack={handleBack} />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {user && (
        <CreateUpdateActivityModal
          trigger={
            <Button size="sm" className="w-fit">
              <PlusIcon className="w-6 h-6 mr-2" /> Ajouter un stage
            </Button>
          }
        />
      )}

      <div className="space-y-4 mt-4 overflow-y-auto max-h-[80vh] pb-4">
        {isPending ? (
          <Loader className="py-8" />
        ) : (
          activities?.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} onItemClick={() => handleActivityClick(activity)} />
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityList;
