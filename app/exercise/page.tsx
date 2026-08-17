import { ExerciseTimer } from "@/components/fitfortune/exercise-timer";

// `output: 'export'` prerenders at build time, where there is no request to
// read a query string from. The Pages build renders the default mode and
// ExerciseTimer reconciles it from the URL on mount.
const isStaticExport = process.env.BUILD_TARGET === "pages";

export default async function ExercisePage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const mode = isStaticExport ? undefined : (await searchParams).mode;
  return <ExerciseTimer challenge={mode === "challenge"} />;
}
