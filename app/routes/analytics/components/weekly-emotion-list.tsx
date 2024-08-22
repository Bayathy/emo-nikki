import { CSSProperties } from "react";

import type { ChartData } from "./analytics-chart";

function translateEmotion(chartData: ChartData) {
  if (chartData.positive > chartData.negative) {
    return "😊";
  } else if (chartData.positive < chartData.negative) {
    return "😢";
  }
}

function generateStyles(chartData: ChartData[]) {
  const baseStyleObject: CSSProperties = {
    display: "grid",
    width: "100%",
    placeItems: "center",
  };

  if (chartData.length === 1) {
    return { ...baseStyleObject, gridTemplateColumns: "repeat(1, minmax(0, 1fr))" };
  } else if (chartData.length === 2) {
    return { ...baseStyleObject, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" };
  } else if (chartData.length === 3) {
    return { ...baseStyleObject, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" };
  } else if (chartData.length === 4) {
    return { ...baseStyleObject, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" };
  } else if (chartData.length === 5) {
    return { ...baseStyleObject, gridTemplateColumns: "repeat(5, minmax(0, 1fr))" };
  } else if (chartData.length === 6) {
    return { ...baseStyleObject, gridTemplateColumns: "repeat(6, minmax(0, 1fr))" };
  } else if (chartData.length === 7) {
    return { ...baseStyleObject, gridTemplateColumns: "repeat(7, minmax(0, 1fr))" };
  }
}

type Props = {
  chartData: ChartData[]
};

export function WeeklyEmotionList({ chartData }: Props) {
  return (
    <div style={generateStyles(chartData)} className="px-1">
      {
        chartData.map(data => (
          // dateに直す
          <div key={data.date}>
            <div className="text-xl">{translateEmotion(data)}</div>
          </div>
        ))
      }
    </div>
  );
}
