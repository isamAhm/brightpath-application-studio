import type { Payment } from "@/types";

export const mockPayments: Payment[] = [
  { id: "p1", user: "abebe.k@example.com", plan: "Pro", amountEtb: 990, reference: "TB8K2H91QZ", date: "2026-11-04", status: "Pending" },
  { id: "p2", user: "hana.m@example.com", plan: "Premium", amountEtb: 1990, reference: "TB7Q1M44XA", date: "2026-11-04", status: "Pending" },
  { id: "p3", user: "dawit.g@example.com", plan: "Pro", amountEtb: 990, reference: "TB5R9P02LC", date: "2026-11-03", status: "Pending" },
  { id: "p4", user: "meron.a@example.com", plan: "Pro", amountEtb: 990, reference: "TB3N6T71WE", date: "2026-11-02", status: "Pending" },
];
