// import { sourceType } from "@prisma/client";
// import { z } from "zod";

// // Schema for multiple file + URL upload
// export const uploadSchema = z
//   .object({
//     agentId: z.string().uuid(),
//     sourceTypes: z.array(z.nativeEnum(sourceType)),
//     urls: z.array(z.string().url()).optional().nullable(),
//     texts: z.array(z.string()).optional().nullable(),
//     files: z.array(z.instanceof(File)).optional().nullable(),
//     names: z.array(z.string()),
//     userId: z.string(),
//     organizationId: z.string().min(10, "Invalid organization ID"),
//   })
//   .refine(
//     (data) => {
//       // If FILE is in sourceType, files must exist and names must match
//       if (
//         !data.sourceTypes.includes(sourceType.URL) &&
//         !data.sourceTypes.includes(sourceType.TXT)
//       ) {
//         if (!data.files || data.files.length === 0) return false;
//       }

//       // If URL is in sourceType, urls must exist
//       if (data.sourceTypes.includes(sourceType.URL)) {
//         if (!data.urls || data.urls.length === 0) return false;
//       }
//       if (data.sourceTypes.includes(sourceType.TXT)) {
//         if (!data.texts || data.texts.length === 0) return false;
//       }

//       if (
//         (data?.urls?.length ?? 0) +
//           (data?.files?.length ?? 0) +
//           (data?.texts?.length ?? 0) !==
//         data.names.length
//       ) {
//         return false;
//       }
//       if (
//         (data?.urls?.length ?? 0) +
//           (data?.files?.length ?? 0) +
//           (data?.texts?.length ?? 0) !==
//         data.sourceTypes.length
//       ) {
//         return false;
//       }

//       return true;
//     },
//     {
//       message:
//         "Files and names are required for FILE sourceType, URLs are required for URL sourceType",
//       path: ["sourceType"],
//     }
//   );
