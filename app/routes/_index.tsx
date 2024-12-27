import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";

export function clientLoader() {
  return {
    redirect: "/app",
  };
}

export default function Page() {
  const navigate = useNavigate();
  const data = useLoaderData<typeof clientLoader>();

  useEffect(() => {
    navigate(data.redirect);
  }, []);

  return <div>{data.redirect}</div>;
}
