export const TrackDisplay = ({
  coverUrl,
  name,
  artists,
  releaseDate,
}: {
  coverUrl: string;
  name: string;
  artists: string[];
  releaseDate: Date;
}) => {
  return (
    <div className="flex flex-col gap-2 w-[300px]">
      <img
        src={coverUrl}
        alt={`album cover for ${name}`}
        width={300}
        height={300}
        className="rounded-xl w-full aspect-square "
      />
      <div className="grid grid-cols-[232px,60px] max-[300px] gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-xl truncate font-semibold" title={name}>
            {name}
          </p>
          <p className="text-sm truncate" title={artists.join(", ")}>
            {artists.join(", ")}
          </p>
        </div>
        <div className="flex flex-col gap-1 shrink-0">
          <p className="text-xl">{releaseDate.getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export const PlaceholderTrackDisplay = () => {
  return (
    <>
      <div className="flex flex-col gap-2 w-[300px]">
        <div className="w-full aspect-square rounded-xl bg-zinc-800 grid place-items-center">
          ?
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-7 w-28 bg-zinc-800 rounded-xl"></div>
          <div className="h-5 w-16 bg-zinc-800 rounded-xl"></div>
        </div>
      </div>
    </>
  );
};
