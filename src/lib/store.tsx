import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Payment, Plan, Preferences, Profile, Region, TrackerCard, TrackerStatus } from "@/types";
import { sampleProfile, samplePreferences } from "@/data/profile";
import { mockPayments } from "@/data/payments";

interface AppState {
  region: Region; setRegion: (r: Region) => void;
  theme: "light" | "dark"; toggleTheme: () => void;
  profile: Profile; setProfile: (p: Profile) => void;
  preferences: Preferences; setPreferences: (p: Preferences) => void;
  plan: Plan["id"]; setPlan: (p: Plan["id"]) => void;
  used: number; incrementUsed: () => void;
  hidden: string[]; hideJob: (id: string) => void;
  tracker: TrackerCard[]; setStatus: (jobId: string, s: TrackerStatus) => void;
  toggleSaved: (jobId: string) => void; updateCard: (jobId: string, patch: Partial<TrackerCard>) => void;
  payments: Payment[]; addPayment: (p: Payment) => void; setPaymentStatus: (id: string, s: Payment["status"]) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>("international");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [profile, setProfile] = useState(sampleProfile);
  const [preferences, setPreferences] = useState(samplePreferences);
  const [plan, setPlan] = useState<Plan["id"]>("free");
  const [used, setUsed] = useState(2);
  const [hidden, setHidden] = useState<string[]>([]);
  const [tracker, setTracker] = useState<TrackerCard[]>([
    { jobId: "j4", status: "Saved", notes: "", followUp: "" },
    { jobId: "j6", status: "Applied", notes: "Referred by Abel", followUp: "2026-11-12" },
    { jobId: "j3", status: "Interview", notes: "Tech screen Tuesday", followUp: "2026-11-10" },
  ]);
  const [payments, setPayments] = useState(mockPayments);

  useEffect(() => {
    const t = localStorage.getItem("theme");
    if (t === "dark" || t === "light") setTheme(t);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setStatus = (jobId: string, status: TrackerStatus) =>
    setTracker((t) => t.some((c) => c.jobId === jobId)
      ? t.map((c) => (c.jobId === jobId ? { ...c, status } : c))
      : [...t, { jobId, status, notes: "", followUp: "" }]);

  return (
    <Ctx.Provider value={{
      region, setRegion, theme, toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      profile, setProfile, preferences, setPreferences, plan, setPlan,
      used, incrementUsed: () => setUsed((u) => u + 1),
      hidden, hideJob: (id) => setHidden((h) => [...h, id]),
      tracker, setStatus,
      toggleSaved: (jobId) => setTracker((t) => t.some((c) => c.jobId === jobId && c.status === "Saved")
        ? t.filter((c) => c.jobId !== jobId) : t.some((c) => c.jobId === jobId) ? t : [...t, { jobId, status: "Saved", notes: "", followUp: "" }]),
      updateCard: (jobId, patch) => setTracker((t) => t.map((c) => (c.jobId === jobId ? { ...c, ...patch } : c))),
      payments, addPayment: (p) => setPayments((ps) => [p, ...ps]),
      setPaymentStatus: (id, status) => setPayments((ps) => ps.map((p) => (p.id === id ? { ...p, status } : p))),
    }}>{children}</Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}
