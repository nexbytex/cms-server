import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });

const prisma = new PrismaClient({ adapter });

export default prisma;