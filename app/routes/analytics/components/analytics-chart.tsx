import { format } from "@formkit/tempo";
import { chunk } from "es-toolkit";
import { useAtom } from "jotai";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";

import { ANALYTICS_CHART_CONFIG } from "~/lib/chart-config";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/shared/ui/carousel";
import { ChartContainer } from "~/shared/ui/chart";
import { selectDateAtom } from "~/store/select-date";

export type ChartData = {
  date: string
  positive: number
  negative: number
};

const chartData: ChartData[] = [
  { date: "2024-08-22T08:36:51.427Z", positive: 186, negative: 80 },
  { date: "2024-08-23T08:36:51.427Z", positive: 305, negative: 200 },
  { date: "2024-08-24T08:36:51.427Z", positive: 237, negative: 120 },
  { date: "2024-08-25T08:36:51.427Z", positive: 73, negative: 190 },
  { date: "2024-08-26T08:36:51.427Z", positive: 209, negative: 130 },
  { date: "2024-08-27T08:36:51.427Z", positive: 214, negative: 140 },
  { date: "2024-08-28T08:36:51.427Z", positive: 186, negative: 80 },
  { date: "2024-08-29T08:36:51.427Z", positive: 305, negative: 200 },
  { date: "2024-08-30T08:36:51.427Z", positive: 237, negative: 120 },
  { date: "2024-09-01T08:36:51.427Z", positive: 73, negative: 190 },
  { date: "2024-09-02T08:36:51.427Z", positive: 209, negative: 130 },
  { date: "2024-09-03T08:36:51.427Z", positive: 214, negative: 140 },
  { date: "2024-09-04T08:36:51.427Z", positive: 186, negative: 80 },
  { date: "2024-09-05T08:36:51.427Z", positive: 305, negative: 200 },
  { date: "2024-09-06T08:36:51.427Z", positive: 237, negative: 120 },
  { date: "2024-09-07T08:36:51.427Z", positive: 73, negative: 190 },
  { date: "2024-09-08T08:36:51.427Z", positive: 209, negative: 130 },
  { date: "2024-09-09T08:36:51.427Z", positive: 214, negative: 140 },
  { date: "2024-09-10T08:36:51.427Z", positive: 186, negative: 80 },
  { date: "2024-09-11T08:36:51.427Z", positive: 305, negative: 200 },
  { date: "2024-09-12T08:36:51.427Z", positive: 237, negative: 120 },
  { date: "2024-09-13T08:36:51.427Z", positive: 73, negative: 190 },
  { date: "2024-09-14T08:36:51.427Z", positive: 209, negative: 130 },
  { date: "2024-09-15T08:36:51.427Z", positive: 214, negative: 140 },
];

export function AnalyticsChart() {
  const [selectDate, setSelectDate] = useAtom(selectDateAtom);

  const handleClick = (data: ChartData) => {
    setSelectDate(selectDate === data.date ? null : data.date);
  };

  return (
    <Carousel className="w-full px-4">
      <CarouselContent>
        {
          chunk(chartData, 7).map((data, index) => (
            // eslint-disable-next-line @eslint-react/no-array-index-key
            <CarouselItem key={index}>
              <div className="flex flex-col rounded-xl bg-white p-2">
                <p>
                  {format(data[0].date, "long")}
                  〜
                  {format(data.slice(-1)[0].date, "long")}
                </p>
                <ChartContainer config={ANALYTICS_CHART_CONFIG}>
                  <BarChart accessibilityLayer data={data} className="w-full">
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      fontSize={10}
                      fontWeight={600}
                      tickFormatter={value => format(value, "long", "ja").split("年")[1]}
                    />
                    <Bar dataKey="positive" fill="var(--color-positive)" radius={6} onClick={handleClick}>
                      {selectDate && data.map((entry, index) => (
                      // eslint-disable-next-line @eslint-react/no-array-index-key
                        <Cell opacity={selectDate == entry.date ? "1" : "0.5"} cursor="pointer" key={`cell-${index}`} />
                      ))}
                    </Bar>
                    <Bar dataKey="negative" fill="var(--color-negative)" radius={6} onClick={handleClick}>
                      {selectDate && data.map((entry, index) => (
                      // eslint-disable-next-line @eslint-react/no-array-index-key
                        <Cell opacity={selectDate == entry.date ? "1" : "0.5"} cursor="pointer" key={`cell-${index}`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
                {/* <WeeklyEmotionList chartData={data} /> */}
              </div>
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
