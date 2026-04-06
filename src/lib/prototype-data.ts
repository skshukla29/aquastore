import type { PrototypeTask } from "@/lib/prototype-types";

export const initialTasks: PrototypeTask[] = [
  {
    id: "task-1",
    title: "Replace a leaking faucet washer",
    note: "Small leak fixes often save the fastest.",
    completed: false,
    createdAt: "2026-04-01T10:00:00.000Z",
  },
  {
    id: "task-2",
    title: "Run one full-load laundry day",
    note: "Avoid partial loads to reduce water waste.",
    completed: true,
    createdAt: "2026-04-02T08:30:00.000Z",
  },
  {
    id: "task-3",
    title: "Shorten showers by 2 minutes",
    note: "Track one week and compare usage.",
    completed: false,
    createdAt: "2026-04-04T18:15:00.000Z",
  },
];

export const landingHighlights = [
  {
    title: "Clear purpose",
    description: "Introduce the product, the value, and what users can do next.",
  },
  {
    title: "Working flows",
    description: "Login, signup, contact, and data actions work end-to-end in one project.",
  },
  {
    title: "Deploy on Vercel",
    description: "Everything runs as Next.js serverless routes and browser storage.",
  },
];

export const featureStats = [
  { label: "Active households", value: "128" },
  { label: "Saved this week", value: "18%" },
  { label: "Open tasks", value: "42" },
];
