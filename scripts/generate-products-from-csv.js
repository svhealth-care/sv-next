const fs = require("fs");
const path = require("path");

const csvPath =
  "c:/Users/Admin/Downloads/wc-product-export-10-8-2026-1786344708757.csv";
const text = fs.readFileSync(csvPath, "utf8");

function parseCsv(str) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    const n = str[i + 1];
    if (inQ) {
      if (c === '"' && n === '"') {
        cur += '"';
        i++;
      } else if (c === '"') inQ = false;
      else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && n === "\n") i++;
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
    } else cur += c;
  }
  if (cur.length || row.length) {
    row.push(cur);
    rows.push(row);
  }
  return rows;
}

const rows = parseCsv(text);
const headers = rows[0];
const idx = Object.fromEntries(headers.map((h, i) => [h, i]));
const published = rows.slice(1).filter((r) => r[idx.Published] === "1");

const urlSlugs = [
  "vr-anti-ageing-serum-30ml",
  "aceclofenac-paracetamol-tablets",
  "vr-glycolic-acid-facewash",
  "vr-vitamin-c-serum",
  "vr-hair-growth-serum",
  "albendazole-suspension",
  "ceftriaxone-sulbactam-injection",
  "ibuprofen-tablets",
  "ipratropium-bromide-inhaler",
  "pantoprazole-for-injection",
  "paracetamol-tablets-500-mg",
  "cefixime-suspension",
  "amoxicillin-and-potassium-clavulanate-625-mg-tablets",
  "naproxen-tablets",
  "dapagliflozin-tablets",
  "apixaban-tablets",
  "sitagliptin-metformin-tablets-50-500-mg",
  "metformin-glimepiride-tablets",
  "azithromycin-tablets",
  "glimepiride-tablets",
  "levofloxacin-tablets",
  "diclofenac-tablets",
  "meropenem-injection",
  "metformin-tablets",
  "sildenafil-tablets-50-mg",
  "diclofenac-sodium-injection",
  "paracetamol-infusion-1000-mg",
  "cefoperazone-sulbactam-injection",
  "metronidazole-infusion",
  "atorvastatin-tablets",
  "dexamethasone-sodium-phosphate-injection",
  "myo-inositol-d-chiro-inositol-chromium-vit-d3-capsule",
  "hair-multivitamin-tablets",
  "collagen-capsule",
  "women-fertility-support-tablets",
  "male-fertility-support-tablets",
  "biotin-2500mg-tablets",
  "hair-nail-skin-tablets",
  "vitamin-b-complex-tablets",
  "ferrous-bisglycinate-zinc-bisglycinate-folic-acid-methylcobalamin-tablets",
  "fat-burner-tablets",
  "multivitamin-tablets",
  "zinc-complex-tablets",
  "vitamin-d3-tablets",
  "multivitamin-multimineral",
  "multivitamin-multimineral-women-tablets",
  "multivitamin-multimineral-men-tablets",
  "multivitamin-multimineral-with-ginseng",
  "joint-support-tablets",
  "melatonin-tablets",
  "vitamin-c-tablets",
  "milk-thistle-extract-tablets",
  "vitamin-e-400-iu",
  "calcium-magnesium-zinc-tablets",
  "probiotic-capsule",
  "fish-oil-softgel-capsule",
  "grape-seed-extract-capsule",
  "l-arginine-tablets",
  "lactation-support-tablets",
  "glutathione-tablets",
  "ginseng-softgel-capsules",
  "cranberry-tablets",
  "amlodipine-tablets",
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function decodeHtml(s = "") {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\\n/g, "\n");
}

