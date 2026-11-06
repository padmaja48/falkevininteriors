import sharp from "sharp";
import fs from "fs";

const src = "public/brand/logo-circle.png";

async function writePng(size, out) {
  await sharp(src)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(out);
}

// Standard sizes used by browsers / Next
await writePng(32, "public/favicon-32.png");
await writePng(16, "public/favicon-16.png");
await writePng(48, "public/favicon.png");
await writePng(192, "app/icon.png");
await writePng(192, "public/icon.png");
await writePng(180, "app/apple-icon.png");
await writePng(180, "public/apple-icon.png");

// Next serves app/favicon.ico — write a 32×32 PNG (modern browsers accept this)
await sharp(src)
  .resize(32, 32, { fit: "cover" })
  .png({ compressionLevel: 9 })
  .toFile("app/favicon.ico");

await sharp(src)
  .resize(32, 32, { fit: "cover" })
  .png({ compressionLevel: 9 })
  .toFile("public/favicon.ico");

console.log(
  Object.fromEntries(
    [
      "app/favicon.ico",
      "app/icon.png",
      "app/apple-icon.png",
      "public/favicon.ico",
      "public/favicon.png",
      "public/icon.png",
    ].map((p) => [p, fs.statSync(p).size])
  )
);
