import { z } from "zod";

export const secretSchema = z.object({
    name: z.string().min(1, "Name is required"),
    key: z.string().min(1, "Key is required"),
    value: z.string().min(1, "Value is required"),
});