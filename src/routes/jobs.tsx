import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, EyeOff, MapPin, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { MatchRing } from "@/components/MatchRing";
import { PageShell } from "@/components/PageShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { jobs } from "@/data/jobs";
import { useApp } from "@/lib/store";
import { pageMeta } from "@/lib/meta";
import type { Seniority } from "@/types";

export const Route = createFileRoute("/jobs")({
  head: () => pageMeta("Job feed", "Jobs matched to your profile, scored and explained."),
  component: JobFeed,
});

const levels: Seniority[] = ["Junior", "Mid", "Senior", "Lead"];

function JobFeed() {
  const { hidden, hideJob, tracker, toggleSaved } = useApp();
  const [q, setQ] = useState("");
  const [remote, setRemote] = useState(false);
  const [sen, setSen] = useState<Seniority[]>([]);
  const [days, setDays] = useState("any");

  const list = useMemo(() => jobs
    .filter((j) => !hidden.includes(j.id))
    .filter((j) => !remote || j.remote)
    .filter((j) => !sen.length || sen.includes(j.seniority))
    .filter((j) => days === "any" || j.postedDaysAgo <= Number(days))
    .filter((j) => !q || `${j.title} ${j.company} ${j.requirements.join(" ")}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.matchScore - a.matchScore), [hidden, remote, sen, days, q]);

  return (
    <PageShell title="Your matches" subtitle={`${list.length} jobs ranked by fit`}>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit space-y-6 rounded-2xl border bg-card p-5 lg:sticky lg:top-24">
          <div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="Keyword" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="flex items-center justify-between"><Label htmlFor="remote">Remote only</Label><Switch id="remote" checked={remote} onCheckedChange={setRemote} /></div>
          <div className="space-y-2"><p className="text-sm font-medium">Seniority</p>
            {levels.map((l) => (
              <label key={l} className="flex items-center gap-2 text-sm"><Checkbox checked={sen.includes(l)} onCheckedChange={(c) => setSen(c ? [...sen, l] : sen.filter((x) => x !== l))} />{l}</label>
            ))}
          </div>
          <div className="space-y-2"><p className="text-sm font-medium">Date posted</p>
            <Select value={days} onValueChange={setDays}><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="any">Any time</SelectItem><SelectItem value="1">Last 24 hours</SelectItem><SelectItem value="3">Last 3 days</SelectItem><SelectItem value="7">Last week</SelectItem><SelectItem value="14">Last 2 weeks</SelectItem></SelectContent>
            </Select>
          </div>
        </aside>
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((j) => {
            const saved = tracker.some((c) => c.jobId === j.id);
            return (
              <article key={j.id} className="flex flex-col rounded-2xl border bg-card p-5 transition-shadow hover:shadow-elegant">
                <div className="flex gap-4">
                  <MatchRing score={j.matchScore} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold leading-tight">{j.title}</h3>
                    <p className="text-sm text-muted-foreground">{j.company}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{j.location}</span>
                      {j.remote && <Badge variant="secondary">Remote</Badge>}
                      <Badge variant="outline">{j.seniority}</Badge>
                      <span>{j.postedDaysAgo === 1 ? "1 day ago" : `${j.postedDaysAgo} days ago`}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 flex gap-2 rounded-lg bg-muted p-3 text-sm"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{j.whyMatch}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Button asChild size="sm" className="flex-1"><Link to="/prepare/$jobId" params={{ jobId: j.id }}>Prepare application</Link></Button>
                  <Button size="icon" variant="outline" onClick={() => toggleSaved(j.id)} aria-label={saved ? "Unsave" : "Save"}>{saved ? <BookmarkCheck className="text-primary" /> : <Bookmark />}</Button>
                  <Button size="icon" variant="ghost" onClick={() => hideJob(j.id)} aria-label="Hide"><EyeOff /></Button>
                </div>
              </article>
            );
          })}
          {!list.length && <p className="col-span-full py-16 text-center text-muted-foreground">No jobs match these filters.</p>}
        </div>
      </div>
    </PageShell>
  );
}
