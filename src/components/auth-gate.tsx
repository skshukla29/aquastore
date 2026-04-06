"use client";

import { useState, useSyncExternalStore } from "react";
import { Mail, UserRound } from "lucide-react";

interface AuthGateProps {
  children: React.ReactNode;
}

const STORAGE_KEY = "aquascore_user";

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const getSnapshot = () => window.localStorage.getItem(STORAGE_KEY);

const getServerSnapshot = () => null;

export function AuthGate({ children }: AuthGateProps) {
  const user = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [email, setEmail] = useState("");

  const login = (value: string) => {
    const normalized = value.trim();
    if (!normalized) return;
    window.localStorage.setItem(STORAGE_KEY, normalized);
    window.dispatchEvent(new Event("storage"));
  };

  if (user) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-14">
      <div className="rounded-3xl border border-white/70 bg-white/85 p-7 shadow-[0_12px_36px_rgba(12,74,110,0.14)] backdrop-blur-sm">
        <p className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
          <UserRound className="h-3.5 w-3.5" />
          AquaScore Login
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-sky-950">
          Start your water-saving journey
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Use email login now. Google login can be enabled by plugging in your auth provider keys.
        </p>

        <label className="mt-6 block text-sm font-semibold text-slate-700">Email</label>
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-sky-100 bg-white px-3">
          <Mail className="h-4 w-4 text-slate-400" />
          <input
            className="h-11 w-full bg-transparent text-sm outline-none"
            placeholder="home@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            className="rounded-2xl bg-sky-700 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-800"
            onClick={() => login(email)}
          >
            Continue with Email
          </button>
          <button
            className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-800 hover:bg-sky-100"
            onClick={() => login("google-user@aquascore.app")}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
