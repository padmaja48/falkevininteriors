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
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-IN,en;q=0.9",
          Cookie: "CONSENT=YES+",
        },
      },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location &&
          redirects < 5
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

function findUrls(text) {
  const set = new Set();
  // gps-cs-s style (business photos)
  const patterns = [
    /https:\/\/lh3\.googleusercontent\.com\/gps-cs-s\/[A-Za-z0-9_\-]+/g,
    /https:\/\/lh3\.googleusercontent\.com\/p\/[A-Za-z0-9_\-]+/g,
    /https:\/\/lh3\.googleusercontent\.com\/a-[^\s"'\\]+/g,
    /lh3\.googleusercontent\.com\\\/gps-cs-s\\\/[A-Za-z0-9_\\\-]+/g,
  ];
  for (const re of patterns) {
    for (const m of text.matchAll(re)) {
      let u = m[0].replace(/\\\//g, "/");
      if (!u.startsWith("http")) u = "https://" + u;
      // strip size params / trailing junk
      u = u.split("=")[0].split("\\")[0];
      set.add(u);
    }
  }
  return [...set];
}

const placeHex = "0x3bcb99ad4b2530af:0xd69c1fbf85707b5e";

const tries = [
  // App-style maps data
  `https://www.google.com/maps/_/js/i18n_data?hl=en`,
  // place with /data photos parameter open
  `https://www.google.com/maps/place/Falkevin+Interior+Designers/@17.3919528,78.4757716,17z/data=!4m10!1m2!2m1!1sFalkevin+Interior+Designers!3m6!1s${placeHex}!8m2!3d17.3919528!4d78.4757716!16s%2Fg%2F11t_lqmc2j!11m1!2e1?entry=ttu`,
  // reviews / posts often include photos
  `https://www.google.com/maps/rpc/listugcposts?authuser=0&hl=en&gl=in&pb=!1m7!1s${placeHex}!3s!6m2!4b1!7i20!9b0!2m2!1i10!2i10!5m2!1s!7e81!8m5!1b1!2b1!3b1!5b1!7b1!11m4!1e3!2e1!6m1!1i0!13m1!1e2`,
  // Facebook page
  `https://www.facebook.com/552957811242179`,
  `https://m.facebook.com/552957811242179`,
];

const all = new Set();
for (const [i, url] of tries.entries()) {
  try {
    console.log("try", i, url.slice(0, 90));
    const { status, buf } = await get(url);
    const text = buf.toString("utf8");
    fs.writeFileSync(path.join(OUT, `page-${i}.txt`), text.slice(0, 400000));
    const urls = findUrls(text);
    // also facebook cdn
    for (const m of text.matchAll(
      /https:\\\/\\\/scontent[^"'\\\s]+|https:\/\/scontent[^"'\\\s]+/g
    )) {
      urls.push(m[0].replace(/\\\//g, "/").replace(/&amp;/g, "&"));
    }
    console.log("  status", status, "len", buf.length, "urls", urls.length);
    urls.forEach((u) => all.add(u));
  } catch (e) {
    console.log("  fail", e.message);
  }
}

console.log("TOTAL", all.size);
fs.writeFileSync(path.join(OUT, "all-urls.txt"), [...all].join("\n"));

let n = 0;
for (const base of all) {
  if (n >= 30) break;
  // prefer google business photos
  if (!base.includes("googleusercontent") && !base.includes("scontent")) continue;
  n++;
  const url = base.includes("googleusercontent")
    ? base + "=s1600"
    : base;
  try {
    const { status, buf, headers } = await get(url);
    const ct = String(headers["content-type"] || "");
    if (status !== 200 || buf.length < 8000) {
      console.log("skip", n, status, buf.length);
      continue;
    }
    const ext = ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : "jpg";
    const dest = path.join(OUT, `photo-${String(n).padStart(2, "0")}.${ext}`);
    fs.writeFileSync(dest, buf);
    console.log("saved", dest, buf.length);
  } catch (e) {
    console.log("dl fail", n, e.message);
  }
}
