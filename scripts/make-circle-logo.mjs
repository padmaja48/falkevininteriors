import sharp from "sharp";
import fs from "fs";

const src = "public/brand/logo.png";

async function circleLogo(size, out) {
  const pad = Math.round(size * 0.06);
  const inner = size - pad * 2;
  const fitted = await sharp(src)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 2, g: 8, b: 6, alpha: 1 },
    })
    .png()
    .toBuffer();

  const base = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 2, g: 8, b: 6, alpha: 1 },
    },
  })
    .composite([{ input: fitted, left: pad, top: pad }])
    .png()
    .toBuffer();

  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
  );

  await sharp(base)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(out);
}

await circleLogo(640, "public/brand/logo-circle.png");
await circleLogo(192, "app/icon.png");
await circleLogo(180, "app/apple-icon.png");
await circleLogo(192, "public/icon.png");
await circleLogo(180, "public/apple-icon.png");
await sharp("public/brand/logo-circle.png")
  .webp({ quality: 90 })
  .toFile("public/brand/logo-circle.webp");

console.log({
  circle: fs.statSync("public/brand/logo-circle.webp").size,
  icon: fs.statSync("app/icon.png").size,
});
