const fs = require("fs");
const path = require("path");

const targetRuntime = process.argv[2] === "edge" ? "edge" : "nodejs";
const sourceRuntime = targetRuntime === "edge" ? "nodejs" : "edge";

const dirToProcess = path.join(__dirname, "../src/app");

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      let content = fs.readFileSync(fullPath, "utf8");
      
      const targetStr = `export const runtime = "${targetRuntime}";`;
      const sourceStr = `export const runtime = "${sourceRuntime}";`;
      
      // Skip files that use pg/Prisma (db.ts) — these are Node.js-only and
      // cannot run in Edge Runtime. They must stay on the "nodejs" runtime.
      const usesNodeDb =
        content.includes('from "@/lib/db"') ||
        content.includes("from '@/lib/db'") ||
        content.includes('require("@/lib/db")') ||
        content.includes("require('@/lib/db')");

      if (usesNodeDb && targetRuntime === "edge") {
        console.log(
          `Skipping (Node.js DB dependency): ${path.relative(path.join(__dirname, ".."), fullPath)}`
        );
      } else if (content.includes(sourceStr)) {
        content = content.replace(sourceStr, targetStr);
        fs.writeFileSync(fullPath, content, "utf8");
        console.log(`Updated runtime in: ${path.relative(path.join(__dirname, ".."), fullPath)} -> ${targetRuntime}`);
      }
    }
  }
}

console.log(`Toggling runtimes from "${sourceRuntime}" to "${targetRuntime}"...`);
if (fs.existsSync(dirToProcess)) {
  processDirectory(dirToProcess);
}
console.log("Runtime toggle complete.");
