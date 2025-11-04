// Simple script to run the seed mutation
// Usage: node scripts/runSeed.mjs

import { ConvexHttpClient } from "convex/browser";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local file
const envPath = join(__dirname, "..", ".env.local");
try {
  const envFile = readFileSync(envPath, "utf8");
  const envVars = envFile.split("\n").reduce((acc, line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim();
      acc[key.trim()] = value;
    }
    return acc;
  }, {});

  // Set environment variables
  Object.assign(process.env, envVars);
} catch (error) {
  console.error("⚠️  Could not read .env.local file");
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error("Error: NEXT_PUBLIC_CONVEX_URL not found in environment");
  console.log("Make sure your .env.local file exists and contains NEXT_PUBLIC_CONVEX_URL");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

console.log("Starting database seed...");
console.log(`Connecting to: ${CONVEX_URL}\n`);

try {
  const result = await client.mutation("seed:seedProducts", {});

  if (result.success) {
    console.log("SUCCESS::::" + result.message);
    console.log(`Inserted ${result.productIds.length} products`);
    console.log("\nDatabase seeded successfully!");
    console.log("\nProducts added:");
    console.log("  - 3 Headphones");
    console.log("  - 2 Speakers");
    console.log("  - 1 Earphones");
    console.log("\n You can now run: npm run dev");
  } else {
    console.log("Error:::" + result.message);
    console.log("\nIf you want to reseed, first clear the products:");
    console.log("  node scripts/clearProducts.mjs");
  }
} catch (error) {
  console.error("Error seeding database:", error.message);
  console.log("\nTroubleshooting:");
  console.log("1. Make sure 'npx convex dev' is running");
  console.log("2. Check that NEXT_PUBLIC_CONVEX_URL is correct in .env.local");
  console.log("3. Ensure you've run 'npm install'");
  process.exit(1);
}
