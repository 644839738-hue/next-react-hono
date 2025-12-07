import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetProjectAnalyticsProps {
  projectId: string;
}

export type ProjectAnalyticsResponseType = InferResponseType<typeof client.api.projects[":projectId"]["analytics"]["$get"], 200>

export const useGetProjectAnalytics = ({ 
  projectId
}: UseGetProjectAnalyticsProps) => {
  const query = useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"]["analytics"].$get({
        param: { projectId },
      });

      if (!response.ok) {
        throw new Error("Failed to get project analytics");
      }

      const { data } = await response.json();

      // const fullImageUrl = data.imageUrl
      //   ? `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}${data.imageUrl}`
      //   : "";

      // return {
      //   ...data,
      //   imageUrl: fullImageUrl,
      // };

      return data
    },
  });
  return query;
};
