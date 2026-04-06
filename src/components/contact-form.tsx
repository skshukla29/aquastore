"use client";

import { useState } from "react";
import { Mail, MessageSquareText, User, CheckCircle, AlertCircle } from "lucide-react";
import { contactSchema } from "@/lib/prototype-auth";
import { Card } from "@/components/ui/card";

export function ContactForm() {
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
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form fields.");
      setPending(false);
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error ?? "Could not send message.");
    } else {
      setMessage(json.message ?? "Message sent successfully.");
      event.currentTarget.reset();
    }

    setPending(false);
  };

  return (
    <Card title="Contact" subtitle="Send a message and receive a real success or error response.">
      <form className="grid gap-3" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          <span className="inline-flex items-center gap-2"><User className="h-4 w-4" /> Name</span>
          <input className="transition-colors-smooth rounded-2xl border border-slate-200 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200" name="name" required minLength={2} />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Email</span>
          <input className="transition-colors-smooth rounded-2xl border border-slate-200 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200" type="email" name="email" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          <span className="inline-flex items-center gap-2"><MessageSquareText className="h-4 w-4" /> Message</span>
          <textarea className="transition-colors-smooth min-h-36 rounded-2xl border border-slate-200 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200" name="message" required minLength={10} />
        </label>
        <button
          disabled={pending}
          className="hover-lift rounded-2xl bg-sky-900 px-4 py-3 font-semibold text-white transition-all hover:bg-sky-800 disabled:opacity-60"
        >
          {pending ? "Sending..." : "Send Message"}
        </button>
      </form>

      {message && (
        <div className="animate-slide-in-up mt-4 flex gap-3 rounded-2xl bg-emerald-50 px-4 py-3">
          <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-sm font-semibold text-emerald-700">{message}</p>
        </div>
      )}
      {error && (
        <div className="animate-slide-in-up mt-4 flex gap-3 rounded-2xl bg-rose-50 px-4 py-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <p className="text-sm font-semibold text-rose-700">{error}</p>
        </div>
      )}
    </Card>
  );
}
