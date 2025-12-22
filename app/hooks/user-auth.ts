import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const isClient = typeof window !== "undefined";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return {
    token: isClient ? localStorage.getItem("access_token") : null,
    setToken: (token: string) => {
      if (isClient) {
        localStorage.setItem("access_token", token);
      }
    },
    logout: (): never => {
      queryClient.clear();
      if (isClient) {
        localStorage.removeItem("access_token");
      }
      navigate("/login");
      throw new Error("Logged out");
    },
  };
};
