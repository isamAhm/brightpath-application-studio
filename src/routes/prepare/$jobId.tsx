import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Copy, Download, ExternalLink, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HighlightedText, HighlightLegend } from "@/components/HighlightedText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { jobs } from "@/data/jobs";
import { useApp } from "@/lib/store";
import { pageMeta } from "@/lib/meta";
import { generateDocuments, stripMarkup } from "@/services/generateDocuments";
import type { GeneratedDocuments, Tone } from "@/types";

export const Route = createFileRoute("/prepare/$jobId")({
  head: () => pageMeta("Prepare application", "Review tailored resume, cover letter and application answers."),
  component: PreparePage,
});

const tabs = ["resume", "coverLetter", "answers"] as const;
const tones: Tone[] = ["Formal", "Concise", "Warm"];

function PreparePage() {
  const { jobId } = Route.useParams();
  const job = jobs.find((j) => j.id === jobId);
  const navigate = useNavigate();
  const { profile, setStatus, incrementUsed } = useApp();

  const [tone, setTone] = useState<Tone>("Formal");
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<GeneratedDocuments>({ resume: "", coverLetter: "", answers: "" });
  const [tab, setTab] = useState<(typeof tabs)[number]>("resume");

  const run = async (t: Tone) => {
    setLoading(true);
    const result = await generateDocuments(profile, job!, t);
    setDocs(result);
    setLoading(false);
  };

  useEffect(() => { run(tone); /* eslint-disable-next-line */ }, []);

  if (!job) return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Job not found.</div>;

  const copy = () => { navigator.clipboard.writeText(stripMarkup(docs[tab])); toast.success("Copied to clipboard"); };
  const apply = () => { incrementUsed(); setStatus(job.id, "Applied"); window.open(job.applyUrl, "_blank"); navigate({ to: "/tracker" }); };

  return (
    <div className="min-h-screen">
      <div className="border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <Button asChild size="sm" variant="ghost"><Link to="/jobs"><ArrowLeft className="h-4 w-4" />Back to jobs</Link></Button>
          <h1 className="text-lg font-semibold">{job.title} <span className="text-muted-foreground">· {job.company}</span></h1>
          <Badge variant="outline" className="ml-1">{job.matchScore}% match</Badge>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Select value={tone} onValueChange={(v) => { setTone(v as Tone); run(v as Tone); }}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>{tones.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={() => run(tone)} disabled={loading}><RefreshCw className={loading ? "animate-spin" : ""} />Regenerate</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 lg:grid-cols-2">
        <Card className="h-fit p-5 lg:sticky lg:top-20">
          <h2 className="font-semibold">Job description</h2>
          <p className="mt-3 text-sm leading-relaxed">{job.description}</p>
          <h3 className="mt-5 text-sm font-semibold">Requirements</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">{job.requirements.map((r) => <li key={r} className="flex gap-2"><span className="text-primary">•</span>{r}</li>)}</ul>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">{job.location}</Badge>
            {job.remote && <Badge variant="secondary">Remote</Badge>}
            <Badge variant="outline">{job.seniority}</Badge>
            <span>{job.salary}</span>
          </div>
        </Card>

        <Card className="p-5">
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <TabsList>
                {tabs.map((t) => <TabsTrigger key={t} value={t}>{t === "coverLetter" ? "Cover Letter" : t.charAt(0).toUpperCase() + t.slice(1)}</TabsTrigger>)}
              </TabsList>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={copy} disabled={loading}><Copy />Copy</Button>
                <Button size="sm" variant="ghost" disabled={loading} onClick={() => toast.info("PDF export is a stub in this prototype.")}><Download />PDF</Button>
              </div>
            </div>

            {tabs.map((t) => (
              <TabsContent key={t} value={t} className="mt-4 space-y-3">
                <HighlightLegend />
                {loading ? (
                  <div className="space-y-2.5">
                    {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-4" style={{ width: `${70 + ((i * 13) % 30)}%` }} />)}
                  </div>
                ) : (
                  <>
                    <HighlightedText text={docs[t]} />
                    <Textarea className="mt-3 min-h-48 font-mono text-sm" value={docs[t]} onChange={(e) => setDocs({ ...docs, [t]: e.target.value })} aria-label={`Edit ${t}`} />
                    <p className="text-xs text-muted-foreground">Editable — your changes are kept locally.</p>
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <Button className="mt-5 w-full" size="lg" onClick={apply} disabled={loading}>
            <ExternalLink />Apply on company site
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">Opens the job's apply URL and moves this job to Applied in your tracker.</p>
        </Card>
      </div>
    </div>
  );
}
