import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { ResetSchema } from "./schema";

export type InputType = z.infer<typeof ResetSchema>
export type ReturnType = ActionState<InputType, string>