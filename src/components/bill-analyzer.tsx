"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { BillAnalysisResult } from "@/types/aqua";

interface BillApiResponse {
  data: BillAnalysisResult & {
    savingPlan: string[];
    extractedTextPreview: string;
  };
}

export function BillAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BillApiResponse["data"] | null>(null);

  const onAnalyze = async () => {
    if (!file) {
      setError("Please upload a bill image or PDF first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("bill", file);
      formData.append("cityAverageDaily", "150");

      const res = await fetch("/api/bill-analysis", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Unable to analyze bill right now.");
      }

      const json: BillApiResponse = await res.json();
      setResult(json.data);
    } catch (analysisError) {
      const message =
        analysisError instanceof Error
          ? analysisError.message
          : "Unexpected error during analysis.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Water Bill AI Analysis"
      subtitle="Upload bill, extract insights, and generate a saving plan"
      className="lg:col-span-2"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50/70 p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-sky-800">
            <Upload className="h-4 w-4" /> Upload water bill (JPG, PNG, PDF)
          </p>
          <input
            type="file"
            accept="image/*,application/pdf"
            className="mt-3 block w-full text-sm"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
          {file && <p className="mt-2 text-xs text-slate-600">Selected: {file.name}</p>}
        </label>
        <button
          className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
          disabled={loading}
          onClick={onAnalyze}
        >
          {loading ? "Analyzing..." : "Generate Saving Plan"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm font-semibold text-rose-600">{error}</p>}

      {result && (
        <div className="mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-2">
          <div className="space-y-2 text-sm text-slate-700">
            <p>
              <strong>Total Consumption:</strong> {result.totalConsumptionLiters.toLocaleString()} L
            </p>
            <p>
              <strong>Billing Period:</strong> {result.billingPeriodDays} days
            </p>
            <p>
              <strong>Total Cost:</strong> {result.currency} {result.totalCost.toLocaleString()}
            </p>
            <p>
              <strong>Daily Estimate:</strong> {result.dailyUsageEstimate} L/day
            </p>
            <p>
              <strong>Comparison:</strong>{" "}
              {result.cityAverageComparisonPercent >= 0 ? "+" : ""}
              {result.cityAverageComparisonPercent}% vs city average
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-sky-900">Suggested Saving Plan</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {result.savingPlan.map((tip) => (
                <li key={tip} className="rounded-lg bg-white px-3 py-2">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
}
