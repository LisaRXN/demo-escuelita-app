
import { getVolunteerStatus } from "@/lib/get-volunteer-status";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage () {

  const { userId } = await auth();
  
  const { isAdmin: isUserAdmin, isComplete } = await getVolunteerStatus(userId);

  console.log('HomePage:', { isUserAdmin, isComplete });  
  if (!isComplete) {
    redirect("/register");
  }

  if (isComplete && isUserAdmin) {
    redirect("/admin");
  }

  if (isComplete && !isUserAdmin) {
    redirect("/dashboard");
  }

  return(<p className="text-white">Ingresa como invitado</p>)

}

