import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, FileUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { TagInput } from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/lib/store";
import { pageMeta } from "@/lib/meta";
import type { Seniority } from "@/types";

export const Route = createFileRoute("/onboarding")({
  head: () => pageMeta("Set up your profile", "Upload your resume, review your master profile and set job preferences."),
  component: Onboarding,
});

const stepNames = ["Upload resume", "Master profile", "Job preferences"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
}

function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  return (
    <PageShell title="Set up your profile" subtitle="Three quick steps and you're ready to apply.">
      <ol className="mb-8 flex flex-wrap gap-2">
        {stepNames.map((n, i) => (
          <li key={n}>
            <button onClick={() => setStep(i)} className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm ${i === step ? "border-primary bg-primary text-primary-foreground" : i < step ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"}`}>
              {i < step ? <Check className="h-4 w-4" /> : <span className="font-bold">{i + 1}</span>}{n}
            </button>
          </li>
        ))}
      </ol>
      {step === 0 && <UploadStep />}
      {step === 1 && <ProfileStep />}
      {step === 2 && <PrefsStep />}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
        {step < 2 ? <Button onClick={() => setStep(step + 1)}>Continue</Button> : <Button onClick={() => navigate({ to: "/jobs" })}>See my matches</Button>}
      </div>
    </PageShell>
  );
}

function UploadStep() {
  const [file, setFile] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  return (
    <label onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); setFile(e.dataTransfer.files[0]?.name ?? null); }}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-16 text-center transition-colors ${drag ? "border-primary bg-secondary" : "bg-card hover:bg-muted"}`}>
      <FileUp className="h-10 w-10 text-primary" />
      <p className="mt-4 font-semibold">{file ? `Uploaded: ${file}` : "Drop your resume here or click to browse"}</p>
      <p className="mt-1 text-sm text-muted-foreground">PDF or DOCX, up to 5 MB. We've prefilled sample data for this prototype.</p>
      <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)} />
    </label>
  );
}

function ProfileStep() {
  const { profile: p, setProfile } = useApp();
  const set = <K extends keyof typeof p>(k: K, v: (typeof p)[K]) => setProfile({ ...p, [k]: v });
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card><CardHeader><CardTitle>Contact</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name"><Input value={p.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Headline"><Input value={p.headline} onChange={(e) => set("headline", e.target.value)} /></Field>
        <Field label="Email"><Input value={p.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Phone"><Input value={p.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
        <div className="sm:col-span-2"><Field label="Location"><Input value={p.location} onChange={(e) => set("location", e.target.value)} /></Field></div>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Summary & links</CardTitle></CardHeader><CardContent className="space-y-4">
        <Field label="Summary"><Textarea rows={4} value={p.summary} onChange={(e) => set("summary", e.target.value)} /></Field>
        {(["linkedin", "github", "portfolio"] as const).map((k) => (
          <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}><Input value={p.links[k]} onChange={(e) => set("links", { ...p.links, [k]: e.target.value })} /></Field>
        ))}
      </CardContent></Card>
      <Card className="lg:col-span-2"><CardHeader className="flex-row items-center justify-between"><CardTitle>Experience</CardTitle>
        <Button size="sm" variant="outline" onClick={() => set("experience", [...p.experience, { id: crypto.randomUUID(), role: "", company: "", start: "", end: "", description: "" }])}><Plus />Add</Button></CardHeader>
        <CardContent className="space-y-4">
          {p.experience.map((e, i) => {
            const upd = (patch: Partial<typeof e>) => set("experience", p.experience.map((x) => (x.id === e.id ? { ...x, ...patch } : x)));
            return (
              <div key={e.id} className="grid gap-3 rounded-xl border p-4 sm:grid-cols-4">
                <Input placeholder="Role" value={e.role} onChange={(ev) => upd({ role: ev.target.value })} className="sm:col-span-2" />
                <Input placeholder="Company" value={e.company} onChange={(ev) => upd({ company: ev.target.value })} className="sm:col-span-2" />
                <Input placeholder="Start" value={e.start} onChange={(ev) => upd({ start: ev.target.value })} />
                <Input placeholder="End" value={e.end} onChange={(ev) => upd({ end: ev.target.value })} />
                <div className="flex justify-end sm:col-span-2"><Button size="sm" variant="ghost" onClick={() => set("experience", p.experience.filter((x) => x.id !== e.id))} aria-label={`Remove experience ${i + 1}`}><Trash2 />Remove</Button></div>
                <Textarea placeholder="What you did" value={e.description} onChange={(ev) => upd({ description: ev.target.value })} className="sm:col-span-4" />
              </div>
            );
          })}
        </CardContent></Card>
      <Card><CardHeader><CardTitle>Education</CardTitle></CardHeader><CardContent className="space-y-3">
        {p.education.map((ed) => (
          <div key={ed.id} className="grid gap-2 sm:grid-cols-3">
            {(["school", "degree", "year"] as const).map((k) => <Input key={k} placeholder={k} value={ed[k]} onChange={(e) => set("education", p.education.map((x) => (x.id === ed.id ? { ...x, [k]: e.target.value } : x)))} />)}
          </div>
        ))}
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Skills</CardTitle></CardHeader><CardContent><TagInput value={p.skills} onChange={(v) => set("skills", v)} placeholder="Add a skill and press Enter" /></CardContent></Card>
    </div>
  );
}

const levels: Seniority[] = ["Junior", "Mid", "Senior", "Lead"];
function PrefsStep() {
  const { preferences: pr, setPreferences } = useApp();
  return (
    <Card><CardContent className="grid gap-6 pt-6 md:grid-cols-2">
      <Field label="Target roles"><TagInput value={pr.targetRoles} onChange={(v) => setPreferences({ ...pr, targetRoles: v })} /></Field>
      <Field label="Locations"><TagInput value={pr.locations} onChange={(v) => setPreferences({ ...pr, locations: v })} /></Field>
      <div className="flex items-center justify-between rounded-xl border p-4"><div><p className="font-medium">Remote only</p><p className="text-sm text-muted-foreground">Hide on-site and hybrid roles</p></div>
        <Switch checked={pr.remoteOnly} onCheckedChange={(v) => setPreferences({ ...pr, remoteOnly: v })} /></div>
      <Field label="Seniority">
        <div className="flex flex-wrap gap-2">{levels.map((l) => {
          const on = pr.seniority.includes(l);
          return <Button key={l} size="sm" variant={on ? "default" : "outline"} onClick={() => setPreferences({ ...pr, seniority: on ? pr.seniority.filter((x) => x !== l) : [...pr.seniority, l] })}>{l}</Button>;
        })}</div>
      </Field>
      <Field label={`Salary range: $${pr.salaryMin.toLocaleString()} – $${pr.salaryMax.toLocaleString()}`}>
        <Slider className="pt-3" min={0} max={200000} step={5000} value={[pr.salaryMin, pr.salaryMax]} onValueChange={([a, b]) => setPreferences({ ...pr, salaryMin: a ?? 0, salaryMax: b ?? 0 })} />
      </Field>
      <Field label="Excluded keywords"><TagInput value={pr.excludedKeywords} onChange={(v) => setPreferences({ ...pr, excludedKeywords: v })} /></Field>
    </CardContent></Card>
  );
}
