import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, AtSign } from "lucide-react";
import { Activity } from "../models/activity";
import { Badge } from "@/components/ui/badge";

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

  return (
    <Card
      className="w-full cursor-pointer max-h-[220px] overflow-hidden border-opacity-50 bg-gradient-to-b from-card to-background"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold tracking-tight flex items-center justify-between">
          <div className="flex justify-between items-center gap-2 w-full">
            {activity.title}
            {activity.creator.study && (
              <Badge variant="secondary" className="text-xs">
                {activity.creator.study.type}
              </Badge>
            )}
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          {activity.status === "draft" && (
            <Badge variant="warning" className="text-xs text-white">
              En cours de révision
            </Badge>
          )}
        </div>
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
