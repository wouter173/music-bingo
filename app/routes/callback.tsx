import { useAuth } from "@/hooks/user-auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Page() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const errorParam = urlParams.get("error");

      if (errorParam) {
        setError(errorParam);
        return;
      }

      if (!code) {
        setError("No authorization code received");
        return;
      }

      try {
        const response = await fetch(`/api/auth/callback?code=${encodeURIComponent(code)}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to exchange code for token");
        }

        const data = await response.json();
        setToken(data.access_token);
        
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        navigate({ pathname: "/" });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    exchangeCodeForToken();
  }, [navigate, setToken]);

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
