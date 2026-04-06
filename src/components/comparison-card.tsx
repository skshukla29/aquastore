import { Card } from "@/components/ui/card";

interface ComparisonCardProps {
  usage: number;
  cityAverage: number;
}

export function ComparisonCard({ usage, cityAverage }: ComparisonCardProps) {
  const delta = Math.round(((usage - cityAverage) / Math.max(1, cityAverage)) * 100);

  return (
    <Card title="Usage vs City Average">
      <div className="space-y-2 rounded-2xl bg-sky-50 p-4">
        <p className="text-sm text-slate-700">Your household per-capita daily usage</p>
        <p className="text-3xl font-black text-sky-900">{usage} L/day</p>
        <p className="text-sm text-slate-700">City average: {cityAverage} L/day</p>
        <p className={`text-sm font-semibold ${delta <= 0 ? "text-emerald-700" : "text-amber-700"}`}>
          {delta <= 0 ? `${Math.abs(delta)}% below average` : `${delta}% above average`}
        </p>
      </div>
    </Card>
  );
}
