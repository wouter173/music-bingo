import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return {
    token: localStorage.getItem("access_token"),
    setToken: (token: string) => {
      localStorage.setItem("access_token", token);
    },
    logout: (): never => {
      queryClient.clear();
      localStorage.removeItem("access_token");
      navigate("/login");
      throw new Error("Logged out");
    },
  };
};
