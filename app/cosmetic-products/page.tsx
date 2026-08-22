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
const catalogProducts = getProductsByCategory("cosmetic");

export const metadata: Metadata = {
  title: "Cosmetic Products - S V Healthcare",
  description:
    "Discover high quality cosmetic products from S V Healthcare. Providing innovative skincare, haircare and beauty solutions trusted globally for excellence and safety.",
  keywords: [
    "Cosmetic Products",
    "skincare",
    "haircare",
    "beauty solutions",
    "cosmetic exporter",
  ],
  alternates: { canonical: "/cosmetic-products" },
  openGraph: {
    title: "Cosmetic Products - S V Healthcare",
    description:
      "Discover high quality cosmetic products from S V Healthcare. Providing innovative skincare, haircare and beauty solutions trusted globally for excellence and safety.",
    url: "/cosmetic-products",
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [
      {
        url: "/images/products/cosmetic-hero.webp",
        width: 1024,
        height: 1024,
        alt: "VR ANTI AGEING SERUM 30ML AMAZON SLIDES-4",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmetic Products - S V Healthcare",
    description:
      "Innovative skincare, haircare and beauty solutions trusted globally for excellence and safety.",
    images: ["/images/products/cosmetic-hero.webp"],
  },
};

const productRanges = [
  {
    title: "Skin Care",
    items: [
      "Moisturizers & Hydration Creams",
      "Anti-Aging Solutions",
      "Cleansers & Toners",
      "Sunscreens",
      "Serums & Treatments",
    ],
  },
  {
    title: "Hair Care",
    items: [
      "Shampoos & Conditioners",
      "Hair Serums & Oils",
      "Hair Masks",
    ],
  },
  {
    title: "Body Care",
    items: [
      "Body Lotions & Butters",
      "Body Scrubs & Exfoliators",
      "Hand & Foot Care",
    ],
  },
  {
    title: "Cosmetic & Makeup Products",
    items: ["Foundations & BB Creams", "Lip Care", "Eye Care"],
  },
];

const regions = [
  {
    title: "Southeast Asia",
    text: "Myanmar, Cambodia, Vietnam, Hong Kong, and Sri Lanka.",
  },
  {
    title: "Central Asia and CIS",
    text: "Uzbekistan, Kazakhstan, Turkmenistan.",
  },
  {
    title: "Africa",
    text: "Nigeria, Ghana, Zambia and Kenya.",
  },
  {
    title: "Latin America",
    text: "Bolivia, Chile, Ecuador, Honduras and Guatemala.",
  },
];

const productSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${baseUrl}/cosmetic-products/#webpage`,
      url: `${baseUrl}/cosmetic-products/`,
      name: "Cosmetic Products - S V Healthcare",
      description:
        "Discover high quality cosmetic products from S V Healthcare. Providing innovative skincare, haircare and beauty solutions trusted globally for excellence and safety.",
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
          name: "Cosmetic Products",
          item: `${baseUrl}/cosmetic-products/`,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Cosmetic Products",
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

export default function CosmeticProductsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Cosmetic Products"
          description="Innovative skincare, haircare and beauty solutions trusted globally for excellence and safety."
          image="/images/products/cosmetic-hero.webp"
          imageAlt="VR ANTI AGEING SERUM 30ML AMAZON SLIDES-4"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Cosmetic Products" },
          ]}
        />

        <ProductCatalogGrid
          products={catalogProducts}
          heading="Cosmetic product range"
        />

        <section className="section product-overview-section">
          <div className="container product-overview-layout">
            <Reveal className="section-copy" y={40}>
              <div className="eyebrow">
                <span />
                Portfolio overview
              </div>
              <h2>Cosmetic Products</h2>
              <p>
                S V Healthcare is a leading exporter of high-quality cosmetics
                products, offering a diverse range of beauty and skin care
                solutions to the international markets. Focusing on innovation,
                safety, and efficacy, our cosmetics are designed to meet the
                diverse needs of consumers around the world. Our products are
                formulated using advanced formulations that combine natural
                ingredients with the latest scientific research, ensuring that
                they deliver visible results while being gentle on the skin.
              </p>

              <h3>Product Range:</h3>
              <p>
                Our comprehensive cosmetics portfolio includes products across
                several key categories:
              </p>
              <div className="product-region-grid">
                {productRanges.map((range) => (
                  <article key={range.title}>
                    <h4>{range.title}</h4>
                    <ul className="product-category-list product-category-list-single">
                      {range.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
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
                At S V Healthcare, quality is at the core of everything we do.
                Our cosmetics are manufactured in state-of-the-art facilities that
                comply with international GMP (Good Manufacturing Practice)
                standards. We use high-quality raw materials, and our formulations
                undergo rigorous testing to ensure safety, efficacy, and
                consistency.
              </p>

              <h3>Innovation and Research</h3>
              <p>
                S V Healthcare is dedicated to continuous innovation in the
                cosmetics industry. Our R&D team focuses on developing new
                formulations incorporating the latest skincare and beauty trends
                and technologies. We strive to offer products that not only meet
                the current demands of consumers but also anticipate future needs.
              </p>

              <h3>Commitment to Beauty and Health</h3>
              <p>
                S V Healthcare mission is to enhance global beauty and health
                through the export of the finest cosmetic products. We are
                committed to expanding our product range and entering new markets
                to reach a wider audience. Our dedication to quality, innovation
                and customer satisfaction makes us a trusted partner in the global
                cosmetics industry.
              </p>
              <p>
                By choosing S V Healthcare, you are associating with a brand that
                values beauty, health and wellness, providing top-quality{" "}
                <strong>cosmetics products</strong> that have made a difference in
                the lives of consumers around the world.
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
