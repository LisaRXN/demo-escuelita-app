import Navbar from "./_components/Navbar";
import { ReactQueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const VolunteerLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <Toaster />
        <Navbar />
        <div className="pt-20 m-auto min-h-screen bg-myteal text-myzinc text-open font-medium">
          {children}
        </div>
      </ReactQueryProvider>
    </ClerkProvider>
  );
};

export default VolunteerLayout;
