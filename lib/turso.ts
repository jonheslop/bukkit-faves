import { createClient, Row } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export type fave = Row & {
  id: number;
  created_at: string;
  url: string;
  author: string;
  tags: string;
  Source: string;
};
