import { copyFile, cp, mkdir } from "node:fs/promises";

await mkdir("dist/assets", { recursive: true });
await cp("assets", "dist/assets", { recursive: true });
await copyFile("demo.js", "dist/demo.js");
await mkdir("dist/.openai", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
