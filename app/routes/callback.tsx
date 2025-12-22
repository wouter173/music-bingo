import { useAuth } from "@/hooks/user-auth";
import { useEffect } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/callback";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return { error, token: null, refreshToken: null };
  }

  if (!code) {
    return { error: "No authorization code received", token: null, refreshToken: null };
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: `${process.env.VITE_APP_URL}/callback`,
        client_id: process.env.VITE_SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        error: errorData.error_description || "Failed to exchange code for token", 
        token: null, 
        refreshToken: null 
      };
    }

    const data = await response.json();
    return { 
      error: null, 
      token: data.access_token, 
      refreshToken: data.refresh_token 
    };
  } catch (err) {
    return { 
      error: err instanceof Error ? err.message : "Unknown error", 
      token: null, 
      refreshToken: null 
    };
  }
}

export default function Page() {
  const { error, token, refreshToken } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    if (token) {
      setToken(token);
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
      navigate({ pathname: "/" });
    }
  }, [token, refreshToken, setToken, navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>Authenticating...</div>
    </div>
  );
}
