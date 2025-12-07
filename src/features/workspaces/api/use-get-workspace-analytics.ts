import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetWorkspaceAnalyticsProps {
  workspaceId: string;
}

export type WorkspaceAnalyticsResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["analytics"]["$get"], 200>

export const useGetWorkspaceAnalytics = ({
  workspaceId,
}: UseGetWorkspaceAnalyticsProps) => {
  const query = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"][
        "analytics"
      ].$get({
        param: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to get workspace analytics");
      }

      const { data } = await response.json();

      // const fullImageUrl = data.imageUrl
      //   ? `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}${data.imageUrl}`
      //   : "";

      // return {
      //   ...data,
      //   imageUrl: fullImageUrl,
      // };

      return data;
    },
  });
  return query;
};
