import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useAuth } from "./user-auth";

export const useMe = () => {
  const { logout, token } = useAuth();

  return useQuery({
    queryKey: ["spotify", "user", "me"],
    queryFn: async () => {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) logout();

      const result = z
        .object({ display_name: z.string(), email: z.string() })
        .safeParse(await response.json());

      if (!result.success) return logout();

      return result.data;
    },
  });
};
