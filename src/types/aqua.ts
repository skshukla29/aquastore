export type RankTier = "Bronze" | "Silver" | "Gold" | "Green Elite";

export interface Household {
  id: string;
  name: string;
  communityId: string;
  members: number;
  monthlyUsage: number[];
  baselineMonthlyAverage: number;
  cityAveragePerCapita: number;
  isPublic: boolean;
}

export interface LeaderboardRow {
  householdId: string;
  householdName: string;
  score: number;
  rank: number;
  weeklyChange: number;
  tier: RankTier;
  usagePerCapita: number;
}

export interface BillExtraction {
  totalConsumptionLiters: number;
  billingPeriodDays: number;
  totalCost: number;
  currency: string;
}

export interface BillAnalysisResult extends BillExtraction {
  dailyUsageEstimate: number;
  cityAverageComparisonPercent: number;
  usageBreakdown: {
    bathroom: number;
    kitchen: number;
    laundry: number;
    cleaning: number;
    other: number;
  };
  savingTips: string[];
}

export interface DroughtChallenge {
  title: string;
  targetReductionPercent: number;
  currentReductionPercent: number;
  householdsJoined: number;
}
