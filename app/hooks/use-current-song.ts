import { useAuth } from "@/hooks/user-auth";
import { currentSchema } from "@/schemas/current";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCurrentSong = ({
  onTrackChange,
}: {
  onTrackChange: () => void;
}) => {
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
      if (response.status === 204) return null;

      const result = currentSchema.safeParse(await response.json());
      if (!result.success) {
        toast.error("Failed to fetch current song");
        console.error(result.error);
        return null;
      }

      if (result.data.item.id !== data?.item.id) {
        onTrackChange();
      }

      return result.data;
    },
  });

  return { currentTrack: data, isLoading };
};
