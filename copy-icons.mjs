// n8n loads node icons from the compiled `dist` tree, but `tsc` only emits JS —
// it does not copy static assets. This mirrors the node icon(s) into dist after
// the TypeScript build so `file:videogen.svg` / `file:videogen.dark.svg` resolve.
import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const srcDir = join(root, "nodes", "VideoGen");
const destDir = join(root, "dist", "nodes", "VideoGen");
const iconFiles = ["videogen.svg", "videogen.dark.svg"];

mkdirSync(destDir, { recursive: true });
for (const iconFile of iconFiles) {
  cpSync(join(srcDir, iconFile), join(destDir, iconFile));
}

console.log("Copied node icons to dist.");
