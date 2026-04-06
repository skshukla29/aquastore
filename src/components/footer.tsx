import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>Built as a Vercel-only Next.js prototype with serverless routes and local session storage.</p>
        <div className="flex gap-4">
          <Link href="/about" className="font-semibold text-sky-900 hover:underline">
            About
          </Link>
          <Link href="/contact" className="font-semibold text-sky-900 hover:underline">
            Contact
          </Link>
          <Link href="/dashboard" className="font-semibold text-sky-900 hover:underline">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
