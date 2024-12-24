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
)}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token`;

const LoginButton = () => {
  return <a href={loginUrl}>Login with Spotify</a>;
};

export default function Page() {
  return <LoginButton />;
}

// export async function loader() {
//   return {};
// }
