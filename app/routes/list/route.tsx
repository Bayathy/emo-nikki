import { DiaryList } from "./components/diary-list";

export default function List() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <h1 className="p-4 text-xl font-semibold">日記一覧</h1>
      <div className="h-full px-4">
        <DiaryList />
      </div>
    </div>
  );
}
