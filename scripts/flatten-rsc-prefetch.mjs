/**
 * Next.js static export stores RSC payloads as nested folders:
 *   product/{slug}/__next.product/$d$slug/__PAGE__.txt
 * but the client prefetches dotted filenames:
 *   product/{slug}/__next.product.$d$slug.__PAGE__.txt
 *
 * Apache rewrite of "$" in paths is unreliable on cPanel, so copy
 * each nested __PAGE__.txt to the dotted filename Next requests.
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const pageFiles = walk(outDir).filter(
  (file) => path.basename(file) === "__PAGE__.txt",
);

let created = 0;

for (const pageFile of pageFiles) {
  const parentDir = path.dirname(pageFile); // .../__next.product/$d$slug
  const segmentDir = path.dirname(parentDir); // .../__next.product  OR page root
  const leaf = path.basename(parentDir); // $d$slug OR __next.about-us
  const segmentName = path.basename(segmentDir);

  let target;

  if (segmentName.startsWith("__next.")) {
    // Nested: .../__next.product/$d$slug/__PAGE__.txt
    // → .../__next.product.$d$slug.__PAGE__.txt
    target = path.join(
      path.dirname(segmentDir),
      `${segmentName}.${leaf}.__PAGE__.txt`,
    );
  } else if (leaf.startsWith("__next.")) {
    // Flat: .../__next.about-us/__PAGE__.txt
    // → .../__next.about-us.__PAGE__.txt
    target = path.join(segmentDir, `${leaf}.__PAGE__.txt`);
  } else {
    continue;
  }

  fs.copyFileSync(pageFile, target);
  created += 1;
}

console.log(`flatten-rsc-prefetch: created ${created} dotted RSC files`);
