import { PrismaClient } from "@/generated/prisma";
import { compare } from "bcryptjs";
import { signJWT } from "@/utils/jwt";

const prisma = new PrismaClient();

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Senha incorreta");
  }

  const token = signJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
}
