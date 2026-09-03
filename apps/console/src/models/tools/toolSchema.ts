// import { z } from "zod";

// const llmPromptField = z.object({
//   id: z.string(), //confused so used date.now or use uuid llmid which one
//   name: z.string(), //done
//   type: z.enum(["string", "number", "boolean"]), //done
//   value_type: z.literal("llm_prompt"), //done
//   description: z.string(),
//   enum_values: z.array(z.string()), //optional right we dont have to do?
//   value: z.null(), // force null
//   required: z.boolean(), //done
// });

// const otherField = z.object({ 
//   id: z.string(),
//   name: z.string(),
//   type: z.enum(["string", "number", "boolean"]),
//   value_type: z.enum(["constant", "dynamic"]),
//   description: z.null(),
//   enum_values: z.null(),
//   value: z.string(), // required
//   required: z.boolean(),
// });

// const arrayField = z.object({
//   key: z.string(),
//   value: z.string(),
// });

// const fieldSchema = z.discriminatedUnion("value_type", [
//   llmPromptField,
//   otherField,
// ]);

// export const toolSchema = z.object({
//   name: z.string().min(1), //done
//   agentId: z.string().uuid(), //done
//   description: z.string().min(1),  //done
//   disable_interruptions: z.boolean(), //done
//   force_pre_tool_speech: z.boolean(), //done
//   api_url: z.string(),  //done
//   api_method: z.enum(["POST", "GET", "PATCH", "DELETE", "PUT"]), //done
//   api_headers: z.array(arrayField), //done
//   api_body: z.array(fieldSchema), 
//   api_query_params: z.array(fieldSchema), //done
//   api_path_params: z.array(fieldSchema), //done
//   response_timeout_secs: z.number().optional(), //done
//   dynamic_variables: z.record(z.string()), //done
// });
