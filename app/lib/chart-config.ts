import { ChartConfig } from "~/shared/ui/chart";

export const ANALYTICS_CHART_CONFIG = {
  positive: {
    label: "ポジティブ",
    color: "hsl(var(--chart-1))",
  },
  negative: {
    label: "ネガティブ",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
