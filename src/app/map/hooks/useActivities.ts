import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateActivityInput } from "../models/activity";
import { toast } from "sonner";
import { createActivity } from "../actions/create-activity";

export function useActivities() {
  const queryClient = useQueryClient();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await fetch("/api/map/get-all");
      return response.json();
    },
  });

  const createActivityMutation = useMutation({
    mutationFn: (newActivity: CreateActivityInput) => createActivity(newActivity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      toast.success("Activity created successfully");
    },
    onError: (error) => {
      console.error("Error creating activity:", error);
      toast.error("Failed to create activity");
    },
  });

  return {
    activities,
    isLoading,
    createActivity: createActivityMutation.mutate,
    isCreating: createActivityMutation.isPending,
  };
}
