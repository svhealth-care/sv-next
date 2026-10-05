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
  title: "Our Capabilities - S V Healthcare",
  description:
    "S V Healthcare is one of the best pharmaceutical companies in India, committed to providing high-quality, innovative and affordable healthcare solutions globally.",
  keywords: [
    "best pharmaceutical companies in india",
    "top pharmaceutical companies in india",
    "about S V Healthcare",
    "S V Healthcare company details",
    "pharmaceutical regulatory affairs",
    "pharmaceutical product licensing",
  ],
  alternates: { canonical: "/our-services" },
  openGraph: {
    title: "Our Capabilities - S V Healthcare",
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
    title: "Our Capabilities - S V Healthcare",
    description:
      "Product licensing, regulatory expertise and distribution behind S V Healthcare's pharmaceutical products.",
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
    label: "Regulatory Affairs",
    title: "Regulatory Expertise",
    icon: "/images/services/icon-regulatory.svg",
    iconAlt: "Regulatory Affairs",
    summary:
      "In-house regulatory know-how that takes our products from registration to market.",
    sections: [
      {
        paragraphs: [
          "At S V Healthcare, our team of pharmaceutical experts manages the regulatory aspects of our products in India and globally, from development and registration to commercialization.",
          "Our regulatory expertise covers CMC, quality assurance, non-clinical studies, toxicology, clinical trials, and medicinal product compliance.",
          "Regulatory affairs is a vital bridge between pharmaceutical companies and health authorities. Our team manages every stage of the product lifecycle with transparency and efficiency, from early-stage development to final approval and commercialization.",
          "This expertise helps ensure that every S V Healthcare product meets the highest regulatory standards in India and across international markets.",
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
  // {
  //   id: "rld",
  //   label: "Comparator Drug Sourcing (RLD)",
  //   title: "Comparator Drug Sourcing (RLD)",
  //   icon: "/images/services/icon-rld.svg",
  //   iconAlt: "Comparator Drug Sourcing (RLD)",
  //   summary:
  //     "Authentic reference-listed medicines for clinical trials with compliant global sourcing.",
  //   sections: [
  //     {
  //       paragraphs: [
  //         "At S V Healthcare, we specialize in comparator drug sourcing (RLD) across India and international markets, ensuring high-quality and compliant pharmaceutical products for clinical trials. Our strong network of trusted suppliers and manufacturers enables us to provide authentic reference-listed medicines (RLD) at competitive prices, with timely delivery and full regulatory compliance.",
  //       ],
  //     },
  //     {
  //       heading: "Why Choose S V Healthcare for Comparator Drug Sourcing?",
  //       bullets: [
  //         {
  //           title: "Global Network and Regulatory Expertise:",
  //           text: " We understand the regulatory requirements of each region, ensuring compliance and seamless sourcing.",
  //         },
  //         {
  //           title: "Audited and Reliable Supply Chain:",
  //           text: " We collaborate with validated and traceable suppliers to guarantee product authenticity and quality.",
  //         },
  //         {
  //           title:
  //             "Cold Chain and Special Handling for Hard-to-Source Products:",
  //           text: " Expertise in handling temperature-sensitive drugs, specialty pharmaceuticals, and hospital lines with GDP-compliant storage solutions.",
  //         },
  //         {
  //           title: "End-to-End Logistics and Compliance:",
  //           text: " Our secure distribution system ensures timely delivery with advanced packaging solutions, including Credo Box packaging and data loggers.",
  //         },
  //       ],
  //     },
  //     {
  //       paragraphs: [
  //         "At S V Healthcare, we are committed to providing cost-effective, compliant, and timely comparator drug sourcing to support clinical trials globally.",
  //       ],
  //     },
  //   ],
  // },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${baseUrl}/our-services/#webpage`,
      url: `${baseUrl}/our-services/`,
      name: "Our Capabilities - S V Healthcare",
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
          name: "Our Capabilities",
          item: `${baseUrl}/our-services/`,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "S V Healthcare Capabilities",
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
          title="Our Capabilities"
          description="The expertise behind our products, across licensing, regulatory affairs and distribution."
          image="/images/services/services-hero.webp"
          imageAlt="Medical Design Background Poster"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Our Capabilities" },
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
                  View capabilities <ArrowRight size={18} />
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
                How we work
              </div>
              <h2>Our Capabilities</h2>
              <p>
                Product licensing, regulatory expertise and logistics strengthen
                how we source, register and deliver quality pharmaceutical
                products to markets worldwide.
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
              <p>
                S V Healthcare is a trusted exporter of{" "}
                <AppLink href="/pharmaceutical-products">
                  pharmaceuticals
                </AppLink>{" "}
                and{" "}
                <AppLink href="/nutraceutical-products">nutraceuticals</AppLink>{" "}
                sourced from manufacturers that follow WHO-GMP and EU GMP
                standards,
                supplying high-quality products to markets across the globe.
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
