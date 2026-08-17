import { createRoot } from "react-dom/client";
import Home from "@/app/page";
import TodayPage from "@/app/today/page";
import ChallengePage from "@/app/challenge/page";
import { CongratsActions } from "@/components/fitfortune/congrats-actions";
import { ExerciseTimer } from "@/components/fitfortune/exercise-timer";
import "@/app/globals.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const pathname = window.location.pathname.startsWith(basePath)
  ? window.location.pathname.slice(basePath.length)
  : window.location.pathname;
const route = `/${pathname}`.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";

function App() {
  switch (route) {
    case "/today":
      return <TodayPage />;
    case "/exercise":
      return <ExerciseTimer />;
    case "/exercise/challenge":
      return <ExerciseTimer challenge />;
    case "/complete":
      return <CongratsActions showCounts={new URLSearchParams(window.location.search).get("counts") === "1"} />;
    case "/challenge":
      return <ChallengePage />;
    default:
      return <Home />;
  }
}

createRoot(document.getElementById("root")!).render(<App />);
