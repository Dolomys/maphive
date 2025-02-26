import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useActivities } from "../hooks/useActivities";
import { CreateActivityInput, CreateActivitySchema } from "../models/activity";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { LYON_CENTER } from "@/utils/const";

const SelectLocationMap = dynamic(() => import("./SelectLocationMap"), {
  ssr: false,
});

interface CreateActivityModalProps {
  trigger: React.ReactNode;
}

export const CreateActivityModal = ({ trigger }: CreateActivityModalProps) => {
  const { createActivity } = useActivities();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateActivityInput>({
    resolver: zodResolver(CreateActivitySchema),
    defaultValues: {
      title: "",
      subtitle: "",
      adress: {
        street: "",
        city: "",
        zip: "",
        latitude: 0,
        longitude: 0,
      },
      contact: "",
      description: "",
      type: "structure",
      imageUrl: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: CreateActivityInput) => {
    try {
      await createActivity(data);
      form.reset();
      setOpen(false);
      toast.success("Activity created successfully");
    } catch (error) {
      toast.error("Failed to create activity");
      console.error("Error creating activity:", error);
    }
  };

  const onError = () => {
    toast.error("Please fix the errors before submitting");
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    form.setValue("adress.latitude", lat);
    form.setValue("adress.longitude", lng);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[725px] max-h-[70dvh] md:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un lieu</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className={cn("flex items-baseline gap-2", form.formState.errors.title && "text-red-500")}
            >
              <span>Titre</span>
              <span className="text-sm text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Entrer le titre"
              className={cn(form.formState.errors.title && "border-red-500")}
              aria-invalid={!!form.formState.errors.title}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              {...form.register("subtitle")}
              placeholder="Entrer le sous-titre"
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
            <Label className="flex items-baseline gap-2">
              <span>Localisation</span>
              <span className="text-sm text-red-500">*</span>
              <span className="text-sm text-muted-foreground">(Cliquer sur la carte pour définir la localisation)</span>
            </Label>
            <div className="h-[300px] w-full border rounded-lg overflow-hidden">
              <SelectLocationMap
                onLocationSelect={handleLocationSelect}
                initialLatitude={LYON_CENTER.lat}
                initialLongitude={LYON_CENTER.lng}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Coordonnées sélectionnées: {form.getValues("adress.latitude")}, {form.getValues("adress.longitude")}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              {...form.register("contact")}
              placeholder="Entrer les informations de contact"
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
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setOpen(false);
              }}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid}>
              {form.formState.isSubmitting ? "Création en cours..." : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
