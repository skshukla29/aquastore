import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}

export function Card({ title, subtitle, className, children }: CardProps) {
  return (
    <section
      className={clsx(
        "rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_10px_35px_rgba(1,78,121,0.08)] backdrop-blur-sm",
        className,
      )}
    >
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h3 className="text-lg font-bold text-sky-900">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
