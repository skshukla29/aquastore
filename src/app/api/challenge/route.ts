import { NextResponse } from "next/server";
import { droughtChallenge } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: droughtChallenge });
}
