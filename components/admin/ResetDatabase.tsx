"use client";

import { resetDatabase } from "@/actions/reset";
import { useAction } from "@/hooks/use-action";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const ResetDatabase = () => {

  const queryClient = useQueryClient();

  const { execute, isLoading } = useAction(resetDatabase, {
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["nextSessions"] });
      queryClient.invalidateQueries({ queryKey: ["sessionsWithLiders"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleReset = () => {
    execute({});
  }

  return (
    <button
      onClick={handleReset}
      className="text-sm px-4 py-2.5 bg-myorange text-white font-semibold rounded-md hoover:bg-myzinc/80 transition duration-300"
      disabled={isLoading}
    >
      Resetear
    </button>
  );
};
export default ResetDatabase;
