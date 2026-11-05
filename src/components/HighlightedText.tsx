export function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\[\[[\s\S]*?\]\]|\{\{[\s\S]*?\}\})/g);
  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed">
      {parts.map((p, i) =>
        p.startsWith("[[") ? <mark key={i} className="rounded bg-hl-changed px-0.5 text-foreground">{p.slice(2, -2)}</mark>
        : p.startsWith("{{") ? <mark key={i} className="rounded bg-hl-emphasis px-0.5 font-semibold text-foreground">{p.slice(2, -2)}</mark>
        : <span key={i}>{p}</span>)}
    </div>
  );
}

export function HighlightLegend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-hl-changed" />Changed vs master profile</span>
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-hl-emphasis" />Emphasized for this job</span>
    </div>
  );
}
