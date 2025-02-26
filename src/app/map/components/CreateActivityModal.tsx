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
        state: "",
        country: "",
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
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Add New Spot</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className={cn("flex items-baseline gap-2", form.formState.errors.title && "text-red-500")}
            >
              <span>Title</span>
              <span className="text-sm text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Enter title"
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
              placeholder="Enter subtitle"
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
              <span>Street Address</span>
              <span className="text-sm text-red-500">*</span>
            </Label>
            <Input
              id="street"
              {...form.register("adress.street")}
              placeholder="Enter street address"
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
                <span>City</span>
                <span className="text-sm text-red-500">*</span>
              </Label>
              <Input
                id="city"
                {...form.register("adress.city")}
                placeholder="Enter city"
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
                <span>ZIP Code</span>
                <span className="text-sm text-red-500">*</span>
              </Label>
              <Input
                id="zip"
                {...form.register("adress.zip")}
                placeholder="Enter ZIP code"
                className={cn(form.formState.errors.adress?.zip && "border-red-500")}
                aria-invalid={!!form.formState.errors.adress?.zip}
              />
              {form.formState.errors.adress?.zip && (
                <p className="text-sm text-red-500">{form.formState.errors.adress.zip.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="state"
                className={cn("flex items-baseline gap-2", form.formState.errors.adress?.state && "text-red-500")}
              >
                <span>State</span>
                <span className="text-sm text-red-500">*</span>
              </Label>
              <Input
                id="state"
                {...form.register("adress.state")}
                placeholder="Enter state"
                className={cn(form.formState.errors.adress?.state && "border-red-500")}
                aria-invalid={!!form.formState.errors.adress?.state}
              />
              {form.formState.errors.adress?.state && (
                <p className="text-sm text-red-500">{form.formState.errors.adress.state.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="country"
                className={cn("flex items-baseline gap-2", form.formState.errors.adress?.country && "text-red-500")}
              >
                <span>Country</span>
                <span className="text-sm text-red-500">*</span>
              </Label>
              <Input
                id="country"
                {...form.register("adress.country")}
                placeholder="Enter country"
                className={cn(form.formState.errors.adress?.country && "border-red-500")}
                aria-invalid={!!form.formState.errors.adress?.country}
              />
              {form.formState.errors.adress?.country && (
                <p className="text-sm text-red-500">{form.formState.errors.adress.country.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-baseline gap-2">
              <span>Location</span>
              <span className="text-sm text-red-500">*</span>
              <span className="text-sm text-muted-foreground">(Click on the map to set location)</span>
            </Label>
            <div className="h-[300px] w-full border rounded-lg overflow-hidden">
              <SelectLocationMap
                onLocationSelect={handleLocationSelect}
                initialLatitude={form.getValues("adress.latitude")}
                initialLongitude={form.getValues("adress.longitude")}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Selected coordinates: {form.getValues("adress.latitude")}, {form.getValues("adress.longitude")}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              {...form.register("contact")}
              placeholder="Enter contact information"
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
              placeholder="Enter description"
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
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid}>
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
