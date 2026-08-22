import productsData from "./products-data.json";

export type ProductCategory =
  | "pharmaceutical"
  | "nutraceutical"
  | "cosmetic";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  categoryHref: string;
  form: string;
  image: string;
  shortDescriptionHtml: string;
  descriptionHtml: string;
  seoTitle: string;
  seoDescription: string;
};

export const products = productsData as Product[];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory) {
  return products
    .filter((product) => product.category === category)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter(
      (item) =>
        item.category === product.category && item.slug !== product.slug,
    )
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function getAllProductSlugs() {
  return products.map((product) => product.slug);
}
