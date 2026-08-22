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
const catalogProducts = getProductsByCategory("pharmaceutical");

export const metadata: Metadata = {
  title: "Pharmaceutical Products - S V Healthcare",
  description:
    "Explore high quality pharmaceutical products from S V Healthcare, providing a wide range of safe and effective solutions. Trusted globally for excellence and innovation.",
  keywords: [
    "Pharmaceutical products",
    "pharmaceutical exporter",
    "WHO-GMP pharmaceutical products",
    "EUGMP certified medicines",
    "pharmaceutical tablets capsules syrups injections",
  ],
  alternates: { canonical: "/pharmaceutical-products" },
  openGraph: {
    title: "Pharmaceutical Products - S V Healthcare",
    description:
      "Explore high quality pharmaceutical products from S V Healthcare, providing a wide range of safe and effective solutions. Trusted globally for excellence and innovation.",
    url: "/pharmaceutical-products",
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [
      {
        url: "/images/products/pharmaceutical-hero.webp",
        width: 1024,
        height: 1024,
        alt: "Pharmaceutical products from S V Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharmaceutical Products - S V Healthcare",
    description:
      "High-quality WHO-GMP and EUGMP pharmaceutical products for global markets.",
    images: ["/images/products/pharmaceutical-hero.webp"],
  },
};

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

const therapeuticAreas = [
  "Analgesics and Anti-Inflammatories",
  "Antispasmodics and Urogenital Medications",
  "Cardiovascular and Antihypertensive Medications",
  "Antibacterial and Antimicrobials",
  "Anti-Asthma and Respiratory Medications",
  "Cold, Cough and Allergy Medications",
  "Gastrointestinal Medications",
];

const productSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${baseUrl}/pharmaceutical-products/#webpage`,
      url: `${baseUrl}/pharmaceutical-products/`,
      name: "Pharmaceutical Products - S V Healthcare",
      description:
        "Explore high quality pharmaceutical products from S V Healthcare, providing a wide range of safe and effective solutions. Trusted globally for excellence and innovation.",
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
          name: "Pharmaceutical Products",
          item: `${baseUrl}/pharmaceutical-products/`,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Pharmaceutical Products",
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

export default function PharmaceuticalProductsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Pharmaceutical Products"
          description="High-quality WHO-GMP and EUGMP pharmaceutical formulations for global healthcare partners."
          image="/images/products/pharmaceutical-hero.webp"
          imageAlt="Pharmaceutical products from S V Healthcare"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Pharmaceutical Products" },
          ]}
        />

        <ProductCatalogGrid
          products={catalogProducts}
          heading="Pharmaceutical product range"
        />

        <section className="section product-overview-section">
          <div className="container product-overview-layout">
            <Reveal className="section-copy" y={40}>
              <div className="eyebrow">
                <span />
                Portfolio overview
              </div>
              <h2>Pharmaceutical Products</h2>
              <p>
                S V Healthcare is a leading exporter of high-quality
                pharmaceutical products, committed to providing top-tier
                healthcare solutions to global markets. Our comprehensive product
                portfolio includes a wide range of formulations such as tablets,
                capsules, syrups, injections, ointments and creams that meet
                various therapeutic needs. These products are carefully developed
                in state-of-the-art facilities that adhere to stringent standards
                of WHO-GMP and EUGMP, ensuring the highest levels of safety,
                efficacy and quality.
              </p>

              <h3>Global Reach:</h3>
              <div className="product-region-grid">
                {regions.map((region) => (
                  <article key={region.title}>
                    <h4>{region.title}</h4>
                    <p>{region.text}</p>
                  </article>
                ))}
              </div>

              <h3>Product Categories:</h3>
              <p>
                Our pharmaceutical product range covers a number of therapeutic
                areas, including:
              </p>
              <ul className="product-category-list">
                {therapeuticAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>

              <h3>Quality and Compliance</h3>
              <p>
                At S V Healthcare, we place the highest priority on quality. Our{" "}
                <strong>pharmaceutical products</strong> undergo rigorous testing
                and validation processes to meet international regulatory
                standards. We maintain relevant certifications and regulatory
                approvals, including approvals from health authorities such as
                the Ghana Food and Drugs Authority, Kenya&apos;s Ministry of
                Health, and Nigeria&apos;s National Agency for Food and Drug
                Administration and Control (NAFDAC).
              </p>

              <h3>Commitment to Excellence</h3>
              <p>
                Our mission is to remain at the forefront of global healthcare by
                exporting pharmaceutical products that not only meet but exceed
                international standards. We are constantly exploring new markets,
                expanding our global reach, and continuously enhancing our product
                portfolio. S V Healthcare is dedicated to contributing to global
                health and well-being by making high-quality pharmaceutical
                products accessible to people around the world.
              </p>
              <p>
                S V Healthcare is more than just a{" "}
                <strong>pharmaceutical exporter</strong>. We are a trusted
                partner in global healthcare, committed to making high-quality
                medicines accessible to people worldwide.
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
