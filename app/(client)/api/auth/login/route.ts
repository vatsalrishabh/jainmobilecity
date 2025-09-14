// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
    const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
