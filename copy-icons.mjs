// n8n loads node icons from the compiled `dist` tree, but `tsc` only emits JS —
// it does not copy static assets. This mirrors the node icon(s) into dist after
// the TypeScript build so `icon: 'file:videogen.svg'` resolves at runtime.
import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, "nodes", "VideoGen", "videogen.svg");
const destDir = join(root, "dist", "nodes", "VideoGen");

mkdirSync(destDir, { recursive: true });
cpSync(src, join(destDir, "videogen.svg"));

console.log("Copied node icons to dist.");
