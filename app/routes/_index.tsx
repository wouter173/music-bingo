import { Button } from "@/components/button";
import {
  PlaceholderTrackDisplay,
  TrackDisplay,
} from "@/components/track-display";
import { useCurrentSong } from "@/hooks/use-current-song";
import { useMe } from "@/hooks/use-me";
import { useNextSong } from "@/hooks/use-next-song";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Page() {
  const { data: meData } = useMe();
  const { nextSong } = useNextSong();

  const [revealed, setRevealed] = useState(false);
  const [awaitingNextTrack, setAwaitingNextTrack] = useState(false);
  const { currentTrack, isLoading } = useCurrentSong({
    onTrackChange: () => {
      setRevealed(false);
      setAwaitingNextTrack(false);
    },
  });

  return (
    <div className="mx-auto w-fit py-10">
      <div className="mx-auto w-fit pb-10">
        <img src="/wordmark.png" alt="" width={160} />
      </div>
      {currentTrack && !revealed ? (
        <img src={currentTrack.item.album.images[0].url} className="hidden" />
      ) : null}

      {currentTrack && revealed ? (
        <div
          className="absolute inset-0 bg-cover bg-center blur-3xl animate-in fade-in opacity-50"
          style={{
            backgroundImage: `url(${currentTrack.item.album.images[0].url})`,
          }}
        />
      ) : null}

      <div className="relative">
        <div
          className="p-4 rounded-3xl h-[428px]"
          style={{
            transition: "transform 300ms ease-in-out",
            transform: revealed ? "rotateY(0deg)" : "rotateY(180deg)",
            backfaceVisibility: "hidden",
            backgroundColor: revealed
              ? "color-mix(in oklab, var(--color-black) 30%, transparent)"
              : "var(--color-zinc-950)",
          }}
        >
          <CurrentTrack
            revealed={revealed}
            currentTrack={currentTrack}
            isLoading={isLoading}
          />
        </div>
        <div
          className="absolute inset-0 p-4 bg-zinc-950 rounded-3xl h-[428px]"
          style={{
            transition: "transform 300ms ease-in-out",
            transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <PlaceholderTrackDisplay />
        </div>
      </div>

      <div className="flex flex-col gap-3 mx-auto mt-20 w-4/5 relative items-center">
        {!revealed && (
          <Button
            disabled={awaitingNextTrack}
            size={"lg"}
            intent="primary"
            span={"full"}
            className="font-semibold"
            onPress={() => {
              document.startViewTransition(async () => {
                setRevealed(!revealed);
              });
            }}
          >
            <span style={{ viewTransitionName: "main-button" }}>
              Reveal track
            </span>
          </Button>
        )}
        <Button
          intent={revealed ? "primary" : "text"}
          size={revealed ? "lg" : "md"}
          span={revealed ? "full" : "fit"}
          className={cn(
            "transition-none",
            revealed ? "font-semibold" : "font-normal"
          )}
          onPress={async () => {
            document.startViewTransition(async () => {
              setRevealed(false);
              setAwaitingNextTrack(true);
              await nextSong();
            });
          }}
        >
          <span
            style={{ viewTransitionName: revealed ? "main-button" : "none" }}
          >
            Next Song!
          </span>
        </Button>
      </div>
    </div>
  );
}

const CurrentTrack = ({
  revealed,
  currentTrack,
  isLoading,
}: {
  revealed: boolean;
  isLoading: boolean;
  currentTrack: ReturnType<typeof useCurrentSong>["currentTrack"];
}) => {
  if (currentTrack && !isLoading && revealed) {
    return (
      <TrackDisplay
        coverUrl={currentTrack.item.album.images[0].url}
        name={currentTrack.item.name}
        artists={currentTrack.item.artists.map((a) => a.name)}
        releaseDate={new Date(currentTrack?.item.album.release_date)}
      />
    );
  }

  if (currentTrack && !revealed) {
    return <PlaceholderTrackDisplay />;
  }

  if (isLoading) {
    return <PlaceholderTrackDisplay />;
  }

  if (!currentTrack) {
    return (
      <>
        <div className="flex flex-col gap-2 w-[300px]">
          <div className="w-full aspect-square rounded-xl bg-zinc-800 grid place-items-center p-4 ">
            <p className="whitespace-pre-wrap text-center">
              No music playing!
              <br />
              Make sure to play an album or a playlist on Spotify and put it on
              shuffle.
            </p>
          </div>
        </div>
      </>
    );
  }
};
