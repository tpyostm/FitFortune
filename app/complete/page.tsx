import { CongratsActions } from "@/components/fitfortune/congrats-actions";

// See app/exercise/page.tsx — the Pages build cannot read `?counts=1` at build
// time, so CongratsActions picks it up from the URL on mount instead.
const isStaticExport = process.env.BUILD_TARGET === "pages";

export default async function CompletePage({ searchParams }: { searchParams: Promise<{ counts?: string }> }) {
  const counts = isStaticExport ? undefined : (await searchParams).counts;
  return <CongratsActions showCounts={counts === "1"} />;
}
