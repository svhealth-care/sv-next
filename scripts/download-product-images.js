/**
 * Download product images from WooCommerce URLs into public/images/products/{category}/
 * Reuses existing local files when present.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const items = require("./product-image-urls.json");
const root = path.join(__dirname, "..", "public", "images", "products");

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    client
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(true)));
      })
      .on("error", (err) => {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
  });
}

(async () => {
  let ok = 0;
  let skipped = 0;
  let failed = 0;
  for (const item of items) {
    const dir = path.join(root, item.category);
    fs.mkdirSync(dir, { recursive: true });
    const dest = path.join(dir, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      skipped++;
      continue;
    }
    try {
      await download(item.url, dest);
      ok++;
      console.log("downloaded", item.file);
    } catch (e) {
      failed++;
      console.log("FAIL", item.slug, e.message);
    }
  }
  console.log({ ok, skipped, failed, total: items.length });
})();
