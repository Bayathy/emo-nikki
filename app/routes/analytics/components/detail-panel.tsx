import { format } from "@formkit/tempo";
import { useFetcher } from "@remix-run/react";
import { useAtom } from "jotai";
import { Bot, CalendarCog, PersonStanding } from "lucide-react";
import { useEffect } from "react";

import { loader } from "~/routes/api.diary/route";
import { selectDateAtom } from "~/store/select-date";

import { DetailChart } from "./detail-chart";
import { EmotionCard } from "./emotion-card";

export function DetailPanel() {
  const diary = useFetcher<typeof loader>();

  const selectDate = useAtom(selectDateAtom)[0];

  useEffect(() => {
    if (selectDate) {
      diary.load("/api/diary?date=" + selectDate);
    }
  }, [selectDate]);

  return (
    <>
      {selectDate
        ? (
          diary.state === "idle" && diary.data
            ? (
              <>
                <div className="flex flex-col gap-4 px-4 pb-16">
                  <div className="flex justify-between">
                    <h2 className="flex w-max items-center justify-center gap-2 rounded-xl text-xl font-bold text-white">
                      <CalendarCog />
                      {format(new Date(selectDate), "long", "ja")}
                    </h2>
                    <EmotionCard positive={diary.data.sentiments.positive} negative={diary.data.sentiments.negative} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="px-2">
                        <h3 className="font-bold text-white">この日の気分</h3>
                      </div>
                      <span className="w-full border-t-2 border-dotted border-white" />
                      <div className="flex justify-center">
                        <DetailChart positive={diary.data.sentiments.positive} negative={diary.data.sentiments.negative} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="px-2">
                        <h3 className="font-bold text-white">日記</h3>
                      </div>
                      <span className="w-full border-t-2 border-dotted border-white" />
                      {
                        diary.data.diary?.text
                          ? (
                            <article className="text-balance rounded-lg bg-white p-4 text-sm">
                              {diary.data.diary?.text}
                            </article>
                          )
                          : (
                            <div className="rounded-lg bg-white p-4 text-center text-sm">
                              <p>日記がありません</p>
                            </div>
                          )
                      }
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between px-2">
                        <h3 className="font-bold text-white">振り返り</h3>
                      </div>
                      <span className="w-full border-t-2 border-dotted border-white" />
                      {
                        diary.data.questions
                          ? (
                            <div className="flex flex-col gap-2">
                              <div className="mr-10 flex flex-col gap-4">
                                <div className="flex items-start gap-2">
                                  <div className="w-max rounded-full bg-white p-1">
                                    <Bot size={24} />
                                  </div>
                                  <div className="flex flex-1 flex-col gap-1">
                                    <p className="text-sm text-white">質問</p>
                                    <div className="rounded-[0px_8px_8px_8px] bg-pastel-tertiary p-2">
                                      <p className="text-xs text-white">
                                        {diary.data.questions.question}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-10 flex flex-col gap-4">
                                <div className="flex items-start gap-2">
                                  <div className="flex flex-1 flex-col gap-1">
                                    <p className="text-end text-xs text-white">回答</p>
                                    <div className="rounded-[8px_0px_8px_8px] bg-white p-2">
                                      <p className="text-sm">
                                        {diary.data.questions.answer}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-max rounded-full bg-white p-1">
                                    <PersonStanding size={24} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                          : (
                            <div className="rounded-lg bg-white p-4 text-center text-sm">
                              <p>振り返りがありません</p>
                            </div>
                          )
                      }

                    </div>
                  </div>
                </div>
              </>
            )
            : (
              <div className="flex h-full items-center justify-center">
                <p className="text-white">loading...</p>
              </div>
            )
        )
        : (
          <div className="mx-auto mt-12 w-max">
            <p className="text-sm font-medium text-white">グラフをタップして詳細を確認してみましょう</p>
          </div>
        )}
    </>
  );
}
