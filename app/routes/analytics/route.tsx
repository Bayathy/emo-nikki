import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { defer } from "@remix-run/cloudflare";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import { getGqlClient } from "~/lib/gqlClient.server";
import { getKVSession } from "~/lib/session.server";

import { AnalyticsChart } from "./components/analytics-chart";
import { DetailPanel } from "./components/detail-panel";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
  const env = context.cloudflare.env as Env;

  const KV = getKVSession(env.SESSION_KV);

  const session = await KV.getSession(request.headers.get("Cookie"));

  const gqlClient = getGqlClient(context);

  const data = gqlClient.GetSentiments({
    uid: session?.get("userId"),
  });

  return defer({
    data,
  });
}

export default function Analytics() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="grid min-h-screen grid-cols-[100%] grid-rows-[auto_auto_1fr_var(--footer-height)]">
      <header>
        <h1 className="p-4 text-xl font-semibold">最近の自分</h1>
      </header>
      <Suspense fallback={<p>loading</p>}>
        <Await resolve={data}>
          {({ sentiments }) => (
            <>
              <div className="w-full">
                <AnalyticsChart sentiments={sentiments} />
              </div>
              <div className="mt-12">
                <div className="relative top-2 grid w-max place-items-center rounded-[8px_8px_0px_0px] bg-pastel-primary px-4 py-2 ">
                  <h1 className="font-semibold text-white">記録</h1>
                </div>
                <div className="h-full bg-pastel-primary pt-8">
                  <DetailPanel />
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
