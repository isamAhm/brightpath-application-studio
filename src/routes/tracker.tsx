import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, GripVertical, StickyNote } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobs } from "@/data/jobs";
import { useApp } from "@/lib/store";
import { pageMeta } from "@/lib/meta";
import type { TrackerCard, TrackerStatus } from "@/types";

export const Route = createFileRoute("/tracker")({
  head: () => pageMeta("Application tracker", "Track your applications from saved to offer."),
  component: TrackerBoard,
});

const columns: TrackerStatus[] = ["Saved", "Prepared", "Applied", "Interview", "Offer", "Rejected"];
const colStyle: Record<TrackerStatus, string> = {
  Saved: "border-t-slate-400", Prepared: "border-t-primary", Applied: "border-t-accent",
  Interview: "border-t-warning", Offer: "border-t-success", Rejected: "border-t-error",
};

function TrackerBoard() {
  const { tracker, setStatus, updateCard } = useApp();
  const [dragId, setDragId] = useState<string | null>(null);

  return (
    <PageShell title="Application tracker" subtitle="Drag cards between columns or use the buttons.">
      <div className="grid gap-4 overflow-x-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {columns.map((col) => {
          const cards = tracker.filter((c) => c.status === col);
          return (
            <div key={col} className={`rounded-xl border bg-card p-3 border-t-4 ${colStyle[col]}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (dragId) { setStatus(dragId, col); setDragId(null); } }}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">{col}</h2>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{cards.length}</span>
              </div>
              <div className="space-y-3">
                {cards.map((c) => <TrackerCardView key={c.jobId} card={c} onDragStart={() => setDragId(c.jobId)} onMove={(s) => setStatus(c.jobId, s)} onUpdate={(patch) => updateCard(c.jobId, patch)} />)}
                {!cards.length && <p className="rounded-lg border border-dashed py-6 text-center text-xs text-muted-foreground">Drop here</p>}
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}

function TrackerCardView({ card, onDragStart, onMove, onUpdate }: {
  card: TrackerCard; onDragStart: () => void; onMove: (s: TrackerStatus) => void; onUpdate: (patch: Partial<TrackerCard>) => void;
}) {
  const job = jobs.find((j) => j.id === card.jobId);
  const [open, setOpen] = useState(false);
  if (!job) return null;
  return (
    <article draggable onDragStart={onDragStart} className="cursor-grab rounded-lg border bg-background p-3 shadow-sm active:cursor-grabbing">
      <div className="flex items-start gap-2">
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{job.title}</h3>
          <p className="truncate text-xs text-muted-foreground">{job.company}</p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {columns.filter((c) => c !== card.status).map((c) => (
          <button key={c} onClick={() => onMove(c)} className="rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-secondary">{c}</button>
        ))}
      </div>
      <button onClick={() => setOpen(!open)} className="mt-2 flex w-full items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <StickyNote className="h-3 w-3" />{open ? "Hide" : "Notes & follow-up"}
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          <Textarea rows={2} placeholder="Add a note…" value={card.notes} onChange={(e) => onUpdate({ notes: e.target.value })} className="text-xs" />
          <div className="flex items-center gap-1"><CalendarClock className="h-3 w-3 text-muted-foreground" /><Input type="date" value={card.followUp} onChange={(e) => onUpdate({ followUp: e.target.value })} className="h-8 text-xs" /></div>
        </div>
      )}
      <Button asChild size="sm" variant="ghost" className="mt-2 h-7 w-full text-xs"><Link to="/prepare/$jobId" params={{ jobId: job.id }}>Open in prepare</Link></Button>
    </article>
  );
}
