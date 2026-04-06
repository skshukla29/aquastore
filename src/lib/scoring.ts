import type { Household, LeaderboardRow, RankTier } from "@/types/aqua";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const getTierFromScore = (score: number): RankTier => {
  if (score >= 90) return "Green Elite";
  if (score >= 75) return "Gold";
  if (score >= 55) return "Silver";
  return "Bronze";
};

export const calculateAquaScore = (household: Household): number => {
  const current = household.monthlyUsage[household.monthlyUsage.length - 1] ?? 0;
  const previous = household.monthlyUsage[household.monthlyUsage.length - 2] ?? current;

  const perCapitaCurrent = current / Math.max(1, household.members) / 30;

  const efficiencyComponent = clamp(
    100 - (perCapitaCurrent / household.cityAveragePerCapita) * 100 + 45,
    0,
    100,
  );

  const consistencyDelta = Math.abs(current - previous) / Math.max(1, previous);
  const consistencyComponent = clamp(100 - consistencyDelta * 100, 0, 100);

  const improvementRatio = (household.baselineMonthlyAverage - current) / Math.max(1, household.baselineMonthlyAverage);
  const improvementComponent = clamp(50 + improvementRatio * 60, 0, 100);

  const weighted =
    efficiencyComponent * 0.45 + consistencyComponent * 0.2 + improvementComponent * 0.35;

  return Math.round(clamp(weighted, 0, 100));
};

export const toLeaderboard = (households: Household[]): LeaderboardRow[] => {
  const rows = households.map((household) => {
    const score = calculateAquaScore(household);
    const current = household.monthlyUsage[household.monthlyUsage.length - 1] ?? 0;
    const previous = household.monthlyUsage[household.monthlyUsage.length - 2] ?? current;
    const weeklyChange = Math.round(((previous - current) / Math.max(1, previous)) * 100);

    return {
      householdId: household.id,
      householdName: household.name,
      score,
      rank: 0,
      weeklyChange,
      tier: getTierFromScore(score),
      usagePerCapita: Math.round(current / Math.max(1, household.members) / 30),
    };
  });

  return rows
    .sort((a, b) => b.score - a.score)
    .map((row, index) => ({ ...row, rank: index + 1 }));
};

export const usageBreakdownFromDaily = (dailyUsage: number) => {
  return {
    bathroom: Math.round(dailyUsage * 0.42),
    kitchen: Math.round(dailyUsage * 0.21),
    laundry: Math.round(dailyUsage * 0.18),
    cleaning: Math.round(dailyUsage * 0.12),
    other: Math.round(dailyUsage * 0.07),
  };
};
