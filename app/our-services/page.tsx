import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { LocationMap } from "@/components/LocationMap";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import {
  ServiceOfferings,
  type ServiceOffering,
} from "@/components/ServiceOfferings";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { Reveal } from "@/components/motion/Reveal";
import { AppLink } from "@/components/ui/AppLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SITE_CONFIG } from "@/lib/site-config";

const baseUrl = SITE_CONFIG.url;

export const metadata: Metadata = {
  title: "Our Services - S V Healthcare",
  description:
    "S V Healthcare is one of the best pharmaceutical companies in India, committed to providing high-quality, innovative and affordable healthcare solutions globally.",
  keywords: [
    "best pharmaceutical companies in india",
    "top pharmaceutical companies in india",
    "about S V Healthcare",
    "S V Healthcare company details",
    "pharmaceutical regulatory affairs",
    "comparator drug sourcing RLD",
  ],
  alternates: { canonical: "/our-services" },
  openGraph: {
    title: "Our Services - S V Healthcare",
    description:
      "S V Healthcare is one of the best pharmaceutical companies in India, committed to providing high-quality, innovative and affordable healthcare solutions globally.",
    url: "/our-services",
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [
      {
        url: "/images/services/services-hero.webp",
        width: 1024,
        height: 1024,
        alt: "Medical Design Background Poster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services - S V Healthcare",
    description:
      "Product licensing, regulatory affairs, distribution and comparator drug sourcing from S V Healthcare.",
    images: ["/images/services/services-hero.webp"],
  },
};

const services: ServiceOffering[] = [
  {
    id: "licensing",
    label: "Product Licensing (In and Out)",
    title: "Product Licensing",
    icon: "/images/services/icon-licensing.svg",
    iconAlt: "Product Licensing",
    summary:
      "Expand portfolios through in-licensing and share innovations through out-licensing partnerships.",
    sections: [
      {
        heading: "In-Licensing",
        paragraphs: [
          "At S V Healthcare, licensing plays a pivotal role in expanding our product portfolio and enhancing our offerings within the dynamic pharmaceutical landscape. By collaborating with innovative companies and acquiring rights to promising products, we drive growth and bring advanced treatments to patients. Our strategic approach to product selection helps ensure a robust pipeline of therapies that addresses diverse medical needs across India and beyond.",
        ],
      },
      {
        heading: "Out-Licensing",
        paragraphs: [
          "Our commitment to advancing healthcare extends beyond our own portfolio. Through out-licensing, we collaborate with like-minded partners to share our expertise and products for the benefit of patients worldwide. By licensing our technologies and products, we contribute to the broader healthcare community and drive innovation across the industry.",
        ],
      },
    ],
  },
  {
    id: "regulatory",
    label: "Regulatory Affairs services",
    title: "Regulatory Affairs Consulting in India",
    icon: "/images/services/icon-regulatory.svg",
    iconAlt: "Regulatory Affairs services",
    summary:
      "End-to-end regulatory support from development and registration through commercialization.",
    sections: [
      {
        paragraphs: [
          "At S V Healthcare, our team of pharmaceutical experts provides comprehensive support to help you navigate all regulatory aspects of the pharmaceutical industry in India and globally, from development and registration to commercialization.",
          "We specialize in offering top-tier regulatory affairs consulting services, including CMC, quality assurance, non-clinical studies, toxicology, clinical trials, and medicinal product compliance.",
          "Regulatory affairs professionals are a vital bridge between pharmaceutical companies and health authorities. They ensure seamless management of every stage of product development, maintaining transparency and efficiency. Our team is dedicated to ensuring regulatory compliance throughout the entire product lifecycle, from early-stage development to final approval and commercialization.",
          "Partner with S V Healthcare to ensure that your pharmaceutical products meet the highest regulatory standards in India and across international markets.",
        ],
      },
    ],
  },
  {
    id: "distribution",
    label: "Distribution",
    title: "Logistics Management",
    icon: "/images/services/icon-distribution.svg",
    iconAlt: "Distribution",
    summary:
      "Reliable pharmaceutical logistics across India and global markets with quality-first delivery.",
    sections: [
      {
        paragraphs: [
          "At S V Healthcare, our logistics management system ensures the efficient and reliable delivery of pharmaceutical products across India and to global markets. By leveraging advanced supply chain technologies, conducting rigorous quality checks, and fostering strategic partnerships, we guarantee timely and safe deliveries.",
          "This commitment enables healthcare providers and patients to access our lifesaving medicines exactly when they are needed most, supporting better health outcomes worldwide.",
        ],
      },
    ],
  },
  {
    id: "rld",
    label: "Comparator Drug Sourcing (RLD)",
    title: "Comparator Drug Sourcing (RLD)",
    icon: "/images/services/icon-rld.svg",
    iconAlt: "Comparator Drug Sourcing (RLD)",
    summary:
      "Authentic reference-listed medicines for clinical trials with compliant global sourcing.",
    sections: [
      {
        paragraphs: [
          "At S V Healthcare, we specialize in comparator drug sourcing (RLD) across India and international markets, ensuring high-quality and compliant pharmaceutical products for clinical trials. Our strong network of certified suppliers and manufacturers enables us to provide authentic reference-listed medicines (RLD) at competitive prices, with timely delivery and full regulatory compliance.",
        ],
      },
      {
        heading: "Why Choose S V Healthcare for Comparator Drug Sourcing?",
        bullets: [
          {
            title: "Global Network and Regulatory Expertise:",
            text: " We understand the regulatory requirements of each region, ensuring compliance and seamless sourcing.",
          },
          {
            title: "Audited and Reliable Supply Chain:",
            text: " We collaborate with validated and traceable suppliers to guarantee product authenticity and quality.",
          },
          {
            title:
              "Cold Chain and Special Handling for Hard-to-Source Products:",
            text: " Expertise in handling temperature-sensitive drugs, specialty pharmaceuticals, and hospital lines with GDP-compliant storage solutions.",
          },
          {
            title: "End-to-End Logistics and Compliance:",
            text: " Our secure distribution system ensures timely delivery with advanced packaging solutions, including Credo Box packaging and data loggers.",
          },
        ],
      },
      {
        paragraphs: [
          "At S V Healthcare, we are committed to providing cost-effective, compliant, and timely comparator drug sourcing to support clinical trials globally.",
        ],
      },
    ],
  },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${baseUrl}/our-services/#webpage`,
      url: `${baseUrl}/our-services/`,
      name: "Our Services - S V Healthcare",
      description:
        "S V Healthcare is one of the best pharmaceutical companies in India, committed to providing high-quality, innovative and affordable healthcare solutions globally.",
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
          name: "Our Services",
          item: `${baseUrl}/our-services/`,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "S V Healthcare Services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        description: service.summary,
      })),
    },
  ],
};

