"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Droplets, Eye, EyeOff, Medal } from "lucide-react";
import { households, monthlyTrend, weeklyMissions } from "@/lib/mock-data";
import { toLeaderboard } from "@/lib/scoring";
import type { DroughtChallenge, LeaderboardRow } from "@/types/aqua";
import { StatTile } from "@/components/stat-tile";
import { Leaderboard } from "@/components/leaderboard";
import { ComparisonCard } from "@/components/comparison-card";
import { DroughtChallengeCard } from "@/components/drought-challenge";
import { AquaKids } from "@/components/aquakids";
import { BillAnalyzer } from "@/components/bill-analyzer";
import { TaskBoard } from "@/components/task-board";
import { Card } from "@/components/ui/card";

const MonthlyTrend = dynamic(
  () => import("@/components/monthly-trend").then((module) => module.MonthlyTrend),
  { ssr: false },
);

export function Dashboard() {
  const [leaderboardRows, setLeaderboardRows] = useState<LeaderboardRow[]>(() =>
    toLeaderboard(households),
  );
  const [challenge, setChallenge] = useState<DroughtChallenge | null>(null);
  const [silentObserver, setSilentObserver] = useState(true);
  const [mainContent, setMainContent] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [leaderboardRes, challengeRes, dataRes] = await Promise.all([
          fetch("/api/leaderboard"),
          fetch("/api/challenge"),
          fetch("/api/data"),
        ]);

        if (leaderboardRes.ok) {
          const leaderboardJson = await leaderboardRes.json();
          setLeaderboardRows(leaderboardJson.data);
        }

        if (challengeRes.ok) {
          const challengeJson = await challengeRes.json();
          setChallenge(challengeJson.data);
        }

        if (dataRes.ok) {
          const dataJson = await dataRes.json();
          setMainContent(dataJson.mainContent);
        }
      } catch {
        // Keep mock values if request fails.
      }
    };

    load();
  }, []);

  const topRow = leaderboardRows[0];
  const currentUsagePerCapita = topRow?.usagePerCapita ?? 124;

  const monthlyUsage = useMemo(
    () => monthlyTrend[monthlyTrend.length - 1]?.usage ?? 0,
    [],
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6">
      <header className="relative overflow-hidden rounded-3xl border border-white/60 bg-[linear-gradient(130deg,#0ea5e9,#14b8a6,#22c55e)] p-6 text-white shadow-[0_18px_40px_rgba(4,120,87,0.25)]">
        <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-6 h-44 w-44 rounded-full bg-cyan-200/20 blur-2xl" />
        <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wide">
          <Droplets className="h-3.5 w-3.5" />
          AQUASCORE
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          Save water together. Make every drop count.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-cyan-50 sm:text-base">
          Track usage, benchmark against your community, and unlock better water habits
          through family-friendly missions.
        </p>
        {mainContent && (
          <p className="mt-3 max-w-2xl rounded-2xl bg-white/15 px-4 py-3 text-sm text-cyan-50">
            <strong>{mainContent.title}:</strong> {mainContent.description}
          </p>
        )}

        <button
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-800 hover:bg-sky-50"
          onClick={() => setSilentObserver((prev) => !prev)}
        >
          {silentObserver ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          {silentObserver ? "Silent Observer Mode: ON" : "Silent Observer Mode: OFF"}
        </button>
      </header>

      <Card
        className="mt-6"
        title="Workflow Phases"
        subtitle="The dashboard is grouped into simple working portions so the flow is easy to follow."
      >
        <div className="grid gap-3 md:grid-cols-5">
          {[
            "Phase 1: Snapshot",
            "Phase 2: Community",
            "Phase 3: Action Center",
            "Phase 4: Family Mode",
            "Phase 5: Guidance",
          ].map((phase) => (
            <div key={phase} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              {phase}
            </div>
          ))}
        </div>
      </Card>

      <section className="mt-6">
        <Card
          title="Phase 1: Snapshot"
          subtitle="The current numbers that tell the user what is happening right now."
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatTile label="Total Water Usage" value={`${monthlyUsage.toLocaleString()} L`} deltaLabel="8% lower than last month" />
            <StatTile label="Water Reputation Score" value={`${topRow?.score ?? 84}`} deltaLabel={`${topRow?.tier ?? "Gold"} Tier`} />
            <StatTile label="Community Rank" value={`#${topRow?.rank ?? 1}`} deltaLabel="Up 2 positions this week" />
            <StatTile label="City Comparison" value={`${currentUsagePerCapita} L/day`} deltaLabel="Below city average" />
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card
          title="Phase 2: Community"
          subtitle="Leaderboard and trend view for ranking and comparison."
        >
          <Leaderboard rows={leaderboardRows.slice(0, 6)} silentObserver={silentObserver} />
          <div className="mt-5">
            <MonthlyTrend points={monthlyTrend} />
          </div>
        </Card>

        <Card
          title="Phase 3: Action Center"
          subtitle="The working portion where users upload, update, and manage actions."
        >
          <div className="grid gap-5">
            <BillAnalyzer />
            <TaskBoard />
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card
          title="Phase 4: Family Mode"
          subtitle="Motivation and household engagement for everyday behavior change."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <ComparisonCard usage={currentUsagePerCapita} cityAverage={150} />
            <DroughtChallengeCard
              challenge={
                challenge ?? {
                  title: "Reduce 10% usage this week",
                  targetReductionPercent: 10,
                  currentReductionPercent: 6,
                  householdsJoined: 24,
                }
              }
            />
          </div>
          <div className="mt-4">
            <AquaKids usageDeltaPercent={-8} missions={weeklyMissions} />
          </div>
        </Card>

        <Card
          title="Phase 5: Guidance"
          subtitle="Small tips that keep the user moving after the main actions are done."
        >
          <h2 className="flex items-center gap-2 text-lg font-black text-sky-900">
            <Medal className="h-5 w-5 text-emerald-600" />
            Personalized Tips
          </h2>
          <div className="mt-3 grid gap-2 text-sm text-slate-700">
            <p className="rounded-xl bg-slate-50 px-3 py-2">Fix one leak this week for quick savings.</p>
            <p className="rounded-xl bg-slate-50 px-3 py-2">Install a tap aerator in kitchen and bathrooms.</p>
            <p className="rounded-xl bg-slate-50 px-3 py-2">Shift plant watering to early mornings.</p>
          </div>
        </Card>
      </section>
    </main>
  );
}
