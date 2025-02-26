import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, AtSign } from "lucide-react";
import { Activity } from "../models/activity";

interface MapItemProps {
  activity: Activity;
  onItemClick?: (activity: Activity) => void;
}

export const MapItem = ({ activity, onItemClick }: MapItemProps) => {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick(activity);
    }
  };

  return (
    <Card
      className="w-full hover:shadow-lg transition-shadow cursor-pointer max-h-[220px] overflow-hidden"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold">{activity.title}</CardTitle>
        <CardDescription className="text-md font-medium text-muted-foreground">{activity.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPinIcon className="w-4 h-4" />
          <span>{activity.address?.street}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <AtSign className="w-4 h-4" />
          <span>{activity.contact}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 overflow-hidden">{activity.description}</p>
      </CardContent>
    </Card>
  );
};
