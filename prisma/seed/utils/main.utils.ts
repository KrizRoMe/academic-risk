// ####---- Prisma Config ------####
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

// ####---- Hash Password ------####
import { hashSync } from "bcrypt-ts";

export const getHashedPassword = async (password: string) => {
  return await hashSync(password, 10);
};
