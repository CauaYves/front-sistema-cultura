import { string, z } from "zod";
import "server-only";
const envSchema = z.object({
  NEXT_PUBLIC_REACT_APP_API_BASE_URL: string().url(),
});

export const env = envSchema.parse(process.env);
