// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances in development (Next.js HMR)
  // If you’re not in dev mode, this is less critical, but it avoids “PrismaClient has already been instantiated” warnings.
  // @ts-ignore
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // Uncomment if you want to log queries in development:
    // log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  global.prisma = prisma;
}
