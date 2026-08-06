import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const imageDir = "assets/figma";

const widthRules = [
  [/^drawer-nav-\d+$/, 104],
  [/^gift-finder-\d+$/, 220],
  [/^home-product-\d+$/, 350],
  [/^product-/, 350],
  [/^pdp-product-media$/, 732],
  [/^pdp-review-\d+$/, 260],
  [/^pdp-personalization-style-\d+$/, 160],
  [/^pdp-related-\d+$/, 350],
  [/^recipient-/, 200],
  [/^review-one$/, 260],
  [/^collection-/, 732],
  [/^banner_pic$/, 732],
  [/^banner-frame$/, 732],
  [/^logo-header$/, 174],
  [/^footer-logo$/, 280],
  [/^trustpilot$/, 464],
];

function widthFor(name) {
  return widthRules.find(([pattern]) => pattern.test(name))?.[1];
}

function qualityFor(name) {
  if (name.startsWith("banner")) {
    return 88;
  }
  if (name.startsWith("drawer-nav") || name.startsWith("gift-finder")) {
    return 80;
  }
  return 82;
}

const files = await readdir(imageDir);
const rasterFiles = files.filter((file) => /\.(png|jpe?g)$/i.test(file));

for (const file of rasterFiles) {
  const sourcePath = join(imageDir, file);
  const { name } = parse(file);
  const outputPath = join(imageDir, `${name}.webp`);
  const requestedWidth = widthFor(name);
  const source = sharp(sourcePath).rotate();
  const pipeline = requestedWidth
    ? source.resize({ width: requestedWidth, withoutEnlargement: true })
    : source;
  await pipeline.webp({ effort: 6, quality: qualityFor(name) }).toFile(outputPath);
  const sourceSize = (await stat(sourcePath)).size;
  const outputSize = (await stat(outputPath)).size;
  console.log(`${file} -> ${name}.webp ${Math.round(sourceSize / 1024)}KB -> ${Math.round(outputSize / 1024)}KB`);
}
