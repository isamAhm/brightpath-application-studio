import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader";

export function PageShell({ title, subtitle, actions, children }: { title: string; subtitle?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="text-2xl font-bold md:text-3xl">{title}</h1>{subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}</div>
          {actions}
        </div>
        {children}
      </main>
    </div>
  );
}
