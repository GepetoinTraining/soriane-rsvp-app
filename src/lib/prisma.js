import { PrismaClient } from '@prisma/client';
import { neon } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// This prevents multiple instances of Prisma Client in development
const globalForPrisma = globalThis;

// This is the official setup for Prisma + Neon + Next.js
const neonConnection = neon(process.env.DATABASE_URL, { webSocketConstructor: ws });
const adapter = new PrismaNeon(neonConnection);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;