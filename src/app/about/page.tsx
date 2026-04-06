import { Card } from "@/components/ui/card";

const steps = [
  "Home page explains the product and shows the login/sign-up entry point.",
  "Dashboard exposes a real localStorage-backed action board and content widgets.",
  "Serverless API routes validate login, signup, contact, and data requests.",
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <Card title="About AquaScore" subtitle="A simple prototype that feels like a real product.">
        <p className="text-sm leading-7 text-slate-700">
          AquaScore is built as a Vercel-only Next.js prototype. It demonstrates the full
          website lifecycle: landing pages, responsive navigation, authenticated state,
          working forms, and serverless routes that return real responses.
        </p>
      </Card>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={step} title={`Step ${index + 1}`}>
            <p className="text-sm text-slate-700">{step}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}