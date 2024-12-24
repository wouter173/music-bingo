import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./user-auth";

export const useNextSong = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ["spotify", "song", "next"],
    mutationFn: async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/next",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(await response.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spotify", "song"] });
    },
  });

  return {
    nextSong: () => {
      // invalidate the current song, to trigger a revalidation which might be struck by a race condition
      queryClient.invalidateQueries({ queryKey: ["spotify", "song"] });
      mutateAsync();
    },
  };
};
