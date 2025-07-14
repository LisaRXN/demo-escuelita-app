import { PrismaClient } from '@/generated/prisma'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query'],
  });
};

declare global {
  // For dev (hot reload)
  var prisma: PrismaClient | undefined;
}

export const prisma =
  process.env.NODE_ENV === 'production'
    ? prismaClientSingleton() // new instance in prod (serverless safe)
    : global.prisma ?? (global.prisma = prismaClientSingleton());
