import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from "@/components/PageShell";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useApp } from "@/lib/store";
import { pageMeta } from "@/lib/meta";
import type { PaymentStatus } from "@/types";

export const Route = createFileRoute("/admin")({
  head: () => pageMeta("Pending payments", "Review and approve Telebirr payment references."),
  component: AdminPage,
});

const statusBadge: Record<PaymentStatus, "secondary" | "default" | "outline"> = { Pending: "secondary", Approved: "default", Rejected: "outline" };

function AdminPage() {
  const { payments, setPaymentStatus } = useApp();
  return (
    <PageShell title="Pending payments" subtitle="Approve or reject Telebirr reference submissions.">
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.user}</TableCell>
                <TableCell>{p.plan}</TableCell>
                <TableCell>{p.amountEtb.toLocaleString()} ETB</TableCell>
                <TableCell className="font-mono text-xs">{p.reference}</TableCell>
                <TableCell className="text-muted-foreground">{p.date}</TableCell>
                <TableCell><Badge variant={statusBadge[p.status]}>{p.status}</Badge></TableCell>
                <TableCell className="text-right">
                  {p.status === "Pending" ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="default" onClick={() => setPaymentStatus(p.id, "Approved")}><Check />Approve</Button>
                      <Button size="sm" variant="outline" onClick={() => setPaymentStatus(p.id, "Rejected")}><X />Reject</Button>
                    </div>
                  ) : <span className="text-xs text-muted-foreground">—</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageShell>
  );
}
