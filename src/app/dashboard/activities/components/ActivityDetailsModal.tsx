import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MapPin, Calendar, Star, Euro, Briefcase } from "lucide-react";
import { Activity } from "@/app/map/models/activity";
import dayjs from "dayjs";
import Image from "next/image";
interface ActivityDetailsModalProps {
  activity?: Activity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors = {
  draft: "bg-yellow-100 text-yellow-900 border border-yellow-200",
  published: "bg-green-100 text-green-900 border border-green-200",
  archived: "bg-gray-100 text-gray-900 border border-gray-200",
};

const typeLabels = {
  structure: "Structure",
  event: "Événement",
  activity: "Activité",
  other: "Autre",
};

export function ActivityDetailsModal({ activity, open, onOpenChange }: ActivityDetailsModalProps) {
  if (!activity) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        {activity.imageUrl && (
          <div className="relative h-48 -mt-6 -mx-6 mb-4">
            <Image
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full h-full object-cover rounded-t-lg"
              objectFit="cover"
              fill
            />
          </div>
        )}

        <DialogHeader>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <DialogTitle className="text-xl sm:text-2xl font-bold">{activity.title}</DialogTitle>
                {activity.subtitle && (
                  <p className="text-muted-foreground mt-1 text-sm sm:text-base">{activity.subtitle}</p>
                )}
              </div>
              <Badge variant="secondary" className={cn("w-fit px-2 py-1 font-medium", statusColors[activity.status])}>
                {activity.status}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span>Créé le {dayjs(activity.createdAt).format("DD/MM/YYYY HH:mm")}</span>
              <span className="hidden sm:inline">•</span>
              <span>Par {activity.creator?.name || activity.creator?.email}</span>
              {activity.type && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>{typeLabels[activity.type]}</span>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="sm:col-span-2 space-y-6">
            {activity.description && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-sm leading-relaxed">{activity.description}</p>
              </div>
            )}

            {activity.missions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Missions</h3>
                <ul className="space-y-2">
                  {activity.missions.map((mission, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <span className="text-primary">•</span>
                      {mission}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-muted/50 p-4 space-y-4">
              <h3 className="font-semibold">Informations</h3>

              {activity.duration && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{activity.duration} mois</span>
                </div>
              )}

              {activity.address && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p>{activity.address.street}</p>
                    <p>
                      {activity.address.zip} {activity.address.city}
                    </p>
                    {activity.address.country && <p>{activity.address.country}</p>}
                  </div>
                </div>
              )}

              {activity.isPaid !== null && (
                <div className="flex items-center gap-2 text-sm">
                  <Euro className="h-4 w-4 text-muted-foreground" />
                  <span>{activity.isPaid ? "Stage rémunéré" : "Stage non rémunéré"}</span>
                </div>
              )}

              {activity.rating && (
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < activity.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activity.contact && (
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{activity.contact}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
