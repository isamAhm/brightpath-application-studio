import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/prepare/$jobId")({
  head: () => pageMeta("Prepare application", "Prepare application in ApplyPilot."),
  component: () => (
    <PageShell title="Prepare application" subtitle="Coming soon in this prototype.">
      <p className="text-muted-foreground">This screen hasn't been built yet.</p>
    </PageShell>
  ),
});
