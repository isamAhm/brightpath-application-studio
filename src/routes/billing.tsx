import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from "@/components/PageShell";
import { Check, Clock, Smartphone } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { plans, prices, priceEtb } from "@/data/plans";
import { useApp } from "@/lib/store";
import { pageMeta } from "@/lib/meta";
import type { Plan } from "@/types";

export const Route = createFileRoute("/billing")({
  head: () => pageMeta("Billing and settings", "Manage your plan, usage and payment method."),
  component: BillingPage,
});

function BillingPage() {
  const { region, setRegion, plan, setPlan, used, addPayment } = useApp();
  const limit = plans.find((p) => p.id === plan)!.applications;
  const pct = limit === "Unlimited" ? 20 : Math.min(100, (used / (limit as number)) * 100);

  const [ref, setRef] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitTelebirr = () => {
    if (!ref.trim()) return;
    addPayment({ id: crypto.randomUUID(), user: "you@example.com", plan: plans.find((p) => p.id === plan)!.name, amountEtb: priceEtb[plan], reference: ref.trim(), date: new Date().toISOString().slice(0, 10), status: "Pending" });
    setSubmitted(true);
  };

  return (
    <PageShell title="Billing and settings" subtitle="Manage your plan, usage and payment method.">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Current plan</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl font-bold">{plans.find((p) => p.id === plan)!.name}</span>
              <span className="text-muted-foreground">{prices[region][plan]} / month</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium">Prepared applications this month</span><span className="text-muted-foreground">{used} / {limit === "Unlimited" ? "∞" : limit}</span></div>
              <Progress value={pct} />
            </div>
            <h3 className="mt-8 mb-3 text-sm font-semibold">Switch plan</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {plans.map((p) => (
                <button key={p.id} onClick={() => { setPlan(p.id); setSubmitted(false); setRef(""); }}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-colors ${p.id === plan ? "border-primary ring-1 ring-primary" : "hover:bg-muted"}`}>
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-sm text-muted-foreground">{prices[region][p.id]}/mo</span>
                  {p.id === plan && <span className="mt-1 text-xs text-primary">Current</span>}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Region & payment</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-2 block">Region</Label>
              <div className="flex gap-2">
                {(["international", "ethiopia"] as const).map((r) => (
                  <Button key={r} size="sm" variant={region === r ? "default" : "outline"} onClick={() => setRegion(r)} className="flex-1">
                    {r === "international" ? "🌍 International" : "🇪🇹 Ethiopia"}
                  </Button>
                ))}
              </div>
            </div>
            {region === "ethiopia" ? (
              submitted ? (
                <div className="rounded-lg border bg-secondary p-4 text-sm">
                  <div className="flex items-center gap-2 font-semibold"><Clock className="h-4 w-4 text-warning" />Pending verification</div>
                  <p className="mt-2 text-muted-foreground">Your reference <span className="font-mono font-medium">{ref}</span> for {priceEtb[plan]} ETB is awaiting admin approval.</p>
                  <Button size="sm" variant="outline" className="mt-3" onClick={() => { setSubmitted(false); setRef(""); }}>Submit another</Button>
                </div>
              ) : (
                <div className="space-y-3 rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold"><Smartphone className="h-4 w-4 text-primary" />Pay with Telebirr</div>
                  <p className="text-sm text-muted-foreground">Send <span className="font-medium text-foreground">{priceEtb[plan]} ETB</span> to <span className="font-mono">0900-1234</span> (ApplyPilot), then enter your reference number below.</p>
                  <div><Label htmlFor="ref">Reference number</Label><Input id="ref" placeholder="TB……" value={ref} onChange={(e) => setRef(e.target.value)} /></div>
                  <Button className="w-full" onClick={submitTelebirr} disabled={!ref.trim()}>Submit for verification</Button>
                </div>
              )
            ) : (
              <div className="rounded-lg border bg-secondary p-4 text-sm text-muted-foreground">International payments use a card checkout (stub in this prototype).</div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
