// import { z } from "zod";
// import { conversationMessageSchema } from "./conversationMessageSchema";
// import { CallStatus } from "@prisma/client";

// export const conversationSchema = z.object({
//   userId: z.string().uuid(),
//   organizationId: z.string().min(1, "Organization ID is required"),
//     agentId: z.string().uuid(),
//     callId: z.string(),
//     startTime: z.string().datetime(),
//     endTime: z.string().datetime(),
//     direction: z.enum(["inbound", "outbound"]),
//     durationSeconds: z.number(),
//     status: z.nativeEnum(CallStatus),
//     summary: z.object({
//       summary: z.string(),
//       intent: z.string(),
//     }),
//     recordingSid: z.string(),
//     conversationHistory: z.array(conversationMessageSchema),
//     toNumber: z.string(),
//     fromNumber: z.string(),
//     provider: z.enum(["twilio", "telnyx"]),
//     extractedData: z.array(z.object({
//       type: z.string(),
//       name: z.string(),
//       description: z.string(),
//       value: z.any().nullable(),
//     })).default([]),
//   });