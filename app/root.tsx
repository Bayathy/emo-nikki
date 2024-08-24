import "./tailwind.css";

import liff from "@line/liff";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useEffect } from "react";

import { Tab } from "./shared/ui/tab";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-pastel-background">
        <div>
          {children}
          <Tab />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.cloudflare.env as Env;

  const LiffID = env.LIFF_ID as string;

  return { LiffID };
}

export default function App() {
  const { LiffID } = useLoaderData<typeof loader>();

  useEffect(() => {
    liff.init({ liffId: LiffID }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        liff.getProfile().then((profile) => {
          fetch("/api/session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: profile.userId }),
          });
        },
        );
      }
    },
    );
  }
  , [LiffID]);

  return <Outlet />;
}
