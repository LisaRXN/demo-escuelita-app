import AdminNavbar from "@/components/admin/AdminNavbar";
// import { isVolunteerProfileComplete } from "@/lib/check-user";
import { isAdmin } from "@/lib/is-admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactQueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { isVolunteerProfileComplete } from "@/lib/check-user";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  const isUserAdmin = await isAdmin(userId);
  const isComplete = await isVolunteerProfileComplete(userId);

  if (!isUserAdmin) {
    redirect("/dashboard");
  }

    if (!isComplete) {
    redirect("/register");
  }

  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <Toaster /> <AdminNavbar />
        <div className="pt-20 m-auto min-h-screen bg-myteal text-myzinc text-open font-medium">
          {children}
        </div>
      </ReactQueryProvider>
    </ClerkProvider>
  );
};

export default AdminLayout;
