import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/prototype-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  return NextResponse.json({
    message: "Signup successful.",
    user: { name: parsed.data.name, email: parsed.data.email },
    token: "demo-session-token",
  });
}
