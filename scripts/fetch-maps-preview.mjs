import https from "https";
import fs from "fs";
import path from "path";

const OUT = "_import/maps-photos";
fs.mkdirSync(OUT, { recursive: true });

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "*/*",
          "Accept-Language": "en-IN,en;q=0.9",
          Cookie: "CONSENT=YES+cb",
          Referer: "https://www.google.com/maps/",
        },
      },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location &&
          redirects < 6
        ) {
          const next = res.headers.location.startsWith("http")
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          return get(next, redirects + 1).then(resolve, reject);
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            headers: res.headers,
            buf: Buffer.concat(chunks),
          })
        );
      }
    );
    req.on("error", reject);
    req.setTimeout(60000, () => req.destroy(new Error("timeout")));
  });
}

const previewPath = fs
  .readFileSync("_import/maps-photos/preview-path.txt", "utf8")
  .trim()
  .replace(/&amp;/g, "&");

const url = "https://www.google.com" + previewPath;
console.log("GET", url.slice(0, 180));
const { status, buf } = await get(url);
console.log("status", status, "len", buf.length);
const text = buf.toString("utf8");
fs.writeFileSync(path.join(OUT, "preview.json"), text);

// Google often prefixes )]}'
const clean = text.replace(/^\)\]\}'\n?/, "");
const urls = new Set();
for (const m of clean.matchAll(
  /https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\/_\-=]+/g
)) {
  urls.add(m[0].split("=")[0]);
}
for (const m of clean.matchAll(
  /lh3\.googleusercontent\.com\\\/[a-zA-Z0-9\\\/_\-=]+/g
)) {
  urls.add(("https://" + m[0]).replace(/\\\//g, "/").split("=")[0]);
}
// photo media keys like CIAB...
const keys = [...clean.matchAll(/CIAB[A-Za-z0-9_\-+/=]+/g)].map((m) => m[0]);
console.log("urls", urls.size, "keys", keys.length);
fs.writeFileSync(path.join(OUT, "preview-urls.txt"), [...urls].join("\n"));
fs.writeFileSync(path.join(OUT, "preview-keys.txt"), keys.slice(0, 100).join("\n"));

// Also try listentityphotos with encoded place
const place = "0x3bcb99ad4b2530af:0xd69c1fbf85707b5e";
const photoList =
  "https://www.google.com/maps/rpc/photo/listentityphotos?authuser=0&hl=en&gl=in&pb=" +
  encodeURIComponent(
    `!1e3!5m54!2m2!1i203!2i100!3m2!2i40!5b1!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e3!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e3!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e9!2b0!3e3!1m3!1e9!2b1!3e2!3b0!12m4!2b1!3b1!5i1!16b1!14m1!1e3!22m1!1e81!29M$${place}!5m1!1e3`
  );
const pl = await get(photoList);
fs.writeFileSync(path.join(OUT, "listphotos.txt"), pl.buf.toString("utf8"));
console.log("listphotos", pl.status, pl.buf.length);

let n = 1;
for (const base of urls) {
  if (!base.includes("googleusercontent")) continue;
  if (base.includes("default-user") || base.includes("maps/vt")) continue;
  const dl = base.includes("=s") ? base : base + "=s1600";
  try {
    const r = await get(dl);
    const ct = String(r.headers["content-type"] || "");
    if (r.status !== 200 || r.buf.length < 10000 || !ct.includes("image")) {
      console.log("skip", base.slice(-40), r.status, r.buf.length, ct);
      continue;
    }
    const dest = path.join(OUT, `gmaps-${String(n).padStart(2, "0")}.jpg`);
    fs.writeFileSync(dest, r.buf);
    console.log("saved", dest, r.buf.length);
    n++;
    if (n > 25) break;
  } catch (e) {
    console.log("fail", e.message);
  }
}
