import clsx from "clsx";
import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { LeaderboardRow } from "@/types/aqua";

interface LeaderboardProps {
  rows: LeaderboardRow[];
  silentObserver: boolean;
}

export function Leaderboard({ rows, silentObserver }: LeaderboardProps) {
  return (
    <Card
      title="AquaScore Leaderboard"
      subtitle="Community ranking based on efficiency, consistency, and improvement"
      className="lg:col-span-2"
    >
      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.householdId}
            className={clsx(
              "grid grid-cols-[42px_1fr_72px_86px] items-center gap-3 rounded-2xl px-3 py-3",
              row.rank === 1
                ? "bg-gradient-to-r from-emerald-100 via-cyan-100 to-sky-100"
                : "bg-slate-50",
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-900 text-sm font-bold text-white">
              {row.rank}
            </div>
            <div>
              <p className="font-semibold text-sky-950">
                {silentObserver ? `Household ${row.rank}` : row.householdName}
              </p>
              <p className="text-xs text-slate-600">Tier: {row.tier}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-500">Score</p>
              <p className="text-xl font-black text-emerald-700">{row.score}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-500">Weekly</p>
              <p className="inline-flex items-center justify-end gap-1 text-sm font-bold text-emerald-700">
                <Trophy className="h-3.5 w-3.5" />
                {row.weeklyChange >= 0 ? "+" : ""}
                {row.weeklyChange}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
