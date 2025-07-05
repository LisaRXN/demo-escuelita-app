import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export interface VolunteerSession {
  id: number;
  title: string;
  date: string; // ISO string
  description: string | null;
  capacity: number;
  createdAt: string; // ISO string
}

export async function GET() {
  const sessions = await prisma.volunteerSession.findMany({
    orderBy: { date: 'desc' },
  });

  // Prisma retourne des Dates en JS, ici on convertit en ISO string pour simplifier le JSON
  const serializedSessions: VolunteerSession[] = sessions.map((s) => ({
    id: s.id,
    title: s.title,
    date: s.date.toISOString(),
    description: s.description,
    location: s.location,
    capacity: s.capacity,
    createdAt: s.createdAt.toISOString(),
  }));

  return NextResponse.json(serializedSessions);
}
