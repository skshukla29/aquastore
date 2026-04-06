"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, Users, MessageSquare, Activity, TrendingUp, BarChart3, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSession } from "@/lib/client-session";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalMessages: number;
  monthlySignups: number;
  averageWaterUsage: number;
  communityEngagement: number;
}

export default function AdminPage() {
  const user = useSession();
  const stats: AdminStats = {
    totalUsers: 1248,
    activeUsers: 832,
    totalMessages: 3420,
    monthlySignups: 156,
    averageWaterUsage: 142,
    communityEngagement: 78,
  };

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 rounded-lg bg-slate-200" />
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="h-32 rounded-lg bg-slate-200" />
            <div className="h-32 rounded-lg bg-slate-200" />
            <div className="h-32 rounded-lg bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="hover-lift rounded-full bg-slate-100 p-2 text-slate-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600">Monitor platform health and user activity</p>
          </div>
        </div>
        <div className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          ✓ System Online
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Total Users" subtitle="All time">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-sky-600">{stats.totalUsers}</span>
            </div>
            <Users className="h-8 w-8 text-sky-200" />
          </div>
          <p className="mt-2 text-sm text-slate-600">{stats.activeUsers} active this month</p>
        </Card>

        <Card title="Contact Messages" subtitle="Total received">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-cyan-600">{stats.totalMessages}</span>
            </div>
            <MessageSquare className="h-8 w-8 text-cyan-200" />
          </div>
          <p className="mt-2 text-sm text-slate-600">Response rate: 98%</p>
        </Card>

        <Card title="Monthly Signups" subtitle="This month">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-600">{stats.monthlySignups}</span>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-200" />
          </div>
          <p className="mt-2 text-sm text-slate-600">+12% from last month</p>
        </Card>

        <Card title="Avg Water Usage" subtitle="Community average">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-purple-600">{stats.averageWaterUsage}</span>
              <span className="text-sm text-slate-600">L/day</span>
            </div>
            <Activity className="h-8 w-8 text-purple-200" />
          </div>
          <p className="mt-2 text-sm text-slate-600">Target: 120L/day</p>
        </Card>

        <Card title="Engagement Score" subtitle="Community health">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-pink-600">{stats.communityEngagement}%</span>
            </div>
            <BarChart3 className="h-8 w-8 text-pink-200" />
          </div>
          <p className="mt-2 text-sm text-slate-600">Excellent community participation</p>
        </Card>

        <Card title="System Health" subtitle="All systems operational">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">API Response Time</p>
              <p className="text-sm font-bold text-emerald-600">45ms</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Database Status</p>
              <p className="text-sm font-bold text-emerald-600">✓ Online</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Uptime</p>
              <p className="text-sm font-bold text-emerald-600">99.9%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Recent Activity" subtitle="Latest user actions">
          <div className="space-y-3">
            <div className="flex items-start justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">New user registration</p>
                <p className="text-xs text-slate-600">@john_doe joined the community</p>
              </div>
              <span className="text-xs font-bold text-slate-500">2m ago</span>
            </div>
            <div className="flex items-start justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">Contact form submission</p>
                <p className="text-xs text-slate-600">Message from sarah@example.com</p>
              </div>
              <span className="text-xs font-bold text-slate-500">5m ago</span>
            </div>
            <div className="flex items-start justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">Leaderboard update</p>
                <p className="text-xs text-slate-600">Rankings recalculated</p>
              </div>
              <span className="text-xs font-bold text-slate-500">13m ago</span>
            </div>
          </div>
        </Card>

        <Card title="Alerts & Notices" subtitle="System notifications">
          <div className="space-y-3">
            <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="font-semibold text-amber-900">High water usage alert</p>
                <p className="text-xs text-amber-700">5 users exceeded weekly limits</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900">Scheduled maintenance</p>
                <p className="text-xs text-blue-700">Database backup completed successfully</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">Milestone reached</p>
                <p className="text-xs text-green-700">Community saved 1 million liters!</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
