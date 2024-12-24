import { useState } from "react";
import {
  PlaceholderTrackDisplay,
  TrackDisplay,
} from "../components/track-display";
import { useCurrentSong } from "../hooks/use-current-song";
import { useMe } from "../hooks/use-me";
import { useNextSong } from "../hooks/use-next-song";

export default function Page() {
  const { data: meData } = useMe();
  const { nextSong } = useNextSong();

  const [revealed, setRevealed] = useState(false);
  const { currentTrack, isLoading } = useCurrentSong();

  return (
    <div className="mx-auto w-fit">
      <header className="pb-10 pt-20 text-center">
        <h1 className="opacity-70 text-sm">Hey {meData?.display_name}!</h1>
      </header>

      {/* preloading image */}
      {currentTrack && !revealed ? (
        <img src={currentTrack.item.album.images[0].url} className="hidden" />
      ) : null}

      {currentTrack && revealed ? (
        <div
          className="absolute inset-0 bg-cover bg-center blur-3xl animate-in fade-in -z-10 opacity-50"
          style={{
            backgroundImage: `url(${currentTrack.item.album.images[0].url})`,
          }}
        />
      ) : null}

      <div className="relative">
        <div
          className="p-4 bg-black/30 rounded-2xl"
          style={{
            transition: revealed ? "all 300ms ease-in-out" : "",
            transform: revealed ? "rotateY(0deg)" : "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <CurrentTrack
            revealed={revealed}
            currentTrack={currentTrack}
            isLoading={isLoading}
          />
        </div>
        <div
          className="absolute inset-0 p-4 bg-black/30 rounded-2xl"
          style={{
            transition: revealed ? "all 300ms ease-in-out" : "",
            transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <PlaceholderTrackDisplay />
        </div>
      </div>

      <div className="flex gap-0.5 w-full mt-20">
        <button
          className="w-full cursor-pointer py-2 rounded-l-full rounded-r-lg transition-all bg-black/30 backdrop-blur-md hover:bg-black/60 active:bg-black/40"
          onClick={async () => {
            setRevealed(false);
            await nextSong();
          }}
        >
          Next Song!
        </button>

        <button
          disabled={revealed}
          className="w-full cursor-pointer rounded-r-full transition-all rounded-l-sm bg-black/30 backdrop-blur-md enabled:hover:bg-black/60 enabled:active:bg-black/40 disabled:opacity-25"
          onClick={() => {
            setRevealed(!revealed);
          }}
        >
          Reveal track!
        </button>
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
