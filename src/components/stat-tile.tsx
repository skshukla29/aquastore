import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatTileProps {
  label: string;
  value: string;
  deltaLabel: string;
  positive?: boolean;
}

export function StatTile({ label, value, deltaLabel, positive = true }: StatTileProps) {
  const Icon = positive ? ArrowDownRight : ArrowUpRight;

  return (
    <Card className="h-full">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-sky-900">{value}</p>
      <p
        className={`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
          positive ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
        {deltaLabel}
      </p>
    </Card>
  );
}
