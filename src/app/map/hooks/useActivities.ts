import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateActivityInput, Activity } from "../models/activity";
import { toast } from "sonner";
import { createActivity } from "../actions/create-activity";
import { deleteActivity } from "../actions/delete-activity";
import { updateActivity } from "../actions/update-activity";
import { DEFAULT_FILTERS } from "../models/filters";
import { useFilters } from "./useFilters";
import { ActivityFilters } from "../models/filters";

export function useActivities() {
  const queryClient = useQueryClient();
  const [filters] = useFilters<ActivityFilters>("activity-filters", DEFAULT_FILTERS);

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities", filters],
    queryFn: async () => {
      const response = await fetch("/api/map/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });
      const data = await response.json();
      return data as Activity[];
    },
  });

  const createActivityMutation = useMutation({
    mutationFn: async (newActivity: CreateActivityInput) => {
      const response = await createActivity(newActivity);
      if (response?.serverError) {
        throw response.serverError;
      }
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      toast.success("Stage créé avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la création du stage:", error);
      toast.error("Échec de la création du stage");
    },
  });

  const updateActivityMutation = useMutation({
    mutationFn: async ({ id, ...newActivity }: CreateActivityInput & { id: string }) => {
      const response = await updateActivity({ ...newActivity, id });
      if (response?.serverError) {
        throw response.serverError;
      }
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      toast.success("Stage mis à jour avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour du stage:", error);
      toast.error("Échec de la mise à jour du stage");
    },
  });

  const deleteActivityMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteActivity({ id });
      if (result?.serverError) {
        throw result.serverError;
      }
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      toast.success("Activity deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
    },
  });

  return {
    activities,
    isLoading,
    createActivity: createActivityMutation.mutate,
    isCreating: createActivityMutation.isPending,
    deleteActivity: deleteActivityMutation.mutate,
    isDeleting: deleteActivityMutation.isPending,
    updateActivity: updateActivityMutation.mutate,
    isUpdating: updateActivityMutation.isPending,
  };
}
