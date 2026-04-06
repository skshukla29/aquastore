import { ContactForm } from "@/components/contact-form";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <ContactForm />

        <Card title="Contact details" subtitle="Prototype support and collaboration info.">
          <div className="space-y-3 text-sm text-slate-700">
            <p>Use the form to submit a message with validation and a real API response.</p>
            <p>For a production version, wire this route to your email provider or CRM.</p>
            <p>All functionality currently runs entirely inside the Next.js app on Vercel.</p>
          </div>
        </Card>
      </div>
    </main>
  );
}