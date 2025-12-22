import { Button } from "@/components/button";

const AUTH_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = `${import.meta.env.VITE_APP_URL}/callback`; // Your redirect URI

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-modify-playback-state",
  "user-read-currently-playing",
  // Add more scopes as needed
];

const loginUrl = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=code`;

const LoginButton = () => {
  return (
    <div className="w-full min-h-svh relative grid content-center place-items-center bg-black">
      <div className="w-full h-svh relative z-20 py-20 flex justify-between flex-col items-center">
        <img
          src="/wordmark.png"
          alt=""
          width={200}
          className="row-start-2 -ml-2"
        />
        <Button intent="primary" asChild className="relative py-3">
          <a href={loginUrl} className="flex gap-2 font-bold">
            Sign in with Spotify
            <img src="/spotify-icon.svg" alt="" width={22} height={22} />
          </a>
        </Button>
        <div></div>
      </div>
    </div>
  );
};

export default function Page() {
  return <LoginButton />;
}
