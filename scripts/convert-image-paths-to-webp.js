const fs = require("fs");
const path = require("path");

const files = ["lib/products-data.json", "lib/blog-content.generated.ts"];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, "utf8");
  const before = (content.match(/\/images\/[^"']+\.(png|jpe?g)/gi) || []).length;
  content = content.replace(/(\/images\/[^"']+)\.(png|jpe?g)/gi, "$1.webp");
  fs.writeFileSync(filePath, content);
  const after = (content.match(/\/images\/[^"']+\.(png|jpe?g)/gi) || []).length;
  console.log(`${file}: updated ${before} paths, remaining old: ${after}`);
}
