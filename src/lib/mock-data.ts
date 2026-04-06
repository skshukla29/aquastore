import type { DroughtChallenge, Household } from "@/types/aqua";

export const communities = [
  { id: "c1", name: "Blue Haven Residency", city: "Pune" },
  { id: "c2", name: "Green Court Apartments", city: "Bengaluru" },
];

export const households: Household[] = [
  {
    id: "h1",
    name: "Agarwal Family",
    communityId: "c1",
    members: 4,
    monthlyUsage: [17700, 16600, 15240, 14980],
    baselineMonthlyAverage: 17800,
    cityAveragePerCapita: 150,
    isPublic: true,
  },
  {
    id: "h2",
    name: "Flat B-304",
    communityId: "c1",
    members: 3,
    monthlyUsage: [15000, 14750, 14540, 14320],
    baselineMonthlyAverage: 15300,
    cityAveragePerCapita: 150,
    isPublic: false,
  },
  {
    id: "h3",
    name: "Sharma Home",
    communityId: "c1",
    members: 5,
    monthlyUsage: [21100, 20510, 19820, 19000],
    baselineMonthlyAverage: 21400,
    cityAveragePerCapita: 150,
    isPublic: true,
  },
  {
    id: "h4",
    name: "The Iyers",
    communityId: "c1",
    members: 2,
    monthlyUsage: [10120, 9720, 9400, 9210],
    baselineMonthlyAverage: 10300,
    cityAveragePerCapita: 150,
    isPublic: true,
  },
  {
    id: "h5",
    name: "Mehta Residence",
    communityId: "c1",
    members: 4,
    monthlyUsage: [18240, 18020, 17680, 17000],
    baselineMonthlyAverage: 18350,
    cityAveragePerCapita: 150,
    isPublic: false,
  },
  {
    id: "h6",
    name: "Fernandez Family",
    communityId: "c1",
    members: 4,
    monthlyUsage: [17300, 17120, 16450, 15840],
    baselineMonthlyAverage: 17600,
    cityAveragePerCapita: 150,
    isPublic: true,
  },
];

export const droughtChallenge: DroughtChallenge = {
  title: "Reduce 10% usage this week",
  targetReductionPercent: 10,
  currentReductionPercent: 6.3,
  householdsJoined: 38,
};

export const monthlyTrend = [
  { month: "Jan", usage: 17300, average: 18200 },
  { month: "Feb", usage: 16950, average: 18200 },
  { month: "Mar", usage: 16120, average: 18200 },
  { month: "Apr", usage: 15640, average: 18200 },
  { month: "May", usage: 15120, average: 18200 },
  { month: "Jun", usage: 14980, average: 18200 },
];

export const weeklyMissions = [
  "Take 2-minute shorter showers this week",
  "Run washing machine only with full loads",
  "Reuse RO reject water for floor cleaning",
];
