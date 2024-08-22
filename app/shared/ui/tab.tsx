import { Link } from "@remix-run/react";
import { Heart, NotebookPen } from "lucide-react";

export function Tab() {
  return (
    <footer>
      <nav className="fixed bottom-0 grid h-footer w-full grid-cols-2 border-t bg-pastel-primary shadow-xl">
        <Link to="/analytics" className="grid place-items-center"><Heart className="text-white" /></Link>
        <Link to="/list" className="grid place-items-center"><NotebookPen className="text-white" /></Link>
      </nav>
    </footer>
  );
}
