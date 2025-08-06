import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utils/jwt";
import { updateUserSchema } from "@/schemas/user.schema";
import { getUserById, updateUser, deleteUser } from "@/lib/user.service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token || !verifyJWT(token)) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const user = await getUserById(Number(params.id));

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const payload = verifyJWT(token || "");

  if (!payload) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = updateUserSchema.parse(body);

    const updated = await updateUser(Number(params.id), data);
    return NextResponse.json(updated);
  } catch (error) {
    const { message } = error as Error;
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const payload = verifyJWT(token || "");

  if (!payload) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  try {
    await deleteUser(Number(params.id));
    return NextResponse.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    const { message } = error as Error;
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
