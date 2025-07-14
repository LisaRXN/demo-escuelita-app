import { prisma } from "@/lib/prisma";

export async function getVolunteerStatus(userId: string | null) {

  if (!userId) return { isAdmin: false, isComplete: false };

  const volunteer = await prisma.volunteer.findFirst({
    where: { clerkUserId: userId },
    select: {
      isAdmin: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });

  if (!volunteer) return { isAdmin: false, isComplete: false };

  const isComplete =
    !!volunteer.firstName &&
    !!volunteer.lastName &&
    !!volunteer.email &&
    !!volunteer.phone;

  return {
    isAdmin: volunteer.isAdmin ?? false,
    isComplete,
  };
}
