import { Activity } from "../models/activity";
import { MapPin, Phone, Mail, Building2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const SmallMap = dynamic(() => import("./SmallMap"), {
  ssr: false,
});

interface ActivityDetailProps {
  activity: Activity;
  onBack: () => void;
}

const ActivityDetail = ({ activity, onBack }: ActivityDetailProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!activity) return null;

  const content = (
    <>
      <div className={`${isMobile ? "" : "pb-2"}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xl font-medium mt-1 text-muted-foreground">{activity.subtitle}</p>
          </div>
          {activity.imageUrl && (
            <div className="w-20 h-20 relative rounded-full overflow-hidden border-4 border-primary/10">
              <Image src={activity.imageUrl} alt={activity.title} fill className="object-cover" />
            </div>
          )}
        </div>
      </div>
      <div className="space-y-8">
        {activity.imageUrl && (
          <div className="w-full h-72 relative rounded-xl overflow-hidden shadow-inner">
            <Image
              src={activity.imageUrl}
              alt={activity.title}
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-primary" />À propos
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {activity.description || "Aucune description disponible"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {activity.address && (
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  Adresse
                </h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="font-medium">{activity.address.street}</p>
                  <p>{`${activity.address.city}`}</p>
                  <p className="text-muted-foreground">{activity.address.country}</p>
                </div>
                {isMobile && (
                  <div className="mt-4 h-[200px] rounded-lg overflow-hidden border">
                    <SmallMap latitude={activity.address.latitude} longitude={activity.address.longitude} />
                  </div>
                )}
              </div>
            )}
            {activity.contact && (
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-primary" />
                  Contact
                </h3>
                <div className="space-y-2">
                  {activity.contact.includes("@") ? (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${activity.contact}`} className="text-primary hover:underline">
                        {activity.contact}
                      </a>
                    </div>
                  ) : activity.contact.match(/^\+?[\d\s-]+$/) ? (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${activity.contact.replace(/\s/g, "")}`} className="text-primary hover:underline">
                        {activity.contact}
                      </a>
                    </div>
                  ) : (
                    <p>{activity.contact}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet
        open={true}
        onOpenChange={(e) => {
          console.log(e);
          onBack();
        }}
      >
        <SheetTitle>{activity.title}</SheetTitle>
        <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {activity.title}
          </h1>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card className="w-full max-h-[80vh] overflow-y-auto border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {activity.title}
          </CardTitle>
          <CardContent>{content}</CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ActivityDetail;
