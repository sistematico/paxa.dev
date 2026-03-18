import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "node:path";

const dbPath = path.join(process.cwd(), "data", "paxa.db");
const sqlite = new Database(dbPath);

sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });
