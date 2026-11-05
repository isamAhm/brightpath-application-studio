import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/tracker")({
  head: () => pageMeta("Application tracker", "Application tracker in ApplyPilot."),
  component: () => (
    <PageShell title="Application tracker" subtitle="Coming soon in this prototype.">
      <p className="text-muted-foreground">This screen hasn't been built yet.</p>
    </PageShell>
  ),
});
