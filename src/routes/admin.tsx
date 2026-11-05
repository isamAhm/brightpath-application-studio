import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/admin")({
  head: () => pageMeta("Pending payments", "Pending payments in ApplyPilot."),
  component: () => (
    <PageShell title="Pending payments" subtitle="Coming soon in this prototype.">
      <p className="text-muted-foreground">This screen hasn't been built yet.</p>
    </PageShell>
  ),
});
