const fs = require("fs");
const path = "d:/Vrushabh/sv_next/lib/products-data.json";
const products = JSON.parse(fs.readFileSync(path, "utf8"));

function decode(s) {
  return String(s)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

let n = 0;
for (const p of products) {
  const before = p.name;
  p.name = decode(p.name);
  p.seoTitle = decode(p.seoTitle || "");
  p.seoDescription = decode(p.seoDescription || "");
  if (p.name !== before) n += 1;
}

fs.writeFileSync(path, JSON.stringify(products, null, 2));
console.log("decoded names", n, "total", products.length);
