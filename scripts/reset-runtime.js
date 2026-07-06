const fs = require("fs");
const path = require("path");

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
      if (content.includes("export const runtime =")) {
        content = content.replace(/export const runtime\s*=\s*[^;]+;/g, 'export const runtime = "nodejs";');
        fs.writeFileSync(fullPath, content, "utf8");
        console.log(`Reset runtime in: ${path.relative(path.join(__dirname, ".."), fullPath)} -> nodejs`);
      }
    }
  }
}

if (fs.existsSync(dirToProcess)) {
  processDirectory(dirToProcess);
}
console.log("Runtime reset complete.");
