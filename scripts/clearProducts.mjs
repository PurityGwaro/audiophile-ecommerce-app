// Script to clear all products from the database
// Usage: node scripts/clearProducts.mjs

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error("❌ Error: NEXT_PUBLIC_CONVEX_URL not found in environment");
  console.log("Make sure your .env.local file exists and contains NEXT_PUBLIC_CONVEX_URL");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

console.log("🗑️  Clearing all products from database...");
console.log(`📡 Connecting to: ${CONVEX_URL}\n`);

try {
  const result = await client.mutation("seed:clearProducts", {});

  if (result.success) {
    console.log("✅ " + result.message);
    console.log("\n💡 To add products again, run:");
    console.log("  node scripts/runSeed.mjs");
  }
} catch (error) {
  console.error("❌ Error clearing database:", error.message);
  console.log("\nTroubleshooting:");
  console.log("1. Make sure 'npx convex dev' is running");
  console.log("2. Check that NEXT_PUBLIC_CONVEX_URL is correct in .env.local");
  process.exit(1);
}
