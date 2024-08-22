import { Pie, PieChart } from "recharts";

import { ANALYTICS_CHART_CONFIG } from "~/lib/chart-config";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/shared/ui/chart";

type DetailChartData = {
  emotion: string
  amount: number
  fill: string
}[];

type Props = {
  detailChartData: DetailChartData
};

export function DetailChart({ detailChartData }: Props) {
  return (
    <div className="grid size-32 items-center rounded-xl bg-white">
      <ChartContainer
        config={ANALYTICS_CHART_CONFIG}
        className="mx-auto aspect-square h-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            animationDuration={800}
            data={detailChartData}
            dataKey="amount"
            nameKey="emotion"
            innerRadius={20}
          />
        </PieChart>
      </ChartContainer>

    </div>
  );
}
