import type { Plan, Region } from "@/types";

export const plans: Plan[] = [
  { id: "free", name: "Free", applications: 5, features: ["5 prepared applications / month", "Job matching", "Application tracker"] },
  { id: "pro", name: "Pro", applications: 50, features: ["50 prepared applications / month", "All tones", "PDF export", "Priority matching"] },
  { id: "premium", name: "Premium", applications: "Unlimited", features: ["Unlimited applications", "Application answers", "Interview prep notes", "Priority support"] },
];

// Placeholder prices
export const prices: Record<Region, Record<Plan["id"], string>> = {
  international: { free: "$0", pro: "$19", premium: "$39" },
  ethiopia: { free: "0 ETB", pro: "990 ETB", premium: "1,990 ETB" },
};
export const priceEtb: Record<Plan["id"], number> = { free: 0, pro: 990, premium: 1990 };
