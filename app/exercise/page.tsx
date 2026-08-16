import { ExerciseTimer } from "../../components/exercise-timer";

export default async function ExercisePage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const params = await searchParams;
  return <ExerciseTimer challenge={params.mode === "challenge"} />;
}
