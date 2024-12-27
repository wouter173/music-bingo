import { useAuth } from "@/hooks/user-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Page() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.hash
      .replace("#", "")
      .split("&")
      .map((param) => param.split("="))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    if (
      "access_token" in params &&
      typeof params["access_token"] === "string"
    ) {
      setToken(params["access_token"]);
    }

    navigate({ pathname: "/app" });
  });

  return null;
}
