import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { currentSchema } from "../schemas/current";
import { useAuth } from "./user-auth";

export const useCurrentSong = () => {
  const { token, logout } = useAuth();

  const { data, isLoading } = useQuery({
    refetchInterval: 1000,
    queryKey: ["spotify", "song", "current"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 401) logout();

      const result = currentSchema.safeParse(await response.json());
      if (!result.success) {
        toast.error("Failed to fetch current song");
        console.error(result.error);
        return null;
      }

      return result.data;
    },
  });

  return { currentTrack: data, isLoading };
};
