// import { agentLanguage, llmModel } from "@prisma/client";
// import { z } from "zod";

// export const dataItemSchema = z.object({
//   id: z.string(),
//   type: z.string().min(1, "Data item type is required"),
//   name: z.string().min(1, "Data item value is required"),
//   description: z.string(),
// });

// export const initiation_webhookSchema = z
//   .object({
//     webhook_url: z.string().url(),
//     method: z.enum(["POST", "GET"]),
//     dynamic_variables:z.record(z.string(), z.string()).optional(),
//     headers: z.record(z.string(), z.string()).optional(),
//     body: z.record(z.string(), z.string()).optional(),
//   })
//   .nullable();

// export const post_call_webhookSchema = z
//   .object({
//     webhook_url: z.string().url(),
//     method: z.enum(["POST"]),
//     headers: z.record(z.string(), z.string()).optional(),
//     transcript: z.boolean(),
//     audio_url: z.boolean(),
//   })
//   .nullable();

// export const configureAgentSchema = z.object({
//   userId: z.string().uuid(),
//   agentId: z.string().uuid(),
//   agent_language: z.nativeEnum(agentLanguage).default(agentLanguage.EN),
//   firstMessage: z
//     .string()
//     .min(5, "First message must be at least 5 characters"),
//   systemPrompt: z
//     .string()
//     .min(10, "System prompt must be at least 10 characters"),
//   llmModel: z.nativeEnum(llmModel).default(llmModel.OPENAI_GPT_4O_MINI),
//   temperature: z.number().min(0).max(1).default(0.7),
//   // tokenLimit: z.number().int().positive().default(4096),
//   use_rag: z.boolean().default(false),
//   voiceId: z.string().min(1, "Voice ID is required"),
//   data_needed: z.array(dataItemSchema).default([]),
//   initiation_webhook: initiation_webhookSchema,
//   post_call_webhook: post_call_webhookSchema,
//   variables:z.object({
//     firstMessage:z.array(z.string()),
//     systemPrompt:z.array(z.string())
//   }).optional(),
//   // use_flash_call: z.boolean().default(false),
//   // tts_output_format: z.string().default("mp3"),
//   // optimize_streaming_latency: z.boolean().default(false),
//   // voice_stability: z.number().min(0).max(1),
//   // voice_speed: z.number().min(0.5).max(2),
//   // voice_similarity_boost: z.number().min(0).max(1),
//   // fetch_initiation_webhook_url: z.string().optional(),
//   // post_call_webhook_url: z.string().optional(),
//   // concurrent_calls_limit: z.number().int().positive(),
//   // daily_calls_limit: z.number().int().positive(),
//   // turn_timeout_seconds: z.number().int().positive(),
//   // silence_end_call_timeout_seconds: z.number().int().positive(),
//   // max_conversation_duration_seconds: z.number().int().positive(),
//   // user_input_audio_format: z.string(),
//   // store_call_audio: z.boolean().default(true),
//   // zero_pii_retention: z.boolean().default(false),
//   // conversation_retention_days: z.number().int().positive().default(30),
//   // enable_auth_for_agent_api: z.boolean().default(false),
// });
