import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function TagInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("");
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {value.map((t) => (
          <Badge key={t} variant="secondary" className="gap-1">{t}
            <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} aria-label={`Remove ${t}`}><X className="h-3 w-3" /></button>
          </Badge>
        ))}
      </div>
      <Input value={draft} placeholder={placeholder ?? "Type and press Enter"} onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { e.preventDefault(); if (!value.includes(draft.trim())) onChange([...value, draft.trim()]); setDraft(""); } }} />
    </div>
  );
}
