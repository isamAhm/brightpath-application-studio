export function MatchRing({ score, size = 52 }: { score: number; size?: number }) {
  const r = (size - 6) / 2, c = 2 * Math.PI * r;
  const tone = score >= 85 ? "text-success" : score >= 70 ? "text-primary" : "text-accent";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-label={`Match ${score}%`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={5} className="fill-none stroke-muted" />
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={5} strokeLinecap="round" className={`fill-none stroke-current ${tone}`} strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-xs font-bold">{score}%</span>
    </div>
  );
}
