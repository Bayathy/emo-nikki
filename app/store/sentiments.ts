import { atom } from "jotai";

import { ChartData } from "~/routes/analytics/components/analytics-chart";

export const sentimentsAtom = atom<ChartData[]>([]);
