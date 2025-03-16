import { Activity } from "@/app/map/models/activity";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs";

export const useGetActivity = () => {
  const [selectedActivityId, setSelectedActivityId] = useQueryState(
    "selectedActivity",
    parseAsString.withOptions({ history: "push" })
  );
  const { data: activity, isPending } = useQuery({
    queryKey: ["activity", selectedActivityId],
    queryFn: () => fetch(`/api/map/get-one?id=${selectedActivityId}`).then((res) => res.json() as Promise<Activity>),
    staleTime: 0,
  });

  return { activity, selectedActivityId, setSelectedActivityId, isPending };
};
