import { Card } from "@/components/ui/card";

interface AquaKidsProps {
  usageDeltaPercent: number;
  missions: string[];
}

export function AquaKids({ usageDeltaPercent, missions }: AquaKidsProps) {
  const riverHeight = usageDeltaPercent <= 0 ? 72 : Math.max(20, 60 - usageDeltaPercent * 2);

  return (
    <Card title="AquaKids" subtitle="Playful water awareness for families">
      <div className="rounded-2xl bg-linear-to-b from-sky-100 to-emerald-100 p-4">
        <div className="relative h-24 overflow-hidden rounded-xl bg-white/60">
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-linear-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-500"
            style={{ height: `${riverHeight}%` }}
          />
          <p className="absolute left-3 top-2 text-xs font-semibold text-sky-900">
            River Health: {usageDeltaPercent <= 0 ? "Growing" : "Shrinking"}
          </p>
        </div>
        <ul className="mt-4 space-y-2">
          {missions.map((mission) => (
            <li
              key={mission}
              className="rounded-xl bg-white/70 px-3 py-2 text-sm text-slate-700"
            >
              {mission}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
