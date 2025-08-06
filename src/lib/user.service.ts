import { PrismaClient } from "@prisma/client";
import { CreateUserInput, UpdateUserInput } from "@/types/user.types";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function createUser(data: CreateUserInput) {
  const hashedPassword = await hash(data.password, 10);

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
}

export async function updateUser(id: number, data: UpdateUserInput) {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      updatedAt: true,
    },
  });
}

export async function deleteUser(id: number) {
  await prisma.user.delete({ where: { id } });
}
