import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const PLACE = "0x3bcb99ad4b2530af:0xd69c1fbf85707b5e";
const OUT = "_import/maps-photos";
fs.mkdirSync(OUT, { recursive: true });

function get(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "*/*",
          "Accept-Language": "en-IN,en;q=0.9",
        },
      },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          return get(res.headers.location).then(resolve, reject);
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
    req.setTimeout(45000, () => {
      req.destroy(new Error("timeout"));
    });
  });
}

function extractUrls(text) {
  const urls = new Set();
  const re =
    /https:\/\/lh3\.googleusercontent\.com\/(?:gps-cs-s|p|a)\/[A-Za-z0-9_\-=]+/g;
  let m;
  while ((m = re.exec(text))) {
    urls.add(m[0]);
  }
  // also escaped forms
  const re2 =
    /https:\\\/\\\/lh3\.googleusercontent\.com\\\/(?:gps-cs-s|p|a)\\\/[A-Za-z0-9_\\\-=]+/g;
  while ((m = re2.exec(text))) {
    urls.add(m[0].replace(/\\\//g, "/").replace(/\\u003d/g, "="));
  }
  return [...urls];
}

const endpoints = [
  // list entity photos RPC
  `https://www.google.com/maps/rpc/photo/listentityphotos?authuser=0&hl=en&gl=in&pb=!1e3!5m54!2m2!1i203!2i100!3m2!2i40!5b1!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e3!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e3!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e9!2b0!3e3!1m3!1e9!2b1!3e2!3b0!12m4!2b1!3b1!5i1!16b1!14m1!1e3!22m1!1e81!29M$${PLACE}!5m1!1e3`,
  // place page with photos open-ish
  `https://www.google.com/maps/place/?q=place_id:ChIJ_${PLACE}&hl=en`,
  // known photo from user link (full size)
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SKVlDtZHSBS1UCbjmTbwloApmRvn7jXSUJCn9x3RwFD_6mKw1bYQ0VI4TU5rk3AYwspU5jvLke4m3ANFQkoMUovMIvy94ZrL2ulB5fLCky-QEl8f904VlEzGM_rxbuIi3JGcQRjlIrchXv=w1920-h1080-k-no",
];

const all = new Set();

for (const url of endpoints.slice(0, 2)) {
  try {
    console.log("fetch", url.slice(0, 100) + "...");
    const { status, buf } = await get(url);
    const text = buf.toString("utf8");
    fs.writeFileSync(
      path.join(OUT, `resp-${endpoints.indexOf(url)}.txt`),
      text.slice(0, 500000)
    );
    console.log("status", status, "bytes", buf.length);
    for (const u of extractUrls(text)) all.add(u);
  } catch (e) {
    console.log("fail", e.message);
  }
}

// Also try the Google Maps search JSON-ish endpoint
try {
  const searchUrl = `https://www.google.com/search?tbm=map&authuser=0&hl=en&gl=in&q=Falkevin+Interior+Designers+Hyderabad&pb=!4m9!1m3!1d15200!2d78.4757716!3d17.3919528!2m0!3m2!1i1024!2i768!4f13.1!7i20!10b1!12m8!1m1!18b1!2m3!5m1!6e2!20e3!10b1!16b1!19m4!2m3!1i360!2i120!4i8!20m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e3!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e3!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e9!2b0!3e3!1m3!1e9!2b1!3e2!3b0!12m4!2b1!3b1!5i1!16b1!14m1!1e3!23i420!15m1!1e0`;
  const { status, buf } = await get(searchUrl);
  console.log("search status", status, buf.length);
  fs.writeFileSync(path.join(OUT, "search.txt"), buf.toString("utf8").slice(0, 800000));
  for (const u of extractUrls(buf.toString("utf8"))) all.add(u);
} catch (e) {
  console.log("search fail", e.message);
}

console.log("unique urls", all.size);
fs.writeFileSync(path.join(OUT, "urls.txt"), [...all].join("\n"));

// Download the known user photo + any found
const toDownload = [
  "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SKVlDtZHSBS1UCbjmTbwloApmRvn7jXSUJCn9x3RwFD_6mKw1bYQ0VI4TU5rk3AYwspU5jvLke4m3ANFQkoMUovMIvy94ZrL2ulB5fLCky-QEl8f904VlEzGM_rxbuIi3JGcQRjlIrchXv=s0",
  ...[...all].slice(0, 40).map((u) => (u.includes("=") ? u.replace(/=.*/, "=s0") : u + "=s0")),
];

let i = 0;
for (const url of [...new Set(toDownload)]) {
  i++;
  try {
    const { status, buf, headers } = await get(url);
    const ct = headers["content-type"] || "";
    if (status !== 200 || !ct.includes("image") || buf.length < 5000) {
      console.log("skip", i, status, ct, buf.length);
      continue;
    }
    const ext = ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : "jpg";
    const dest = path.join(OUT, `gmaps-${String(i).padStart(2, "0")}.${ext}`);
    fs.writeFileSync(dest, buf);
    console.log("saved", dest, buf.length);
  } catch (e) {
    console.log("dl fail", i, e.message);
  }
}
