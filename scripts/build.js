const { execSync } = require("child_process");

const isNextOnPages = process.env.NEXT_ON_PAGES === "1";
const isCI = process.env.CF_PAGES === "1" || process.env.CI === "true" || isNextOnPages;

if (isCI) {
  if (isNextOnPages) {
    console.log("In next-on-pages build phase. Running: next build");
    execSync("next build", { stdio: "inherit" });
  } else {
    console.log("CI/Cloudflare Pages detected. Running Cloudflare Pages build flow...");
    
    // 1. Toggle runtimes to edge
    execSync("node scripts/toggle-runtime.js edge", { stdio: "inherit" });
    
    try {
      // 2. Build via @cloudflare/next-on-pages
      execSync("npx @cloudflare/next-on-pages", {
        stdio: "inherit",
        env: {
          ...process.env,
          NEXT_ON_PAGES: "1"
        }
      });

      // 2.5 Create .assetsignore to prevent wrangler from uploading _worker.js as an asset
      const fs = require("fs");
      const path = require("path");
      const assetsDir = path.join(__dirname, "../.vercel/output/static");
      if (fs.existsSync(assetsDir)) {
        fs.writeFileSync(path.join(assetsDir, ".assetsignore"), "_worker.js\n", "utf8");
        console.log("Created .assetsignore in .vercel/output/static to ignore _worker.js");
      }
    } finally {
      // 3. Restore runtimes to nodejs
      execSync("node scripts/toggle-runtime.js nodejs", { stdio: "inherit" });
    }
  }
} else {
  console.log("Local development build detected. Running standard: next build");
  execSync("next build", { stdio: "inherit" });
}
