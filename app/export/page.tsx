import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Pill,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SITE_CONFIG } from "@/lib/site-config";

const baseUrl = SITE_CONFIG.url;

const pageTitle = "Top Pharma Export From India";
const pageDescription =
  "Discover top pharma export from India, offering high-quality pharmaceutical products to global markets. Trusted for excellence, innovation, and reliability.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "top pharma export from India",
    "pharma export companies in India",
    "top pharma exporters in India",
    "pharma exports from India",
    "WHO-GMP pharmaceutical exporter",
    "EUGMP certified exporter",
    "pharmaceutical export India",
    "S V Healthcare export",
  ],
  alternates: { canonical: "/export/" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/export/",
    siteName: "SV Healthcare",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "/images/export/export-hero.webp",
        width: 528,
        height: 750,
        alt: "Top Pharma Export from India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/export/export-hero.webp"],
  },
};

const productOfferings = [
  {
    title: "Pharmaceutical",
    description:
      "Pharmaceutical products include prescription drugs and over-the-counter medicines available in various forms for the treatment and prevention of diseases.",
    href: "/pharmaceutical-products",
    icon: Pill,
    className: "blue",
  },
  {
    title: "Nutraceutical",
    description:
      "Nutraceutical products blur the line between food and medicine and provide health benefits in pill, powder, or liquid form.",
    href: "/nutraceutical-products",
    icon: Leaf,
    className: "green",
  },
  {
    title: "Cosmetic",
    description:
      "Cosmetic products enhance or protect your appearance, including makeup, skin care, hair care, and fragrances.",
    href: "/cosmetic-products",
    icon: Sparkles,
    className: "pink",
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

const exportSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${baseUrl}/export/#webpage`,
      url: `${baseUrl}/export/`,
      name: pageTitle,
      description: pageDescription,
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${baseUrl}/#organization` },
      inLanguage: "en-US",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/export/export-hero.webp`,
      },
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
          name: "Export",
          item: `${baseUrl}/export/`,
        },
      ],
    },
  ],
};

export default function ExportPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Export"
          description={pageDescription}
          image="/images/export/export-hero.webp"
          imageAlt="Top Pharma Export from India"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Export" },
          ]}
        />

        <section className="section export-intro-section">
          <div className="container">
            <Reveal className="section-heading centered" y={36}>
              <div className="eyebrow">
                <span />
                Global pharmaceutical trade
              </div>
              <h2>Leading Pharma Exporter from India</h2>
            </Reveal>
            <Reveal className="section-copy export-intro-copy" y={40}>
              <p>
                S V Healthcare is a leading name in pharmaceutical exports from
                India and is recognized as one of the top pharma export companies
                in the country. As a WHO-GMP-certified company based in
                Ahmedabad, Gujarat, we are dedicated to improving global health
                through rigorous research, manufacturing, and marketing. Our
                commitment to excellence has made us one of the leading pharma
                exporters in India, providing safe and effective pharmaceutical
                products worldwide.
              </p>
              <p>
                With a team of experienced experts and professionals, S V
                Healthcare has successfully expanded its global reach and
                continues to strengthen its presence in international markets. We
                remain focused on expanding our reach and enhancing our diverse
                portfolio of{" "}
                <Link href="/pharmaceutical-products">pharmaceutical</Link> and{" "}
                <Link href="/nutraceutical-products">nutraceutical</Link>{" "}
                products to meet the evolving needs of global healthcare.
              </p>
              <p>
                Our wide range of pharmaceutical formulations includes analgesics,
                anti-inflammatory medicines, antispasmodics, diuretics,
                prokinetics, gut relaxants, urogenital medicines, anti-asthmatic
                medicines, antibacterial medicines, cardiac medicines, and more.
                We offer these products in various forms, including tablets,
                capsules, syrups, ointments, and creams, helping ensure effective
                treatment and patient care.
              </p>
              <p>
                As a leading pharma export company, we have established strong
                global partnerships across Southeast Asia, Central Asia, Africa,
                Western Asia, and Latin America. Our adherence to strict quality
                standards and multiple international certifications ensures that
                our products meet global regulatory requirements and provide
                effective healthcare solutions.
              </p>
              <p>
                At S V Healthcare, our mission goes beyond business. Our goal is
                to expand our global presence, harmonize our operations, and
                build a sustainable culture of quality within the pharmaceutical
                industry. Our dedication to quality, innovation, and excellence
                makes us a preferred choice among leading pharma export companies
                in India as we continue to meet the growing global demand for
                high-quality medicines.
              </p>
            </Reveal>
          </div>
        </section>

        <section
          className="section categories-section"
          id="product-offerings"
          aria-labelledby="product-offerings-heading"
        >
          <div className="container">
            <Reveal className="section-heading centered" y={36}>
              <div className="eyebrow">
                <span />
                What we deliver
              </div>
              <h2 id="product-offerings-heading">Product Offerings</h2>
            </Reveal>
            <Stagger className="category-grid" stagger={0.14}>
              {productOfferings.map((category, index) => {
                const Icon = category.icon;
                return (
                  <StaggerItem key={category.title}>
                    <Link
                      className={`category-card ${category.className}`}
                      href={category.href}
                    >
                      <span className="category-number">0{index + 1}</span>
                      <div className="category-icon">
                        <Icon />
                      </div>
                      <h3>{category.title}</h3>
                      <p>{category.description}</p>
                      <span className="card-link">
                        Explore division <ArrowRight />
                      </span>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section className="section export-reach-section" id="pharma-export">
          <div className="container split-layout">
            <Reveal className="about-visual" y={56} scale={0.94}>
              <div className="image-frame about-image-frame">
                <Image
                  src="/images/export/export-hero.webp"
                  alt="Top Pharma Export from India"
                  fill
                  sizes="(max-width: 900px) 90vw, 48vw"
                />
              </div>
            </Reveal>
            <Reveal className="section-copy" delay={0.12} y={40}>
              <div className="eyebrow">
                <span />
                Worldwide markets
              </div>
              <h2>Pharma Export</h2>
              <p>
                S V Healthcare has achieved significant success as a leading
                exporter with a portfolio of 500 products across 20 countries. We
                specialize in three core categories:{" "}
                <Link href="/pharmaceutical-products">pharmaceuticals</Link>,{" "}
                <Link href="/nutraceutical-products">nutraceuticals</Link> and{" "}
                <Link href="/cosmetic-products">cosmetics</Link>.
              </p>
              <p>Our global reach spans across multiple regions:</p>
              <div className="product-region-grid">
                {regions.map((region) => (
                  <article key={region.title}>
                    <h4>{region.title}</h4>
                    <p>{region.text}</p>
                  </article>
                ))}
              </div>
              <p>
                S V Healthcare is committed to expanding its global footprint,
                providing high quality products that meet international standards
                and serving diverse markets with tailored solutions.
              </p>
              <div className="about-intro-actions">
                <ButtonLink href="/contact-us">
                  Partner with us <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink variant="outline" href="/pharmaceutical-products">
                  View products
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="services-exporter-section">
          <div className="container services-exporter-grid">
            <Reveal className="services-exporter-copy" y={40}>
              <div className="eyebrow">
                <span />
                Certified global exporter
              </div>
              <h2>
                S V Healthcare – WHO-GMP & EU GMP-Certified Pharmaceutical &
                Nutraceutical Exporter
              </h2>
              <p>
                S V Healthcare is a trusted WHO-GMP and EU GMP-certified{" "}
                <strong>
                  exporter of{" "}
                  <Link href="/pharmaceutical-products">pharmaceuticals</Link>{" "}
                  and{" "}
                  <Link href="/nutraceutical-products">nutraceuticals</Link>
                </strong>
                , supplying high-quality products to markets across the globe.
                With a strong commitment to international standards, innovation,
                and safety, we ensure that our products meet rigorous quality
                requirements, making us a preferred partner for global
                healthcare solutions.
              </p>
              <div className="about-intro-actions">
                <ButtonLink href="/pharmaceutical-products">
                  Explore products <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink variant="outline" href="/about-us">
                  About S V Healthcare
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal className="about-visual" delay={0.12} y={56} scale={0.94}>
              <div className="image-frame about-image-frame">
                <Image
                  src="/images/export/pharma-export-global.webp"
                  alt="Contact Best Pharma Companies in India-S V Healthcare"
                  fill
                  sizes="(max-width: 900px) 90vw, 48vw"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <UtilityButtons />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(exportSchema) }}
      />
    </>
  );
}
