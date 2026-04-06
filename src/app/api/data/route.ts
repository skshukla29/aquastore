import { NextResponse } from "next/server";
import { featureStats, initialTasks, landingHighlights } from "@/lib/prototype-data";
import { households, monthlyTrend, weeklyMissions } from "@/lib/mock-data";
import { toLeaderboard } from "@/lib/scoring";

export async function GET() {
  return NextResponse.json({
    mainContent: {
      title: "AquaScore dashboard",
      description: "Track household water use, compare against community data, and act on savings tasks.",
    },
    stats: featureStats,
    highlights: landingHighlights,
    leaderboard: toLeaderboard(households).slice(0, 5),
    trend: monthlyTrend,
    missions: weeklyMissions,
    tasks: initialTasks,
  });
}
