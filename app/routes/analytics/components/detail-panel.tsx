import { format } from "@formkit/tempo";
import { useAtom } from "jotai";
import { Bot, CalendarCog, PersonStanding } from "lucide-react";

import { selectDateAtom } from "~/store/select-date";

import { DetailChart } from "./detail-chart";
import { EmotionCard } from "./emotion-card";

export function DetailPanel() {
  const selectDate = useAtom(selectDateAtom)[0];

  const detailChartData = [
    { emotion: "positive", amount: 186, fill: "hsl(var(--chart-1))" },
    { emotion: "negative", amount: 80, fill: "hsl(var(--chart-2))" },
  ];

  return (
    <>
      {selectDate
        ? (
          <>
            <div className="flex flex-col gap-4 px-4">
              <div className="flex justify-between">
                <h2 className="flex w-max items-center justify-center gap-2 rounded-xl text-xl font-bold text-white">
                  <CalendarCog />
                  {format(new Date(selectDate), "long", "ja")}
                </h2>
                <EmotionCard />
              </div>
              <div className="flex flex-col gap-2">
                <div className="px-2">
                  <h3 className="font-bold text-white">この日の気分</h3>
                </div>
                <span className="w-full border-t-2 border-dotted border-white" />
                <div className="flex justify-center">
                  <DetailChart detailChartData={detailChartData} />
                </div>
                <div className="px-2">
                  <h3 className="font-bold text-white">日記</h3>
                </div>
                <span className="w-full border-t-2 border-dotted border-white" />
                <article className="text-balance rounded-lg bg-white p-4 text-sm">
                  今日は少し涼しい朝だった。目覚めてすぐに窓を開けたら、心地よい風が入ってきて、少しずつ夏の終わりを感じる。この季節の移り変わりを感じる瞬間が好きだ。

                  午前中は仕事に集中できて、思っていた以上に進捗があった。特に、プロジェクトの新しいアイデアが浮かんだので、すぐにメモしておいた。午後は少し疲れたので、カフェで休憩を取ることに。新しい本を持って行ったけど、結局は店内の雰囲気に癒されて、あまり読まずにボーっとしていた。

                  帰宅後は、久しぶりに料理をしてみた。冷蔵庫に残っていた野菜を使ってパスタを作ったら、思ったより美味しくできたので満足。食後に少し散歩して、夜空を見上げたら、久しぶりに星がよく見えた。こんな日常の中の小さな幸せを大切にしたいと思う。

                  明日はもっと早く寝て、朝早くから活動しようかな。少しずつ秋の準備をしていこう。
                </article>
                <div className="flex justify-between px-2">
                  <h3 className="font-bold text-white">振り返り</h3>
                </div>
                <span className="w-full border-t-2 border-dotted border-white" />
                <div className="flex flex-col gap-2">
                  <div className="mr-10 flex flex-col gap-4">
                    <div className="flex items-start gap-2">
                      <div className="w-max rounded-full bg-white p-1">
                        <Bot size={24} />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <p className="text-xs text-white">質問</p>
                        <div className="rounded-[0px_8px_8px_8px] bg-pastel-tertiary p-2">
                          <p className="text-xs text-white">
                            季節の移り変わりを感じる瞬間に、どんな感情が湧いてきますか？
                            それは過去のどんな経験や記憶に関連していますか？
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
                          <p className="text-xs">季節の移り変わりを感じる瞬間に、私はしばしば懐かしさと新しい始まりの期待感を感じます。例えば、夏の終わりの涼しさを感じると、子供の頃の夏休みの終わりや、新学期が始まる前のわくわく感を思い出します。</p>
                        </div>
                      </div>
                      <div className="w-max rounded-full bg-white p-1">
                        <PersonStanding size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
        : (
          <div className="mx-auto mt-12 w-max">
            <p className="text-sm font-medium text-white">グラフをタップして詳細を確認してみましょう</p>
          </div>
        )}
    </>
  );
}
