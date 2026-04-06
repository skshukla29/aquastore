import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="rounded-4xl border border-white/70 bg-white/85 p-10 shadow-[0_18px_50px_rgba(14,165,233,0.12)]">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-700">404</p>
        <h1 className="mt-3 text-3xl font-black text-sky-950">Page not found</h1>
        <p className="mt-3 text-sm text-slate-600">
          The page you tried to open does not exist. Return home or open the dashboard.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="rounded-full bg-sky-900 px-5 py-3 font-semibold text-white">
            Go Home
          </Link>
          <Link href="/dashboard" className="rounded-full bg-slate-100 px-5 py-3 font-semibold text-slate-800">
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}