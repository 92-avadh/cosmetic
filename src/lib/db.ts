import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

let prismaClient: PrismaClient;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    // Only load database drivers dynamically in production to avoid compile-time crashes in local dev
    const { Pool } = require("pg");
    const { PrismaPg } = require("@prisma/adapter-pg");
    
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    prismaClient = new PrismaClient({
      adapter,
      log: ["error"],
    });
  } else {
    // Local development: use standard Node-native Prisma client (no adapter needed)
    prismaClient = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  }
} else {
  prismaClient = new PrismaClient({
    log: ["error"],
  });
}

export const prisma =
  globalForPrisma.prisma || prismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
