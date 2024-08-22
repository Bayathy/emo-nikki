import type { MetaFunction } from "@remix-run/cloudflare";

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

export default function Analytics() {
  return (
    <div className="grid min-h-screen grid-cols-[100%] grid-rows-[auto_auto_1fr_var(--footer-height)]">
      <header>
        <h1 className="p-4 text-xl font-semibold">最近の自分</h1>
      </header>
      {/* <div className="mx-auto"> */}
      <div className="w-full">
        <AnalyticsChart />
      </div>
      <div className="mt-12">
        <div className="relative top-2 grid w-max place-items-center rounded-[8px_8px_0px_0px] bg-pastel-primary px-4 py-2 ">
          <h1 className="font-semibold text-white">記録</h1>
        </div>
        <div className="h-full bg-pastel-primary pt-8">
          <DetailPanel />
        </div>
      </div>
    </div>
  );
}
