import { Link } from "@tanstack/react-router";
import { Check, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans, prices } from "@/data/plans";
import { useApp } from "@/lib/store";

export function PricingSection() {
  const { region } = useApp();
  return (
    <div>
      {region === "ethiopia" && (
        <p className="mx-auto mb-8 flex max-w-xl items-center justify-center gap-2 rounded-lg border bg-secondary px-4 py-3 text-sm text-secondary-foreground">
          <Smartphone className="h-4 w-4" /> Pay with Telebirr, then submit your reference number.
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const featured = p.id === "pro";
          return (
            <div key={p.id} className={`flex flex-col rounded-2xl border bg-card p-6 ${featured ? "border-primary shadow-elegant ring-1 ring-primary" : ""}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {featured && <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">Popular</span>}
              </div>
              <p className="mt-4 font-display text-4xl font-bold">{prices[region][p.id]}<span className="text-sm font-normal text-muted-foreground"> /month</span></p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />{f}</li>)}
              </ul>
              <Button asChild className="mt-6" variant={featured ? "default" : "outline"}><Link to="/signup">Get {p.name}</Link></Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
