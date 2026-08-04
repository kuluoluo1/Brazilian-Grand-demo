import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const html = readFileSync(resolve("index.html"), "utf8");

const checks = [
  ["does not use the full-page screenshot as the page", !html.includes("assets/homepage.png")],
  ["has a semantic header", /<header\b/.test(html)],
  ["has multiple page sections", (html.match(/<section\b/g) || []).length >= 6],
  ["has product cards", (html.match(/class="[^"]*\bproduct-card\b/g) || []).length >= 12],
  ["has recipient cards", (html.match(/class="[^"]*\brecipient-card\b/g) || []).length >= 6],
  ["has a footer", /<footer\b/.test(html)],
];

const failures = checks.filter(([, passed]) => !passed);

if (failures.length) {
  for (const [name] of failures) {
    console.error(`FAIL: ${name}`);
  }
  process.exit(1);
}

console.log(`PASS: ${checks.length} structure checks`);
