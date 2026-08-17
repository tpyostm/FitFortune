import { CongratsActions } from "@/components/fitfortune/congrats-actions";

export default async function CompletePage({ searchParams }: { searchParams: Promise<{ counts?: string }> }) {
  const params = await searchParams;
  return <CongratsActions showCounts={params.counts === "1"} />;
}
