import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "./MapItemList";
import { MapPinIcon, AtSign } from "lucide-react";

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
    <Card className="w-full hover:shadow-lg transition-shadow cursor-pointer" onClick={handleClick}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{activity.title}</CardTitle>
        <CardDescription className="text-md font-medium text-muted-foreground">{activity.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPinIcon className="w-4 h-4" />
          <span>{activity.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <AtSign className="w-4 h-4" />
          <span>{activity.contact}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{activity.description}</p>
      </CardContent>
    </Card>
  );
};
