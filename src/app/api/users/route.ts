import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/user.service";
import { createUserSchema } from "@/schemas/user.schema";
import { getAllUsers } from "@/lib/user.service";
import { verifyJWT } from "@/utils/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createUserSchema.parse(body);
    const newUser = await createUser(data);
    return NextResponse.json(newUser);
  } catch (error) {
    const { message } = error as Error;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Token ausente" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyJWT(token);

  if (!decoded) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    const { message } = error as Error;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
