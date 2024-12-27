export const TrackDisplay = ({
  coverUrl,
  name,
  artists,
  releaseDate,
  duration,
}: {
  coverUrl: string;
  name: string;
  artists: string[];
  releaseDate: Date;
  duration: number;
}) => {
  return (
    <div className="flex flex-col gap-3 w-[300px]">
      <img
        src={coverUrl}
        alt={`album cover for ${name}`}
        width={300}
        height={300}
        className="rounded-xl w-full aspect-square"
      />
      <div className="grid grid-cols-[232px,60px] max-w-[300px] gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <p
              className="text-lg truncate max-w-[240px] font-semibold"
              title={name}
            >
              {name}
            </p>
            <p className="text-lg font-semibold">{releaseDate.getFullYear()}</p>
          </div>
          <div className="flex justify-between">
            <p
              className="text-sm truncate max-w-[240px]"
              title={artists.join(", ")}
            >
              {artists.join(", ")}
            </p>
            <p className="text-sm text-zinc-400">
              {Math.floor(duration / 60000)}:
              {String(Math.floor(duration / 1000) % 60).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PlaceholderTrackDisplay = () => {
  return (
    <>
      <div className="flex flex-col gap-2.5 w-[300px]">
        <div className="w-full aspect-square rounded-xl bg-zinc-900 grid place-items-center text-6xl text-zinc-800">
          ?
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <div className="h-7.5 w-48 bg-zinc-900 rounded-xl"></div>
            <div className="h-7.5 w-14 bg-zinc-900 rounded-xl"></div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1">
              <div className="h-4.5 w-12 bg-zinc-900 rounded-xl"></div>
              <div className="h-4.5 w-16 bg-zinc-900 rounded-xl"></div>
            </div>
            <div className="h-4.5 w-12 bg-zinc-900 rounded-xl"></div>
          </div>
        </div>
      </div>
    </>
  );
};
