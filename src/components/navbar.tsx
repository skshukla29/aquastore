"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Droplets, LogOut, User } from "lucide-react";
import { saveSession, useSession } from "@/lib/client-session";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/contact", label: "Contact" },
];

const dashboardLinks = [
  { href: "/analytics", label: "Analytics", icon: "📊" },
  { href: "/admin", label: "Admin", icon: "⚙️" },
];
export function Navbar() {
  const pathname = usePathname();
  const session = useSession();

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-black text-sky-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-br from-sky-600 to-emerald-500 text-white">
            <Droplets className="h-5 w-5" />
          </span>
          AquaScore
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                pathname === link.href
                  ? "bg-sky-900 text-white"
                  : "text-slate-700 hover:bg-sky-50 hover:text-sky-900",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden text-right text-xs text-slate-500 sm:block">
            {session ? (
              <>
                <p className="font-semibold text-slate-800">{session.name}</p>
                <p>Logged in</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-slate-800">Guest</p>
                <p>Logged out</p>
              </>
            )}
          </div>
          {session ? (
            <>
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-100"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
            <div className="flex gap-2">
              {dashboardLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {link.icon} {link.label}
                </Link>
              ))}
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-100"
              onClick={() => saveSession(null)}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
            </>
          ) : (
            <Link
              href="/contact"
              className="rounded-full bg-sky-900 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-3 md:hidden sm:px-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition",
              pathname === link.href
                ? "bg-sky-900 text-white"
                : "bg-slate-50 text-slate-700 hover:bg-sky-50",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
