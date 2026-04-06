import { NextRequest, NextResponse } from "next/server";
import { createWorker } from "tesseract.js";
import { PDFParse } from "pdf-parse";
import { extractByRegex, extractWithOpenAI, inferAnalysis } from "@/lib/bill-analysis";

const generateSavingPlan = (dailyUsage: number, comparisonPercent: number) => {
  const targetDaily = Math.max(70, Math.round(dailyUsage * 0.9));

  return [
    `Set a household target of ${targetDaily} liters/day for the next 7 days.`,
    "Track shower duration and cap it to 6 minutes per person.",
    "Run dishwasher/washing machine only on full loads.",
    comparisonPercent > 0
      ? "You are above city average. Focus first on bathroom fixtures and leaks."
      : "You are below city average. Keep consistency and optimize laundry cycles.",
  ];
};

const extractTextFromImage = async (buffer: Buffer) => {
  const worker = await createWorker("eng");
  const {
    data: { text },
  } = await worker.recognize(buffer);
  await worker.terminate();
  return text;
};

const extractTextFromPdf = async (buffer: Buffer) => {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const parsed = await parser.getText();
    return parsed.text;
  } finally {
    await parser.destroy();
  }
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const billFile = formData.get("bill");
  const cityAverageDaily = Number(formData.get("cityAverageDaily") ?? 150);

  if (!(billFile instanceof File)) {
    return NextResponse.json({ error: "No bill file was uploaded." }, { status: 400 });
  }

  const arrayBuffer = await billFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimeType = billFile.type;

  let extractedText = "";

  try {
    if (mimeType.includes("pdf")) {
      extractedText = await extractTextFromPdf(buffer);
    } else {
      extractedText = await extractTextFromImage(buffer);
    }
  } catch {
    extractedText = "";
  }

  const regexExtraction = extractByRegex(extractedText);
  const llmExtraction = await extractWithOpenAI(extractedText);

  const mergedExtraction = llmExtraction
    ? {
        totalConsumptionLiters: llmExtraction.totalConsumptionLiters,
        billingPeriodDays: llmExtraction.billingPeriodDays,
        totalCost: llmExtraction.totalCost,
        currency: llmExtraction.currency,
      }
    : regexExtraction;

  const analysis = inferAnalysis(
    mergedExtraction,
    cityAverageDaily,
    llmExtraction?.savingTips,
  );

  return NextResponse.json({
    data: {
      ...analysis,
      extractedTextPreview: extractedText.slice(0, 600),
      savingPlan: generateSavingPlan(
        analysis.dailyUsageEstimate,
        analysis.cityAverageComparisonPercent,
      ),
    },
  });
}