function stripHtml(s = "") {
  return decodeHtml(s)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferForm(name) {
  const n = name.toLowerCase();
  if (n.includes("injection")) return "Injection";
  if (n.includes("infusion")) return "Infusion";
  if (n.includes("inhaler")) return "Inhaler";
  if (n.includes("suspension")) return "Suspension";
  if (n.includes("facewash") || n.includes("face wash")) return "Facewash";
  if (n.includes("serum")) return "Serum";
  if (n.includes("softgel")) return "Softgel";
  if (n.includes("capsule")) return "Capsule";
  if (n.includes("gummies")) return "Gummies";
  if (n.includes("tablet")) return "Tablet";
  return "Product";
}

function mapCategory(cat) {
  const c = (cat || "").toLowerCase();
  if (c.includes("pharma"))
    return {
      key: "pharmaceutical",
      label: "Pharmaceutical",
      href: "/pharmaceutical-products",
    };
  if (c.includes("nutra"))
    return {
      key: "nutraceutical",
      label: "Nutraceutical",
      href: "/nutraceutical-products",
    };
  if (c.includes("cosmetic"))
    return { key: "cosmetic", label: "Cosmetic", href: "/cosmetic-products" };
  return {
    key: "pharmaceutical",
    label: cat,
    href: "/pharmaceutical-products",
  };
}

const special = {
  "aceclofenac-and-paracetamol-tablets": "aceclofenac-paracetamol-tablets",
  "ceftirox-sulbactum-injection": "ceftriaxone-sulbactam-injection",
  "cefti-rox-sulbactum-injection": "ceftriaxone-sulbactam-injection",
  "ceftriaxone-sulbactam-injection": "ceftriaxone-sulbactam-injection",
  "sitagliptin-and-metformin-tablet-50-500-mg":
    "sitagliptin-metformin-tablets-50-500-mg",
  "sitagliptin-metformin-tablet-50-500-mg":
    "sitagliptin-metformin-tablets-50-500-mg",
  "sitagliptin-metformin-tablets-50-500-mg":
    "sitagliptin-metformin-tablets-50-500-mg",
  "metformin-and-glimepiride-tablets": "metformin-glimepiride-tablets",
  "apixaban-tablet": "apixaban-tablets",
  "apixaban-tablets": "apixaban-tablets",
  "atorvastatin-tablet": "atorvastatin-tablets",
  "dapagliflozin-tablet": "dapagliflozin-tablets",
  "glimepiride-tablet": "glimepiride-tablets",
  "levofloxacin-tablet": "levofloxacin-tablets",
  "azithromyicin-tablets": "azithromycin-tablets",
  "diaclofenac-tablets": "diclofenac-tablets",
  "diclofenac-tablets": "diclofenac-tablets",
  "sefixime-suspension": "cefixime-suspension",
  "cefixime-suspension": "cefixime-suspension",
  "cefoperazone-sulbactum-injection": "cefoperazone-sulbactam-injection",
  "cefoperazone-sulbactam-injection": "cefoperazone-sulbactam-injection",
  "biotin-2500mg-tablets": "biotin-2500mg-tablets",
  "biotion-2500mg-tablets": "biotin-2500mg-tablets",
  "hair-nail-and-skin-tablets": "hair-nail-skin-tablets",
  "multivitamin-and-multimineral": "multivitamin-multimineral",
  "multivitamin-and-multimineral-women-tablets":
    "multivitamin-multimineral-women-tablets",
  "multivitamin-and-multimineral-men-tablets":
    "multivitamin-multimineral-men-tablets",
  "multivitamin-and-multimineral-with-ginseng":
    "multivitamin-multimineral-with-ginseng",
  "multivitamin-multimineral-with-ginseng-softgel":
    "multivitamin-multimineral-with-ginseng",
  "multivitamin-and-multimineral-with-ginseng-softgel":
    "multivitamin-multimineral-with-ginseng",
  "joint-support-tablets": "joint-support-tablets",
  "joint-support-tablets-2": "joint-support-tablets",
  "calcium-magnesium-and-zinc-tablets": "calcium-magnesium-zinc-tablets",
  "amlodipine-tablets": "amlodipine-tablets",
  "amlodipine-tablets-2": "amlodipine-tablets",
  "ferrous-bisglycinate-zinc-bisglycinate-folic-acid-and-methylcobalamin-tablets":
    "ferrous-bisglycinate-zinc-bisglycinate-folic-acid-methylcobalamin-tablets",
  "amoxicillin-and-potassium-clavulanate":
    "amoxicillin-and-potassium-clavulanate-625-mg-tablets",
  "amoxicillin-and-potassium-clavulanate-625-mg-tablets":
    "amoxicillin-and-potassium-clavulanate-625-mg-tablets",
  "vr-anti-ageing-serum-30ml": "vr-anti-ageing-serum-30ml",
  "vr-glycolic-acid-facewash-3d": "vr-glycolic-acid-facewash",
  "vr-glycolic-acid-facewash": "vr-glycolic-acid-facewash",
};

function matchSlug(name) {
  const s = slugify(name);
  if (urlSlugs.includes(s)) return s;
  if (special[s]) return special[s];
  const candidates = urlSlugs.filter(
    (u) =>
      s.includes(u) ||
      u.includes(s) ||
      s.replace(/-and-/g, "-") === u ||
      s.replace(/tablets$/, "tablet") === u ||
      s + "s" === u ||
      u + "s" === s,
  );
  if (candidates.length === 1) return candidates[0];
  return s;
}

const products = published.map((r) => {
  const name = r[idx.Name];
  const cat = mapCategory(r[idx.Categories]);
  const imageUrl = (r[idx.Images] || "").split(",")[0].trim();
  const file = decodeURIComponent(imageUrl.split("/").pop() || "");
  const slug = matchSlug(name);
  const shortHtml = decodeHtml(r[idx["Short description"]] || "");
  const descHtml = decodeHtml(r[idx.Description] || "");
  const seoDescription =
    stripHtml(shortHtml).slice(0, 160) || stripHtml(descHtml).slice(0, 160);
  return {
    slug,
    name,
    category: cat.key,
    categoryLabel: cat.label,
    categoryHref: cat.href,
    form: inferForm(name),
    image: `/images/products/${cat.key}/${file}`,
    wpImageUrl: imageUrl,
    wpImageFile: file,
    shortDescriptionHtml: shortHtml,
    descriptionHtml: descHtml,
    seoTitle: `${name} - S V Healthcare`,
    seoDescription,
  };
});

const used = new Set(products.map((p) => p.slug));
const unusedUrls = urlSlugs.filter((u) => !used.has(u));
const dups = products
  .map((p) => p.slug)
  .filter((s, i, a) => a.indexOf(s) !== i);

console.log("products", products.length);
console.log(
  "by cat",
  products.reduce((a, p) => {
    a[p.category] = (a[p.category] || 0) + 1;
    return a;
  }, {}),
);
console.log("unused url slugs", unusedUrls);
console.log("duplicate slugs", [...new Set(dups)]);
console.log(
  "slug map sample",
  products.slice(0, 8).map((p) => `${p.name} => ${p.slug}`),
);

fs.mkdirSync("d:/Vrushabh/sv_next/lib", { recursive: true });
fs.mkdirSync("d:/Vrushabh/sv_next/scripts", { recursive: true });
fs.writeFileSync(
  "d:/Vrushabh/sv_next/lib/products-data.json",
  JSON.stringify(
    products.map(({ wpImageUrl, wpImageFile, ...product }) => product),
    null,
    2,
  ),
);
fs.writeFileSync(
  "d:/Vrushabh/sv_next/scripts/product-image-urls.json",
  JSON.stringify(
    products.map((p) => ({
      slug: p.slug,
      category: p.category,
      url: p.wpImageUrl,
      file: p.wpImageFile,
    })),
    null,
    2,
  ),
);
console.log("wrote products-data.json");
