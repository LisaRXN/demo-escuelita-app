"use server";

import { prisma } from "@/lib/prisma";
import { ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";

export const handler = async (): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {

    await prisma.volunteerSession.deleteMany({
      where: { isProtected: false },
    });

    return { data: "¡Reinicio de la base de datos con éxito" };
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return { error: "Error al reiniciar la base de datos" };
  }
};
