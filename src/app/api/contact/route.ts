import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/prototype-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  return NextResponse.json({
    message: `Thanks ${parsed.data.name}. We received your message and will reply to ${parsed.data.email}.`,
  });
}
