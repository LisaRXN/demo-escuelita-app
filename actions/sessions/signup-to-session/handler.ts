"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { cookies } from "next/headers";

export const handler = async (data: InputType): Promise<ReturnType> => {
  try {

    const cookieStore = await cookies();
    console.log("Clerk cookies:", cookieStore.get("__session")); // Vérifie si le cookie est présent

    console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);
console.log("CLERK_FRONTEND_API:", process.env.CLERK_FRONTEND_API);

    const { userId } = await auth();
    
    console.log("userId:", userId);
   
    if (!userId) {
      return { error: "Unauthorized" };
    }

    const { sessionId } = data;

    // Chercher le volontaire lié à Clerk
    const volunteer = await prisma.volunteer.findUnique({
      where: { clerkUserId: userId },
    });

    if (!volunteer) {
      return { error: "Unauthorized" };
    }

    // Vérifier si déjà inscrit
    const existingRegistration = await prisma.volunteerRegistration.findFirst({
      where: {
        volunteerId: volunteer.id,
        sessionId,
      },
    });

    if (existingRegistration) {
      return { error: "Voluntario ya inscrito a la sesión" };
    }

    // Récupérer la session et les inscriptions actuelles
    const session = await prisma.volunteerSession.findUnique({
      where: { id: sessionId },
      include: {
        volunteers: true,
      },
    });

    if (!session) {
      return { error: "Ninguna sesión encontrada" };
    }

    const isFull = session.volunteers.length >= session.capacity;

    if (isFull) {
      return { error: "Sesión completa" };
    }

    // ✅ Enregistrement du volontaire
    await prisma.volunteerRegistration.create({
      data: {
        volunteerId: volunteer.id,
        sessionId,
      },
    });

    return {
      data: {
        volunteerId: volunteer.id,
        sessionId,
      },
    };
  } catch (error) {
    console.error("Error registering volunteer:", error);
    return { error: "Error interno del servidor" };
  }
};

