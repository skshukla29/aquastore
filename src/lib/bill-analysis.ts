import OpenAI from "openai";
import { z } from "zod";
import { usageBreakdownFromDaily } from "@/lib/scoring";
import type { BillAnalysisResult } from "@/types/aqua";

const extractionSchema = z.object({
  totalConsumptionLiters: z.number().nonnegative(),
  billingPeriodDays: z.number().int().positive(),
  totalCost: z.number().nonnegative(),
  currency: z.string().default("INR"),
  savingTips: z.array(z.string()).min(3).max(6),
});

const numberFromText = (text: string, regex: RegExp, fallback: number) => {
  const match = text.match(regex);
  if (!match?.[1]) return fallback;
  const parsed = Number(match[1].replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const extractByRegex = (text: string) => {
  const totalConsumptionLiters = numberFromText(
    text,
    /(consumption|units|liters|litres)[^\d]*(\d[\d,]*\.?\d*)/i,
    14500,
  );
  const billingPeriodDays = numberFromText(text, /(period|days)[^\d]*(\d{1,3})/i, 30);
  const totalCost = numberFromText(text, /(amount|total|bill|cost)[^\d]*(\d[\d,]*\.?\d*)/i, 1850);

  return {
    totalConsumptionLiters,
    billingPeriodDays,
    totalCost,
    currency: "INR",
  };
};

export const inferAnalysis = (
  extraction: {
    totalConsumptionLiters: number;
    billingPeriodDays: number;
    totalCost: number;
    currency: string;
  },
  cityAverageDaily = 150,
  llmTips?: string[],
): BillAnalysisResult => {
  const dailyUsageEstimate = Math.round(
    extraction.totalConsumptionLiters / Math.max(1, extraction.billingPeriodDays),
  );

  const cityAverageComparisonPercent = Math.round(
    ((dailyUsageEstimate - cityAverageDaily) / Math.max(1, cityAverageDaily)) * 100,
  );

  return {
    ...extraction,
    dailyUsageEstimate,
    cityAverageComparisonPercent,
    usageBreakdown: usageBreakdownFromDaily(dailyUsageEstimate),
    savingTips:
      llmTips && llmTips.length > 0
        ? llmTips
        : [
            "Fix dripping taps quickly and save up to 15 liters/day.",
            "Install low-flow shower heads to reduce bathroom consumption.",
            "Reuse RO reject water for cleaning and gardening.",
          ],
  };
};

export const extractWithOpenAI = async (
  rawText: string,
): Promise<z.infer<typeof extractionSchema> | null> => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content:
          "Extract utility bill data. Return valid JSON only with numeric values in liters, days, and bill currency values.",
      },
      {
        role: "user",
        content: `Water bill text:\n${rawText}`,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "bill_extraction",
        schema: {
          type: "object",
          properties: {
            totalConsumptionLiters: { type: "number" },
            billingPeriodDays: { type: "number" },
            totalCost: { type: "number" },
            currency: { type: "string" },
            savingTips: {
              type: "array",
              items: { type: "string" },
              minItems: 3,
              maxItems: 6,
            },
          },
          required: [
            "totalConsumptionLiters",
            "billingPeriodDays",
            "totalCost",
            "currency",
            "savingTips",
          ],
          additionalProperties: false,
        },
      },
    },
  });

  const maybeJson = response.output_text;
  if (!maybeJson) return null;

  try {
    const parsed = JSON.parse(maybeJson);
    return extractionSchema.parse(parsed);
  } catch {
    return null;
  }
};
