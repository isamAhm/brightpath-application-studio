import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useApp } from "@/lib/store";
import type { Region } from "@/types";

export function RegionSwitch() {
  const { region, setRegion } = useApp();
  return (
    <ToggleGroup type="single" size="sm" variant="outline" value={region} onValueChange={(v) => v && setRegion(v as Region)}>
      <ToggleGroupItem value="international" className="px-3 text-xs">🌍 International</ToggleGroupItem>
      <ToggleGroupItem value="ethiopia" className="px-3 text-xs">🇪🇹 Ethiopia</ToggleGroupItem>
    </ToggleGroup>
  );
}
