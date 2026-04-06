"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { saveSession } from "@/lib/client-session";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Settings,
  LogOut,
  Award,
  TrendingDown,
  Calendar,
  Lock,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSession } from "@/lib/client-session";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  joinDate: string;
  waterSaved: number;
  ranking: number;
  streakDays: number;
  totalMissions: number;
  bio?: string;
}

const DEFAULT_JOIN_DATE = "2026-03-07T00:00:00.000Z";

export default function ProfilePage() {
  const user = useSession();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  const profile = useMemo<UserProfile | null>(() => {
    if (!user) {
      return null;
    }

    return {
      id: btoa(user.email),
      name: user.name,
      email: user.email,
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      joinDate: DEFAULT_JOIN_DATE,
      waterSaved: 4250,
      ranking: 7,
      streakDays: 23,
      totalMissions: 18,
      bio: "Passionate about water conservation and sustainable living.",
    };
  }, [user]);

  const handleLogout = () => {
    saveSession(null);
    window.location.href = "/";
  };

  if (!profile) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 rounded-lg bg-slate-200" />
          <div className="h-64 rounded-lg bg-slate-200" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
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
            <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
            <p className="text-slate-600">Manage your account and preferences</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-red-600 transition-colors hover:bg-red-100"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-white/60 bg-linear-to-br from-sky-50 via-cyan-50 to-emerald-50 p-8 shadow-lg">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
            <p className="text-slate-600">{profile.email}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="hover-lift rounded-lg bg-white px-4 py-2 text-slate-700 shadow-sm transition-all"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg bg-white/60 p-4">
            <Mail className="h-5 w-5 text-sky-600" />
            <div>
              <p className="text-xs font-semibold text-slate-600">EMAIL</p>
              <p className="font-semibold text-slate-900">{profile.email}</p>
            </div>
          </div>

          {profile.phone && (
            <div className="flex items-center gap-3 rounded-lg bg-white/60 p-4">
              <Phone className="h-5 w-5 text-cyan-600" />
              <div>
                <p className="text-xs font-semibold text-slate-600">PHONE</p>
                <p className="font-semibold text-slate-900">{profile.phone}</p>
              </div>
            </div>
          )}

          {profile.location && (
            <div className="flex items-center gap-3 rounded-lg bg-white/60 p-4">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-xs font-semibold text-slate-600">LOCATION</p>
                <p className="font-semibold text-slate-900">{profile.location}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 rounded-lg bg-white/60 p-4">
            <Calendar className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-xs font-semibold text-slate-600">JOINED</p>
              <p className="font-semibold text-slate-900">
                {new Date(profile.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {profile.bio && (
          <div className="mt-4 rounded-lg bg-white/60 p-4">
            <p className="text-xs font-semibold text-slate-600">BIO</p>
            <p className="mt-2 text-slate-700">{profile.bio}</p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Water Saved" subtitle="liters this month">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-sky-600">{profile.waterSaved}</span>
            <TrendingDown className="h-5 w-5 text-green-600" />
          </div>
        </Card>

        <Card title="Ranking" subtitle="community position">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-600">#{profile.ranking}</span>
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
        </Card>

        <Card title="Current Streak" subtitle="consecutive days">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">{profile.streakDays}</span>
            <span className="text-lg">🔥</span>
          </div>
        </Card>

        <Card title="Missions" subtitle="completed">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-600">{profile.totalMissions}</span>
            <span className="text-lg">✨</span>
          </div>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Privacy & Security" subtitle="Manage your account security">
          <div className="space-y-3">
            <button className="hover-scale flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:bg-white">
              <Lock className="h-5 w-5 text-slate-600" />
              <div>
                <p className="font-semibold text-slate-900">Change Password</p>
                <p className="text-xs text-slate-600">Update your password regularly</p>
              </div>
            </button>
            <button className="hover-scale flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:bg-white">
              <Lock className="h-5 w-5 text-slate-600" />
              <div>
                <p className="font-semibold text-slate-900">Two-Factor Authentication</p>
                <p className="text-xs text-slate-600">Enable two-factor security</p>
              </div>
            </button>
          </div>
        </Card>

        <Card title="Preferences" subtitle="Customize your experience">
          <div className="space-y-3">
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-white">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-slate-300 accent-sky-600"
              />
              <div>
                <p className="font-semibold text-slate-900">Email Notifications</p>
                <p className="text-xs text-slate-600">Receive weekly water usage reports</p>
              </div>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-white">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-slate-300 accent-sky-600"
              />
              <div>
                <p className="font-semibold text-slate-900">Community Updates</p>
                <p className="text-xs text-slate-600">Stay informed about leaderboard changes</p>
              </div>
            </label>
          </div>
        </Card>
      </div>
    </main>
  );
}
