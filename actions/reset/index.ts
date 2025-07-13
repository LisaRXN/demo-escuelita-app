'use server';

import { createSafeAction } from "@/lib/create-safe-action";
import { ResetSchema } from "./schema";
import { handler } from "./handler";

export const resetDatabase = createSafeAction(ResetSchema, handler);
