import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  DISCORD_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  OPENAI_API_KEY: z.string(),
});

export const env = schema.parse(process.env);
