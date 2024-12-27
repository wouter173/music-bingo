import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Toaster } from "sonner";

import { type Route } from "../.react-router/types/app/+types/root";
import stylesheet from "./index.css?url";

const queryClient = new QueryClient();

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
  { rel: "manifest", href: "/manifest.json" },
  { rel: "icon", href: "/icon.svg" },
];

export const meta: Route.MetaFunction = () => [
  { title: "Music Bingo" },
  { property: "og:title", content: "Music Bingo" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black text-zinc-100 **:select-none">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-black text-zinc-100 font-sans relative min-h-svh">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Outlet />
      </QueryClientProvider>
    </StrictMode>
  );
}
