import sharp from "sharp";
import fs from "fs";
import path from "path";

/**
 * Cover phone-number overlays by stretching a nearby clean strip
 * over the watermark rectangle (full cover + soft edge feather).
 */
async function coverWatermark(inputPath, outputPath, fracBox) {
  const meta = await sharp(inputPath).metadata();
  const width = meta.width;
  const height = meta.height;

  const x = Math.max(0, Math.floor(fracBox.x0 * width));
  const y = Math.max(0, Math.floor(fracBox.y0 * height));
  const w = Math.min(width - x, Math.ceil((fracBox.x1 - fracBox.x0) * width));
  const h = Math.min(height - y, Math.ceil((fracBox.y1 - fracBox.y0) * height));

  // Prefer a clean horizontal strip just above the watermark
  let srcTop = Math.max(0, y - h - 8);
  let srcHeight = Math.min(h, y - srcTop);
  if (srcHeight < Math.floor(h * 0.4)) {
    srcTop = Math.min(height - 2, y + h + 8);
    srcHeight = Math.min(h, height - srcTop);
  }
  srcHeight = Math.max(8, srcHeight);

  const srcLeft = Math.max(0, x);
  const srcWidth = Math.min(w, width - srcLeft);

  const patch = await sharp(inputPath)
    .extract({
      left: srcLeft,
      top: srcTop,
      width: srcWidth,
      height: srcHeight,
    })
    .resize(w, h, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Build RGBA overlay with feathered alpha on edges
  const overlay = Buffer.alloc(w * h * 4);
  const featherX = Math.max(6, Math.floor(w * 0.04));
  const featherY = Math.max(4, Math.floor(h * 0.12));
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const si = (py * w + px) * 4;
      overlay[si] = patch.data[si];
      overlay[si + 1] = patch.data[si + 1];
      overlay[si + 2] = patch.data[si + 2];
      const ax = Math.min(px, w - 1 - px) / featherX;
      const ay = Math.min(py, h - 1 - py) / featherY;
      const a = Math.max(0, Math.min(1, Math.min(ax, ay)));
      // Keep center fully opaque so digits disappear
      overlay[si + 3] = Math.round(255 * (a < 1 ? Math.min(1, 0.55 + a * 0.45) : 1));
      if (ax >= 1 && ay >= 1) overlay[si + 3] = 255;
    }
  }

  const composed = await sharp(inputPath)
    .composite([
      {
        input: overlay,
        raw: { width: w, height: h, channels: 4 },
        left: x,
        top: y,
      },
    ])
    .webp({ quality: 90 })
    .toBuffer();

  fs.writeFileSync(outputPath, composed);
  return { x, y, w, h, srcTop, srcHeight };
}

const jobs = [
  // 095: black phone across marble — cover mid band generously
  {
    file: "095.webp",
    out: "095-clean.webp",
    box: { x0: 0.16, x1: 0.78, y0: 0.52, y1: 0.74 },
  },
  // 100: white phone lower-right
  {
    file: "100.webp",
    out: "100-clean.webp",
    box: { x0: 0.38, x1: 0.92, y0: 0.78, y1: 0.98 },
  },
];

for (const job of jobs) {
  const src = path.join("public/images/portfolio", job.file);
  const out = path.join("public/images/portfolio", job.out);
  const result = await coverWatermark(src, out, job.box);
  console.log("covered", job.out, result);

  await sharp(out)
    .resize(900, null, { withoutEnlargement: true })
    .jpeg({ quality: 78 })
    .toFile(path.join("_import/preview", job.out.replace(".webp", ".jpg")));
}

console.log("done");
