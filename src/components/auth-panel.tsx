"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LogIn, UserPlus } from "lucide-react";
import { loginSchema, signupSchema } from "@/lib/prototype-auth";
import { readStoredUsers, saveSession, writeStoredUsers } from "@/lib/client-session";
import { Card } from "@/components/ui/card";

export function AuthPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      if (mode === "signup") {
        const parsed = signupSchema.safeParse(payload);
        if (!parsed.success) {
          throw new Error(parsed.error.issues[0]?.message ?? "Invalid signup data.");
        }

        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.error ?? "Signup failed.");

        const users = readStoredUsers();
        if (!users.some((user) => user.email === parsed.data.email)) {
          users.push(parsed.data);
          writeStoredUsers(users);
        }

        saveSession({ name: parsed.data.name, email: parsed.data.email });
        setMessage("Account created. You are now logged in.");
        router.refresh();
        return;
      }

      const parsed = loginSchema.safeParse(payload);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "Invalid login data.");
      }

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Invalid credentials.");

      const users = readStoredUsers();
      const account = users.find(
        (user) => user.email === parsed.data.email && user.password === parsed.data.password,
      );
      const demoAccount = json.user as { name: string; email: string } | undefined;

      if (account) {
        saveSession({ name: account.name, email: account.email });
      } else if (demoAccount) {
        saveSession({ name: demoAccount.name, email: demoAccount.email });
      } else {
        throw new Error("Invalid credentials.");
      }

      setMessage("Welcome back. Session stored locally.");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  };

  return (
    <Card
      title={mode === "login" ? "Login" : "Sign up"}
      subtitle="Session is stored in localStorage for a Vercel-only prototype."
      className="h-full"
    >
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "login" ? "bg-sky-900 text-white" : "bg-slate-100 text-slate-700"}`}
          onClick={() => setMode("login")}
        >
          <LogIn className="mr-2 inline h-4 w-4" />
          Login
        </button>
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "signup" ? "bg-sky-900 text-white" : "bg-slate-100 text-slate-700"}`}
          onClick={() => setMode("signup")}
        >
          <UserPlus className="mr-2 inline h-4 w-4" />
          Signup
        </button>
      </div>

      <form className="grid gap-3" onSubmit={onSubmit}>
        {mode === "signup" && (
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3"
            name="name"
            placeholder="Name"
            required
            minLength={2}
          />
        )}
        <input
          className="rounded-2xl border border-slate-200 px-4 py-3"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="rounded-2xl border border-slate-200 px-4 py-3"
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
        />
        <button
          disabled={pending}
          className="rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {pending ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      {message && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          {message}
        </p>
      )}
      {error && (
        <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
          {error}
        </p>
      )}
    </Card>
  );
}
