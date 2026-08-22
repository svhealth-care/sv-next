import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ProductCatalogGrid } from "@/components/ProductCatalogGrid";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getProductsByCategory } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/site-config";

const baseUrl = SITE_CONFIG.url;
const catalogProducts = getProductsByCategory("nutraceutical");

export const metadata: Metadata = {
  title: "Nutraceutical Products - S V Healthcare",
  description:
    "S V Healthcare is a leading exporter of nutraceutical products, providing a wide range of health supplements and wellness solutions to global markets.",
  keywords: [
    "Nutraceutical Products",
    "nutraceutical exporter",
    "health supplements",
    "wellness solutions",
    "GMP nutraceutical products",
  ],
  alternates: { canonical: "/nutraceutical-products" },
  openGraph: {
    title: "Nutraceutical Products - S V Healthcare",
    description:
      "S V Healthcare is a leading exporter of nutraceutical products, providing a wide range of health supplements and wellness solutions to global markets.",
    url: "/nutraceutical-products",
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [
      {
        url: "/images/products/nutraceutical-hero.webp",
        width: 1024,
        height: 1024,
        alt: "Vitamin-B-Complex-SV healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutraceutical Products - S V Healthcare",
    description:
      "Health supplements and wellness solutions from a trusted nutraceutical exporter.",
    images: ["/images/products/nutraceutical-hero.webp"],
  },
};

const productRange = [
  {
    title: "Vitamins and Minerals",
    text: "Essential for maintaining overall health and preventing nutrient deficiencies.",
  },
  {
    title: "Probiotics and Prebiotics",
    text: "Promote gut health and enhance digestive function.",
  },
  {
    title: "Herbal Supplements",
    text: "Derived from natural plant sources, these supplements are used for various health benefits, such as boosting immunity, reducing stress, and supporting heart health.",
  },
  {
    title: "Amino Acids & Protein Supplements",
    text: "Important for muscle growth, repair, and overall metabolic health.",
  },
  {
    title: "Antioxidants",
    text: "Help protect the body from oxidative stress and reduce the risk of chronic diseases.",
  },
  {
    title: "Weight Management Products",
    text: "Formulated to support healthy weight loss and management.",
  },
  {
    title: "Joint & Bone Health Supplements",
    text: "Targeted formulations to support bone density and joint function.",
  },
];

const regions = [
  {
    title: "Southeast Asia",
    text: "Myanmar, Cambodia, Philippines, Vietnam, Hong Kong, Mongolia and Sri Lanka.",
  },
  {
    title: "Central Asia and CIS",
    text: "Yemen, Uzbekistan, Kazakhstan, Turkmenistan and Georgia.",
  },
  {
    title: "Africa",
    text: "Nigeria, Ghana, Zambia and Kenya.",
  },
  {
    title: "Latin America",
    text: "Bolivia, Chile, Ecuador, Honduras and Guatemala.",
  },
  {
    title: "Western Asia",
    text: "Azerbaijan.",
  },
];

const productSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${baseUrl}/nutraceutical-products/#webpage`,
      url: `${baseUrl}/nutraceutical-products/`,
      name: "Nutraceutical Products - S V Healthcare",
      description:
        "S V Healthcare is a leading exporter of nutraceutical products, providing a wide range of health supplements and wellness solutions to global markets.",
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${baseUrl}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${baseUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Nutraceutical Products",
          item: `${baseUrl}/nutraceutical-products/`,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Nutraceutical Products",
      numberOfItems: catalogProducts.length,
      itemListElement: catalogProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        description: product.name,
      })),
    },
  ],
};

export default function NutraceuticalProductsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Nutraceutical Products"
          description="A wide range of health supplements and wellness solutions for global markets."
          image="/images/products/nutraceutical-hero.webp"
          imageAlt="Vitamin-B-Complex-SV healthcare"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Nutraceutical Products" },
          ]}
        />

        <ProductCatalogGrid
          products={catalogProducts}
          heading="Nutraceutical product range"
        />

        <section className="section product-overview-section">
          <div className="container product-overview-layout">
            <Reveal className="section-copy" y={40}>
              <div className="eyebrow">
                <span />
                Portfolio overview
              </div>
              <h2>Nutraceutical Products</h2>
              <p>
                S V Healthcare is a leading exporter of nutraceutical products,
                providing a wide range of health supplements and wellness
                solutions to global markets. Nutraceuticals, which are a blend of
                “nutrition” and “pharmaceutical,” are products derived from food
                sources that provide additional health benefits beyond basic
                nutrition. These products play a vital role in improving health,
                preventing chronic diseases, and enhancing overall well-being.
              </p>

              <h3>Product Range:</h3>
              <p>
                Our nutraceutical portfolio includes a wide variety of products
                designed to support various aspects of health:
              </p>
              <div className="product-region-grid">
                {productRange.map((item) => (
                  <article key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>

              <h3>Global Reach:</h3>
              <p>
                S V Healthcare has successfully expanded its presence in several
                regions:
              </p>
              <div className="product-region-grid">
                {regions.map((region) => (
                  <article key={region.title}>
                    <h4>{region.title}</h4>
                    <p>{region.text}</p>
                  </article>
                ))}
              </div>

              <h3>Quality Assurance:</h3>
              <p>
                S V Healthcare is committed to delivering{" "}
                <strong>nutraceutical products</strong> that meet the highest
                quality standards. Our products are manufactured in GMP-certified
                facilities, ensuring they are safe, effective, and compliant with
                international regulations. We use only high-quality raw materials
                and employ rigorous testing protocols to ensure the purity and
                potency of our products.
              </p>

              <h3>Innovation and Research</h3>
              <p>
                At S V Healthcare, we continuously invest in research and
                development to innovate and expand our nutraceutical product
                offerings. Our team of scientists and nutritionists work
                tirelessly to develop new formulations that meet the emerging
                health needs of our global customers.
              </p>

              <h3>Commitment to Global Health</h3>
              <p>
                S V Healthcare mission is to improve global health through the{" "}
                <strong>export of high-quality nutraceutical products</strong>.
                We are dedicated to expanding our reach, with plans to enhance
                our product offerings and enter new markets. Our commitment to
                excellence, quality and customer satisfaction makes us a trusted
                partner in the global nutraceutical industry.
              </p>
              <p>
                By choosing S V Healthcare, you are partnering with a company
                that prioritizes health and wellness, providing top-notch
                nutraceutical products to support a healthier world.
              </p>

              <div className="about-intro-actions">
                <ButtonLink href="/contact-us">
                  Request a product list <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink variant="outline" href="/our-services">
                  Explore our services
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <UtilityButtons />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
