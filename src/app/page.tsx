import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { AuthPanel } from "@/components/auth-panel";
import { Card } from "@/components/ui/card";
import { featureStats, landingHighlights } from "@/lib/prototype-data";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-4xl border border-white/70 bg-linear-to-br from-sky-600 via-cyan-500 to-emerald-500 p-8 text-white shadow-[0_24px_70px_rgba(14,165,233,0.22)]">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
            <Sparkles className="h-3.5 w-3.5" /> Vercel-only prototype
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
            A full working website with real login, contact, and data flows.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-cyan-50 sm:text-lg">
            AquaScore is a clean Next.js prototype that runs entirely on Vercel using
            serverless API routes plus browser storage for sessions and CRUD interactions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-sky-900 hover:bg-cyan-50"
            >
              Open Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white hover:bg-white/10"
            >
              Contact Us <ShieldCheck className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {featureStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-50">{stat.label}</p>
                <p className="mt-2 text-2xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <AuthPanel />
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {landingHighlights.map((item) => (
          <Card key={item.title} title={item.title}>
            <p className="text-sm text-slate-600">{item.description}</p>
          </Card>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card title="What works right now" subtitle="Prototype flows are real, not placeholders.">
          <ul className="space-y-3 text-sm text-slate-700">
            <li>Login and signup store a local session in the browser.</li>
            <li>Contact form validates input and returns a real API response.</li>
            <li>Dashboard CRUD stores tasks in localStorage.</li>
            <li>API routes provide serverless data, auth, and contact handling.</li>
          </ul>
        </Card>

        <Card title="Deployment" subtitle="Ready for Vercel without a separate backend.">
          <p className="text-sm text-slate-700">
            Use the App Router, route handlers, and browser storage to keep the whole project
            self-contained for Vercel deployment.
          </p>
        </Card>
      </section>
    </main>
  );
}
