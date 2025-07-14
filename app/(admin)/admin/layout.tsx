import AdminNavbar from "@/components/admin/AdminNavbar";
import { auth } from "@clerk/nextjs/server";
import { ReactQueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { redirect } from "next/navigation";
import { getVolunteerStatus } from "@/lib/get-volunteer-status";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  const { isAdmin: isUserAdmin, isComplete } = await getVolunteerStatus(userId);

  if (!isComplete) {
    redirect("/register");
  }

  if (isComplete && !isUserAdmin) {
    redirect("/dashboard");
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
