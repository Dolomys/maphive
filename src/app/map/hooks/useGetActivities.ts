import { DEFAULT_FILTERS } from "../models/filters";

import { useQuery } from "@tanstack/react-query";

import { ActivityFilters } from "../models/filters";
import { useFilters } from "./useFilters";
import { Activity } from "../models/activity";

interface UseGetActivitiesProps {
  userId?: string;
  withCoordinates?: boolean;
  onlyPublished?: boolean;
}

export const useGetActivities = ({ userId, withCoordinates = false, onlyPublished = false }: UseGetActivitiesProps) => {
  const [filters] = useFilters<ActivityFilters>("activity-filters", DEFAULT_FILTERS);

  return useQuery({
    queryKey: ["activities", filters, userId, withCoordinates, onlyPublished],
    queryFn: async () => {
      const response = await fetch("/api/map/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...filters, creatorId: userId, withCoordinates, onlyPublished }),
      });
      const data = await response.json();
      return data as Activity[];
    },
  });
};