export default function OurServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Our Services"
          description="Discovering the power of collaboration across licensing, regulatory affairs, distribution and comparator drug sourcing."
          image="/images/services/services-hero.webp"
          imageAlt="Medical Design Background Poster"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Our Services" },
          ]}
        />

        <section className="section services-intro-section">
          <div className="container split-layout">
            <Reveal className="section-copy">
              <div className="eyebrow">
                <span />
                Partnerships that scale
              </div>
              <h2>Discovering the Power of Collaboration</h2>
              <p>
                At S V Healthcare, we bring deep expertise in the pharmaceutical
                industry and a comprehensive understanding of its regulatory
                landscape. This knowledge enables us to navigate the development
                process with precision, accelerating treatments from concept to
                market.
              </p>
              <p>
                As one of India&apos;s leading pharmaceutical companies, we are
                constantly seeking new collaborations and innovative treatments
                to enhance our portfolio. If you have a potential drug that can
                make a difference for patients, we are eager to learn more.
              </p>
              <p>
                Our mission is to drive healthcare innovation. We are dedicated
                to discovering new ideas and building impactful partnerships to
                deliver transformative solutions to patients across India and
                beyond.
              </p>
              <div className="about-intro-actions">
                <ButtonLink href="#service-offerings">
                  View services <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink variant="outline" href="#contact">
                  Get in touch
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal className="about-visual" delay={0.12} y={56} scale={0.94}>
              <div className="image-frame about-image-frame">
                <Image
                  src="/images/services/partner.webp"
                  alt="partnership"
                  fill
                  sizes="(max-width: 900px) 90vw, 48vw"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section
          className="section services-offerings-section"
          id="service-offerings"
        >
          <div className="container">
            <Reveal className="section-heading centered" y={36}>
              <div className="eyebrow">
                <span />
                What we offer
              </div>
              <h2>Our Services</h2>
              <p>
                From product licensing and regulatory consulting to logistics and
                comparator drug sourcing, we support partners across the
                pharmaceutical lifecycle.
              </p>
            </Reveal>
            <ServiceOfferings services={services} />
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <Reveal className="contact-intro">
              <div className="eyebrow light">
                <span />
                Start a conversation
              </div>
              <h2>Get In Touch</h2>
              <p>
                <strong>Contact S V Healthcare</strong> for high quality
                pharmaceutical, nutraceutical and cosmetic products. Partner with
                the global leader in healthcare solutions.
              </p>
              <div className="contact-details">
                <a href={SITE_CONFIG.contact.phoneHref}>
                  <Phone />
                  <span>
                    <small>Call us</small>
                    {SITE_CONFIG.contact.phoneDisplay}
                  </span>
                </a>
                <a href={SITE_CONFIG.contact.emailHref}>
                  <Mail />
                  <span>
                    <small>Email us</small>
                    {SITE_CONFIG.contact.email}
                  </span>
                </a>
                <div>
                  <MapPin />
                  <span>
                    <small>Visit us</small>
                    {SITE_CONFIG.address.short}
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} y={48}>
              <ContactForm />
            </Reveal>
          </div>
          <Reveal>
            <LocationMap />
          </Reveal>
        </section>

        <section className="services-exporter-section">
          <div className="container services-exporter-grid">
            <Reveal className="services-exporter-copy">
              <div className="eyebrow">
                <span />
                Global export partner
              </div>
              <h2>
                S V Healthcare – WHO-GMP & EU GMP-Certified Pharmaceutical &
                Nutraceutical Exporter
              </h2>
              <p>
                S V Healthcare is a trusted WHO-GMP and EU GMP-certified
                exporter of{" "}
                <AppLink href="/pharmaceutical-products">
                  pharmaceuticals
                </AppLink>{" "}
                and{" "}
                <AppLink href="/nutraceutical-products">nutraceuticals</AppLink>
                , supplying high-quality products to markets across the globe.
                With a strong commitment to international standards, innovation,
                and safety, we ensure that our products meet rigorous quality
                requirements, making us a preferred partner for global
                healthcare solutions.
              </p>
              <div className="about-intro-actions">
                <ButtonLink href={"/pharmaceutical-products"}>
                  Explore products <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink variant="outline" href="/about-us">
                  About S V Healthcare
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal className="about-visual">
              <div className="image-frame about-image-frame">
                <Image
                  src="/images/services/export-global.webp"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
    </>
  );
}
