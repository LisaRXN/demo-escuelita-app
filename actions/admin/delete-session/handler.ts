"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/is-admin";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const isUserAdmin = await isAdmin(userId);

  if (!isUserAdmin) {
    return { error: "Unauthorized" };
  }

  const { id } = data;

  try {
    const session = await prisma.volunteerSession.delete({
      where: { id },
    });

    revalidatePath(`/admin/get-session`);

    return { data: session };
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return { error: "Erreur lors de la suppression de la session" };
  }
};
