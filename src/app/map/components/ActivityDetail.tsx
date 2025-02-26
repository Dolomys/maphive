import { Activity } from "../models/activity";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ActivityDetailProps {
  activity: Activity;
  onBack: () => void;
}

const ActivityDetail = ({ activity, onBack }: ActivityDetailProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Button variant="ghost" className="w-fit flex items-center gap-2 hover:bg-gray-100" onClick={onBack}>
        <ArrowLeft className="w-4 h-4" />
        Back to list
      </Button>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{activity.title}</CardTitle>
          <CardDescription className="text-lg font-medium text-muted-foreground">{activity.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {activity.imageUrl && (
            <div className="w-full h-64 relative rounded-lg overflow-hidden">
              <Image src={activity.imageUrl} alt={activity.title} fill objectFit="cover" />
            </div>
          )}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {activity.description || "No description available"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Location</h3>
              {activity.address && (
                <div className="space-y-1">
                  <p>{activity.address.street}</p>
                  <p>{`${activity.address.city}, ${activity.address.state} ${activity.address.zip}`}</p>
                  <p>{activity.address.country}</p>
                </div>
              )}
            </div>
            {activity.contact && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Contact</h3>
                <p>{activity.contact}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityDetail;
