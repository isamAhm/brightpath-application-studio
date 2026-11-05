import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/billing")({
  head: () => pageMeta("Billing and settings", "Billing and settings in ApplyPilot."),
  component: () => (
    <PageShell title="Billing and settings" subtitle="Coming soon in this prototype.">
      <p className="text-muted-foreground">This screen hasn't been built yet.</p>
    </PageShell>
  ),
});
