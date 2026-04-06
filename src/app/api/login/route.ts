import { NextResponse } from "next/server";
import { loginSchema, demoUsers } from "@/lib/prototype-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  const user = demoUsers.find(
    (item) => item.email === parsed.data.email && item.password === parsed.data.password,
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  return NextResponse.json({
    message: "Login successful.",
    user: { name: user.name, email: user.email },
    token: "demo-session-token",
  });
}
