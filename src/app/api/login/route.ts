import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/auth.service";
import { loginSchema } from "@/schemas/auth.schema";
import { LoginPayload } from "@/types/auth.types";

export async function POST(req: NextRequest) {
  try {
    const body: LoginPayload = await req.json();
    const data = loginSchema.parse(body);

    const result = await loginUser(data.email, data.password);

    return NextResponse.json(result);
  } catch (error) {
    const { message } = error as Error;
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
