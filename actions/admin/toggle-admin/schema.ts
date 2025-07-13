// actions/admin/toggle-volunteer-active/schema.ts
import { z } from "zod";

export const ToggleAdminSchema = z.object({
  volunteerId: z.string(),
  isAdmin: z.boolean(),
});