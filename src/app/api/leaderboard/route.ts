import { NextResponse } from "next/server";
import { households } from "@/lib/mock-data";
import { toLeaderboard } from "@/lib/scoring";
import { hasSupabaseConfig, supabase } from "@/lib/supabase";

export async function GET() {
  if (hasSupabaseConfig && supabase) {
    const { data, error } = await supabase
      .from("households")
      .select("id, name, community_id, members, monthly_usage, baseline_monthly_average, city_average_per_capita, is_public")
      .eq("community_id", "c1");

    if (!error && data && data.length > 0) {
      const normalized = data.map((row) => ({
        id: row.id,
        name: row.name,
        communityId: row.community_id,
        members: row.members,
        monthlyUsage: row.monthly_usage,
        baselineMonthlyAverage: row.baseline_monthly_average,
        cityAveragePerCapita: row.city_average_per_capita,
        isPublic: row.is_public,
      }));

      return NextResponse.json({ source: "supabase", data: toLeaderboard(normalized) });
    }
  }

  return NextResponse.json({ source: "mock", data: toLeaderboard(households) });
}
