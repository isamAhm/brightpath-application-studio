import { Link } from "@tanstack/react-router";
import { Menu, Moon, Plane, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/store";
import { RegionSwitch } from "./RegionSwitch";

const nav = [
  { to: "/jobs", label: "Jobs" },
  { to: "/tracker", label: "Tracker" },
  { to: "/onboarding", label: "Profile" },
  { to: "/billing", label: "Billing" },
  { to: "/admin", label: "Admin" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Plane className="h-4 w-4" /></span>
      ApplyPilot
    </Link>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}

export function AppHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Logo />
        <nav className="ml-6 hidden gap-1 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground" activeProps={{ className: "bg-secondary text-secondary-foreground" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block"><RegionSwitch /></div>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu"><Menu /></Button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t px-4 py-3 md:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm">{n.label}</Link>)}
          <div className="pt-2 sm:hidden"><RegionSwitch /></div>
        </nav>
      )}
    </header>
  );
}
