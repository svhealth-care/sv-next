const fs = require("fs");

function stripProductsAndWire(file, category, heading) {
  let s = fs.readFileSync(file, "utf8");
  s = s.replace(/import Image from "next\/image";\r?\n/, "");

  if (!s.includes("ProductCatalogGrid")) {
    s = s.replace(
      'import { ContactForm } from "@/components/ContactForm";',
      'import { ContactForm } from "@/components/ContactForm";\nimport { ProductCatalogGrid } from "@/components/ProductCatalogGrid";',
    );
    s = s.replace(
      'import { SITE_CONFIG } from "@/lib/site-config";',
      'import { getProductsByCategory } from "@/lib/products";\nimport { SITE_CONFIG } from "@/lib/site-config";',
    );
  }

  if (!s.includes("const catalogProducts")) {
    s = s.replace(
      "const baseUrl = SITE_CONFIG.url;",
      `const baseUrl = SITE_CONFIG.url;\nconst catalogProducts = getProductsByCategory("${category}");`,
    );
  }

  s = s.replace(/const products = \[[\s\S]*?\];\r?\n\r?\n/, "");

  s = s.replace(
    /<section className="section product-catalog-section"[\s\S]*?<\/section>\r?\n\r?\n\s*<section className="section product-overview-section">/,
    `<ProductCatalogGrid\n          products={catalogProducts}\n          heading="${heading}"\n        />\n\n        <section className="section product-overview-section">`,
  );

  s = s.replace(
    /numberOfItems: products\.length,/g,
    "numberOfItems: catalogProducts.length,",
  );
  s = s.replace(
    /itemListElement: products\.map/g,
    "itemListElement: catalogProducts.map",
  );
  s = s.replace(
    /description: `\$\{product\.name\} \$\{product\.strength\}`/g,
    "description: product.name",
  );

  fs.writeFileSync(file, s);
  console.log("updated", file);
}

stripProductsAndWire(
  "d:/Vrushabh/sv_next/app/pharmaceutical-products/page.tsx",
  "pharmaceutical",
  "Pharmaceutical product range",
);
stripProductsAndWire(
  "d:/Vrushabh/sv_next/app/nutraceutical-products/page.tsx",
  "nutraceutical",
  "Nutraceutical product range",
);
stripProductsAndWire(
  "d:/Vrushabh/sv_next/app/cosmetic-products/page.tsx",
  "cosmetic",
  "Cosmetic product range",
);
