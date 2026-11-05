import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, FileText, Upload } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { PricingSection } from "@/components/PricingSection";
import { RegionSwitch } from "@/components/RegionSwitch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ApplyPilot — Your AI job application co-pilot" },
      { name: "description", content: "Upload your resume, get matched jobs, and review tailored resumes and cover letters before you apply." },
      { property: "og:title", content: "ApplyPilot — Your AI job application co-pilot" },
      { property: "og:description", content: "Matched jobs plus tailored resumes and cover letters, ready to review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const steps = [
  { icon: Upload, title: "Upload your resume", body: "We turn it into an editable master profile in seconds." },
  { icon: Briefcase, title: "Get matched jobs", body: "A daily feed scored against your skills and preferences." },
  { icon: FileText, title: "Review, then apply", body: "Tailored resume and cover letter for each job. You stay in control." },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <div className="border-b bg-muted/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-2 text-xs text-muted-foreground">
          Showing plans for <RegionSwitch />
        </div>
      </div>
      <AppHeader />
      <section className="bg-hero">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center md:py-28">
          <span className="inline-block rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">Prototype · AI job application assistant</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">Apply to the right jobs,<br /><span className="text-primary">with less busywork.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">ApplyPilot finds roles that fit you and drafts a tailored resume and cover letter for each one. You review, edit and hit apply.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><Link to="/signup">Start free <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/jobs">See the job feed</Link></Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary"><s.icon className="h-5 w-5" /></span>
                <span className="font-display text-sm font-bold text-muted-foreground">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="pricing" className="border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-center text-3xl font-bold">Simple pricing</h2>
          <p className="mb-10 mt-2 text-center text-muted-foreground">Placeholder prices. Switch region at the top.</p>
          <PricingSection />
        </div>
      </section>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">© 2026 ApplyPilot</footer>
    </div>
  );
}
