
"use client"

import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { useQueryClient } from "@tanstack/react-query"; 
import { toggleAdmin } from "@/actions/admin/toggle-admin";
import { redirect } from "next/navigation";


interface ToggleAdminButtonProps {
  isAdmin: boolean;
  volunteerId: string;
}

const ToggleAdminButton = ({
  isAdmin,
  volunteerId,
}: ToggleAdminButtonProps) => {

  const queryClient = useQueryClient(); 

  const { execute, isLoading } = useAction(toggleAdmin, {
    onSuccess: () => {
      toast.success(`${isAdmin ? "Cambiaste tu rol a voluntario!" : "Cambiaste tu rol a coordinador!"}`);
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
      redirect(`${isAdmin ? '/dashboard' : '/admin'}`);
    },
    onError: (error) => {
      toast.error(
        `Error: ${error}`
      );
    },
  });

  const handleToggle = () => {
    execute({ volunteerId: volunteerId, isAdmin: !isAdmin });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`text-sm px-4 py-2.5 rounded-md  ${
        isAdmin ? "bg-myzinc text-white" : "bg-myzinc text-white hoover:bg-myzinc/80 transition duration-300"
      }`}
    >
      {isLoading ? "Cargando..." : isAdmin ? "Rol voluntario" : "Rol coordinador"}
    </button>
  );
};

export default ToggleAdminButton;
