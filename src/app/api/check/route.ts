// Untuk App Router (Next.js 13+ dengan /app)
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$connect();
    await prisma.$disconnect();
    return NextResponse.json({ status: 'success', message: 'Database connected successfully' });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Database connection failed', error: error instanceof Error ? error.message : String(error)  }, { status: 500 });
  }
}