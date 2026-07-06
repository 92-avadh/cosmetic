import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

let prismaClient: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (prismaClient) return prismaClient;

  if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "production") {
      const { Pool } = eval('require("pg")');
      const { PrismaPg } = eval('require("@prisma/adapter-pg")');
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

  // Cache in global object in development to prevent duplicate clients on hot-reload
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaClient;
  }

  return prismaClient;
}

// Export a Proxy that intercepts access to Prisma properties and initializes the client lazily
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    // If global already has prisma instance, use it
    const client = globalForPrisma.prisma || getPrisma();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

