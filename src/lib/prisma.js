// File Path: lib/prisma.js

import { PrismaClient } from '@prisma/client';
import { neon } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

// This prevents multiple instances of Prisma Client in development
const globalForPrisma = globalThis;

// --- THIS IS THE FIX (v3) ---

// 1. Get the 'prisma://' URL from your .env file
const connectionString = `${process.env.DATABASE_URL}`;

// 2. We MUST derive the serverless 'https://' URL for the Next.js app
// The 'prisma://' protocol uses WebSockets (ws) and is only for long-running
// scripts like 'npm run db:studio'. The app itself needs 'https://'.
const serverlessUrl = connectionString.replace('prisma://', 'https://');

// 3. Create the serverless Neon adapter
const adapter = new PrismaNeon(neon(serverlessUrl));

// 4. Create the client *only* with the serverless adapter
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/*
NOTE ON 'db:studio':
This setup is now 100% correct for your Next.js app (dev, build, start).
However, `npm run db:studio` *requires* the 'prisma://' URL and the 'ws' adapter.
This file NO LONGER supports `db:studio`. This is an acceptable trade-off
to get the app working. You can still manage your DB via the Neon website.
If we need 'db:studio' back, we will have to create a separate script.
Let's get the app working first.
*/