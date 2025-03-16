"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useActivities } from "../hooks/useActivities";
import { Activity, CreateActivityInput, CreateActivitySchema } from "@/app/map/models/activity";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useAuth } from "@/app/(auth)/hooks/useAuth";
import { UserRole } from "@prisma/client";

interface CreateUpdateActivityModalProps {
  activity?: Activity | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export const CreateUpdateActivityModal = ({
  activity,
  open,
  onOpenChange,
  trigger,
}: CreateUpdateActivityModalProps) => {
  const { createActivity, updateActivity } = useActivities();
  const { user } = useAuth();

  const defaultValues = {
    title: activity?.title,
    subtitle: activity?.subtitle || "",
    adress: {
      street: activity?.address?.street || "",
      city: activity?.address?.city || "",
      zip: activity?.address?.zip || "",
      latitude: activity?.address?.latitude || 0,
      longitude: activity?.address?.longitude || 0,
    },
    contact: activity?.contact || "",
    description: activity?.description || "",
    type: activity?.type || "structure",
    imageUrl: activity?.imageUrl || "",
    duration: activity?.duration || undefined,
    missions: activity?.missions || [],
    isPaid: activity?.isPaid || false,
    rating: activity?.rating || undefined,
    status: activity?.status || "draft",
  };

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  const form = useForm<CreateActivityInput>({
    resolver: zodResolver(CreateActivitySchema),
    defaultValues: defaultValues,
    mode: "onTouched",
  });

  const [newMission, setNewMission] = useState("");

  const addMission = () => {
    if (newMission.trim()) {
      const currentMissions = form.getValues("missions") || [];
      form.setValue("missions", [...currentMissions, newMission.trim()]);
      setNewMission("");
    }
  };

  const removeMission = (index: number) => {
    const currentMissions = form.getValues("missions") || [];
    form.setValue(
      "missions",
      currentMissions.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: CreateActivityInput) => {
    try {
      if (activity) {
        updateActivity({ ...data, id: activity.id });
      } else {
        createActivity(data);
      }
      form.reset();
      console.log("onOpenChange", onOpenChange);
      onOpenChange?.(false);
      toast.success("Stage créé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la création du stage");
      console.error("Erreur lors de la création du stage:", error);
    }
  };

  const onError = () => {
    toast.error("Veuillez corriger les erreurs avant de soumettre");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[725px] max-h-[70dvh] md:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{activity ? "Modifier un stage" : "Ajouter un stage"}</DialogTitle>
          {activity?.status === "published" && (
            <p className="text-sm text-yellow-600 mt-2">
              Attention : la modification d&apos;un stage publié le repassera automatiquement en révision
            </p>
          )}
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className={cn("flex items-baseline gap-2", form.formState.errors.title && "text-red-500")}
            >
              <span>Nom de la structure</span>
              <span className="text-sm text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Entrer le nom de la structure"
              className={cn(form.formState.errors.title && "border-red-500")}
              aria-invalid={!!form.formState.errors.title}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Poste occupé</Label>
            <Input
              id="subtitle"
              {...form.register("subtitle")}
              placeholder="Entrer le poste occupé"
              className={cn(form.formState.errors.subtitle && "border-red-500")}
              aria-invalid={!!form.formState.errors.subtitle}
            />
            {form.formState.errors.subtitle && (
              <p className="text-sm text-red-500">{form.formState.errors.subtitle.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="street"
              className={cn("flex items-baseline gap-2", form.formState.errors.adress?.street && "text-red-500")}
            >
              <span>Adresse</span>
              <span className="text-sm text-red-500">*</span>
            </Label>
            <Input
              id="street"
              {...form.register("adress.street")}
              placeholder="Entrer l'adresse"
              className={cn(form.formState.errors.adress?.street && "border-red-500")}
              aria-invalid={!!form.formState.errors.adress?.street}
            />
            {form.formState.errors.adress?.street && (
              <p className="text-sm text-red-500">{form.formState.errors.adress.street.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="city"
                className={cn("flex items-baseline gap-2", form.formState.errors.adress?.city && "text-red-500")}
              >
                <span>Ville</span>
                <span className="text-sm text-red-500">*</span>
              </Label>
              <Input
                id="city"
                {...form.register("adress.city")}
                placeholder="Entrer la ville"
                className={cn(form.formState.errors.adress?.city && "border-red-500")}
                aria-invalid={!!form.formState.errors.adress?.city}
              />
              {form.formState.errors.adress?.city && (
                <p className="text-sm text-red-500">{form.formState.errors.adress.city.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="zip"
                className={cn("flex items-baseline gap-2", form.formState.errors.adress?.zip && "text-red-500")}
              >
                <span>Code postal</span>
                <span className="text-sm text-red-500">*</span>
              </Label>
              <Input
                id="zip"
                {...form.register("adress.zip")}
                placeholder="Entrer le code postal"
                className={cn(form.formState.errors.adress?.zip && "border-red-500")}
                aria-invalid={!!form.formState.errors.adress?.zip}
              />
              {form.formState.errors.adress?.zip && (
                <p className="text-sm text-red-500">{form.formState.errors.adress.zip.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Votre contact</Label>
            <Input
              id="contact"
              {...form.register("contact")}
              placeholder="Numéro de téléphone, Instagram, Email..."
              className={cn(form.formState.errors.contact && "border-red-500")}
              aria-invalid={!!form.formState.errors.contact}
            />
            {form.formState.errors.contact && (
              <p className="text-sm text-red-500">{form.formState.errors.contact.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Entrer la description"
              className={cn(form.formState.errors.description && "border-red-500")}
              aria-invalid={!!form.formState.errors.description}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <Label>Durée du stage (en mois) (optionnel)</Label>
              <Input
                type="number"
                min="1"
                max="24"
                {...form.register("duration", {
                  setValueAs: (value: string) => {
                    return value === "" ? undefined : parseInt(value, 10);
                  },
                })}
              />
            </div>

            <div>
              <Label>Stage gratifié</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={form.watch("isPaid")}
                  onCheckedChange={(checked) => form.setValue("isPaid", checked)}
                />
                <span>{form.watch("isPaid") ? "Oui" : "Non"}</span>
              </div>
            </div>

            <div>
              <Label>Note du stage</Label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= (form.watch("rating") || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => form.setValue("rating", star)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label>Missions effectuées</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newMission}
                  onChange={(e) => setNewMission(e.target.value)}
                  placeholder="Nouvelle mission..."
                />
                <Button type="button" onClick={addMission}>
                  Ajouter
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch("missions")?.map((mission, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2">
                    {mission}
                    <button
                      type="button"
                      onClick={() => removeMission(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {user?.role === UserRole.admin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    {...form.register("adress.latitude", {
                      setValueAs: (value: string) => (value === "" ? 0 : parseFloat(value)),
                    })}
                    placeholder="Latitude"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    {...form.register("adress.longitude", {
                      setValueAs: (value: string) => (value === "" ? 0 : parseFloat(value)),
                    })}
                    placeholder="Longitude"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <select id="status" {...form.register("status")} className="w-full p-2 border rounded-md">
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
            </>
          )}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                onOpenChange?.(false);
              }}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid}>
              {form.formState.isSubmitting ? "Création en cours..." : activity ? "Mettre à jour" : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
