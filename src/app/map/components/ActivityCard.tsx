import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, AtSign, TrashIcon, MoreHorizontalIcon, PencilIcon } from "lucide-react";
import { Activity } from "../models/activity";
import { Button } from "@/components/ui/button";
import { useActivities } from "../hooks/useActivities";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/app/(auth)/hooks/useAuth";
import { CreateUpdateActivityModal } from "./CreateUpdateActivityModal";
interface ActivityCardProps {
  activity: Activity;
  onItemClick?: (activity: Activity) => void;
}

export const ActivityCard = ({ activity, onItemClick }: ActivityCardProps) => {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick(activity);
    }
  };
  const { deleteActivity } = useActivities();
  const { user } = useAuth();

  const moreContent = (
    <div className="flex flex-col gap-1 min-w-[140px]" onClick={(e) => e.stopPropagation()}>
      <CreateUpdateActivityModal
        trigger={
          <div className="flex items-center gap-2.5 p-2 hover:bg-muted rounded-md transition-colors cursor-pointer">
            <PencilIcon className="w-4 h-4 text-primary" />
            <p className="text-sm">Modifier</p>
          </div>
        }
        activity={activity}
      />
      <ConfirmDialog
        title="Supprimer l'activité"
        description="Voulez-vous vraiment supprimer cette activité ?"
        onConfirm={() => deleteActivity(activity.id)}
        trigger={
          <div className="flex items-center gap-2.5 p-2 hover:bg-muted rounded-md transition-colors cursor-pointer">
            <TrashIcon className="w-4 h-4 text-destructive" />
            <p className="text-sm">Supprimer</p>
          </div>
        }
      />
    </div>
  );

  return (
    <Card
      className="w-full cursor-pointer max-h-[220px] overflow-hidden border-opacity-50 bg-gradient-to-b from-card to-background"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold tracking-tight flex items-center justify-between">
          {activity.title}
          {activity.createdBy === user?.sub && (
            <Popover>
              <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon">
                  <MoreHorizontalIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">{moreContent}</PopoverContent>
            </Popover>
          )}
        </CardTitle>
        <CardDescription className="text-md font-medium text-muted-foreground/90 truncate">
          {activity.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center gap-2.5 text-sm group">
          <MapPinIcon className="w-4 h-4 text-primary/70" />
          <span className="text-muted-foreground/80 transition-colors">
            {`${activity.address?.street}, ${activity.address?.city}`}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-sm group">
          <AtSign className="w-4 h-4 text-primary/70" />
          <span className="text-muted-foreground/80 transition-colors">{activity.contact}</span>
        </div>
        <p className="text-sm text-muted-foreground/90 mt-2 line-clamp-2 leading-relaxed">{activity.description}</p>
      </CardContent>
    </Card>
  );
};
