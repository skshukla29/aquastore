"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, Award, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";

const AnalyticsChart = dynamic(
  () => import("../../components/analytics-chart").then((m) => m.AnalyticsChart),
  { ssr: false }
);

export default function AnalyticsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/dashboard"
          className="hover-lift rounded-full bg-slate-100 p-2 text-slate-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600">Track your water usage and impact</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Saved" subtitle="This month">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-sky-600">4,250</span>
            <span className="text-sm text-slate-600">L</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-green-600 text-sm font-semibold">
            <TrendingUp className="h-4 w-4" />
            +12% from last month
          </div>
        </Card>

        <Card title="Daily Average" subtitle="Usage per day">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-600">145</span>
            <span className="text-sm text-slate-600">L</span>
          </div>
          <div className="mt-2 text-sm text-slate-600">Target: 120L/day</div>
        </Card>

        <Card title="Efficiency Score" subtitle="vs. region average">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">94</span>
            <span className="text-sm text-slate-600">/100</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-green-600 text-sm font-semibold">
            <Award className="h-4 w-4" />
            Excellent
          </div>
        </Card>

        <Card title="CO₂ Prevented" subtitle="Carbon footprint impact">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-600">12.8</span>
            <span className="text-sm text-slate-600">kg</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-green-600 text-sm font-semibold">
            <Zap className="h-4 w-4" />
            Saving the planet
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="Usage Trend" subtitle="Last 30 days">
            <AnalyticsChart />
          </Card>
        </div>

        <div>
          <Card title="Usage by Category" subtitle="This month breakdown">
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Toilets</p>
                  <p className="text-sm font-bold text-slate-900">32%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-8/12 bg-sky-500" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Showers</p>
                  <p className="text-sm font-bold text-slate-900">28%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-7/12 bg-cyan-500" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Washing</p>
                  <p className="text-sm font-bold text-slate-900">22%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-5/12 bg-emerald-500" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Other</p>
                  <p className="text-sm font-bold text-slate-900">18%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-4/12 bg-purple-500" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Insights" subtitle="Recent observations">
          <div className="space-y-3">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="font-semibold text-blue-900">Peak usage: Wed-Fri</p>
              <p className="text-sm text-blue-700">Your usage tends to be highest mid-week.</p>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="font-semibold text-green-900">Good progress!</p>
              <p className="text-sm text-green-700">You have reduced usage by 8% this month.</p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="font-semibold text-amber-900">Alert: Leakage detected</p>
              <p className="text-sm text-amber-700">Unusual spike on Oct 15. Check for leaks.</p>
            </div>
          </div>
        </Card>

        <Card title="Recommendations" subtitle="How to save more water">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 font-bold text-sky-700">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">Install low-flow showerheads</p>
                <p className="text-xs text-slate-600">Save up to 40% on shower water</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 font-bold text-cyan-700">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">Fix leaking toilets</p>
                <p className="text-xs text-slate-600">A single leak wastes thousands of liters/year</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">Run full loads only</p>
                <p className="text-xs text-slate-600">Wait for dishwasher and washing machine to be full</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
