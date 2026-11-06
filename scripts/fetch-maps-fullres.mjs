import https from "https";
import fs from "fs";
import path from "path";

const OUT = "_import/maps-photos/full";
fs.mkdirSync(OUT, { recursive: true });

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
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

const urls = fs
  .readFileSync("_import/maps-photos/preview-urls.txt", "utf8")
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean)
  .filter(
    (u) =>
      u.includes("grass-cs") ||
      u.includes("geougc") ||
      u.includes("gps-cs-s")
  );

console.log("candidates", urls.length);
let n = 0;
for (const base of urls) {
  n++;
  const dl = base + "=s0";
  try {
    const r = await get(dl);
    const ct = String(r.headers["content-type"] || "");
    if (r.status !== 200 || r.buf.length < 40000 || !ct.includes("image")) {
      console.log("skip", n, r.status, r.buf.length, ct);
      continue;
    }
    const dest = path.join(OUT, `maps-${String(n).padStart(2, "0")}.jpg`);
    fs.writeFileSync(dest, r.buf);
    console.log("saved", dest, r.buf.length);
  } catch (e) {
    console.log("fail", n, e.message);
  }
}
