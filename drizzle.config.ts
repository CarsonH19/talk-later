// import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// config({ path: ".env" });

export default defineConfig({
  schema: "./src/app/db/schema.ts",
  out: "./src/app/db/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});