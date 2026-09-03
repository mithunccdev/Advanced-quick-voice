import { z } from "zod";

// Zod schema for email
export const forgotSchema = z.object({
    email: z.string().email(),
  });   