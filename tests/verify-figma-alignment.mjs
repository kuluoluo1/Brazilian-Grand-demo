import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const html = readFileSync(resolve("index.html"), "utf8");
const css = readFileSync(resolve("styles.css"), "utf8");
const productRows = [...html.matchAll(/<div class="product-row[^"]*">([\s\S]*?)<\/div>/g)];
const reviewRowCount = (html.match(/class="review-row"/g) || []).length;
const reviewCardCount = (html.match(/class="review-card"/g) || []).length;

const checks = [
  ["banner uses exported Figma frame WebP", html.includes("./assets/figma/banner-frame.webp")],
  ["banner source PNG and WebP assets exist", existsSync(resolve("assets/figma/banner-frame.png")) && existsSync(resolve("assets/figma/banner-frame.webp"))],
  ["banner no longer rebuilds overlay text as DOM", !/<section class="hero">[\s\S]*<h1>/.test(html)],
  ["menu icon is SVG", html.includes("./assets/figma/icon-menu.svg")],
  ["bag icon is SVG", html.includes("./assets/figma/icon-bag.svg")],
  ["search icon is SVG", html.includes("./assets/figma/icon-search.svg")],
  ["trust icons are SVG", !/assets\/figma\/icon-(pix|cep|map|whatsapp)\.png/.test(html)],
  ["all expected SVG icon assets exist", [
    "icon-menu.svg",
    "icon-bag.svg",
    "icon-search.svg",
    "icon-pix.svg",
    "icon-cep.svg",
    "icon-map.svg",
    "icon-whatsapp.svg",
    "icon-whatsapp-footer.svg",
    "icon-verified.svg",
    "icon-stars.svg",
    "logo.svg",
    "trustpilot-logo-white.svg",
  ].every((file) => existsSync(resolve("assets/figma", file)))],
  ["Verified Buyer uses exported SVG asset", html.includes("./assets/figma/icon-verified.svg")],
  ["Verified Buyer is not a CSS placeholder dot", !/class="verified"><span><\/span>Verified Buyer/.test(html)],
  ["Verified Buyer color matches Figma", /\.verified\s*{[\s\S]*color:\s*#168a4a/i.test(css)],
  ["review card background matches Figma", /\.review-card\s*{[\s\S]*background:\s*#fff6e9/i.test(css)],
  ["footer WhatsApp uses SVG asset", html.includes("./assets/figma/icon-whatsapp-footer.svg")],
  ["footer WhatsApp is not a CSS placeholder dot", !/class="whatsapp-link"><span><\/span>/.test(html)],
  ["footer logo uses provided SVG asset", html.includes("./assets/figma/logo.svg") && !html.includes("./assets/figma/footer-logo.png")],
  [
    "Trustpilot uses provided SVG plus separate review link",
    html.includes("./assets/figma/trustpilot-logo-white.svg") &&
      /class="trustpilot-review-link"[\s\S]*13,578 review/.test(html) &&
      !html.includes("./assets/figma/trustpilot.png") &&
      /\.trustpilot-row\s*{[\s\S]*display:\s*flex/i.test(css),
  ],
  ["summer collection background matches Figma", /\.summer\s+\.collection-copy\s*{[\s\S]*background:\s*#ffeedd/i.test(css)],
  ["pets collection background matches Figma", /\.pets\s+\.collection-copy\s*{[\s\S]*background:\s*#efebff/i.test(css)],
  ["selected filter pill matches Figma white card", /filter-pills button:first-child\s*{[\s\S]*background:\s*#fff/i.test(css)],
  ["unselected filter pills match Figma blue-gray card", /filter-pills button:not\(:first-child\)\s*{[\s\S]*background:\s*#e9eff5/i.test(css)],
  ["product rows are horizontally scrollable", /\.product-row\s*{[\s\S]*overflow-x:\s*auto/i.test(css)],
  ["there are three horizontal product rows", productRows.length === 3],
  [
    "each horizontal product row has 10 products",
    productRows.every(([, row]) => (row.match(/class="product-card small-card"/g) || []).length === 10),
  ],
  ["review row is horizontally scrollable", /\.review-row\s*{[\s\S]*overflow-x:\s*auto/i.test(css)],
  ["review stars use exported SVG asset", html.includes("./assets/figma/icon-stars.svg")],
  ["review stars are not rendered as text glyphs", !/<div class="review-stars">★★★★★<\/div>/.test(html)],
  ["there is one horizontal review row", reviewRowCount === 1],
  ["horizontal review row has 10 reviews", reviewCardCount === 10],
  ["review content is clamped to 3 lines", /\.review-copy p\s*{[\s\S]*-webkit-line-clamp:\s*3/i.test(css)],
  ["review content has ellipsis overflow", /\.review-copy p\s*{[\s\S]*text-overflow:\s*ellipsis/i.test(css)],
  ["touch momentum scrolling is enabled", /-webkit-overflow-scrolling:\s*touch/i.test(css)],
];

const failures = checks.filter(([, passed]) => !passed);

if (failures.length) {
  for (const [name] of failures) {
    console.error(`FAIL: ${name}`);
  }
  process.exit(1);
}

console.log(`PASS: ${checks.length} Figma alignment checks`);
