import { z } from "zod";

export const conversationMessageSchema = z.object({
    messageId: z.string(),
    role: z.enum(["user", "agent"]),
    message: z.string(),
    timestamp: z.string().datetime(),
  });