import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { LocationMap } from "@/components/LocationMap";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { AppLink } from "@/components/ui/AppLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SITE_CONFIG } from "@/lib/site-config";

const baseUrl = SITE_CONFIG.url;
const pageTitle = "Contact Best Pharma Companies in India";
const pageDescription =
  "Contact best pharma companies in India for top-quality healthcare products. Connect with leading pharma companies for reliable global partnerships.";
const heroImage = "/images/export/pharma-export-global.webp";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "contact best pharma companies in India",
    "contact top pharma companies in India",
    "contact best pharma export companies in India",
    "S V Healthcare contact",
    "pharmaceutical company Ahmedabad contact",
    "WHO GMP pharmaceutical exporter contact",
  ],
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/contact-us",
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 630,
        alt: "Contact Best Pharma Companies in India-S V Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [heroImage],
  },
};

const officeChannels = [
  {
    label: "Our Contact",
    value: "+91 99981 06442",
    href: "tel:+919998106442",
    icon: Phone,
  },
  {
    label: "Our Location",
    value: SITE_CONFIG.address.full,
    href: SITE_CONFIG.address.mapsUrl,
    external: true,
    icon: MapPin,
  },
  {
    label: "Mail Us",
    value: "fenil@svhealthcare.in",
    href: "mailto:fenil@svhealthcare.in",
    icon: Mail,
  },
] as const;

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${baseUrl}/contact-us/#webpage`,
      url: `${baseUrl}/contact-us/`,
      name: pageTitle,
      description: pageDescription,
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${baseUrl}/#organization` },
      inLanguage: "en-US",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${baseUrl}${heroImage}`,
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
          name: "Contact Us",
          item: `${baseUrl}/contact-us/`,
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: SITE_CONFIG.name,
      url: baseUrl,
      email: "fenil@svhealthcare.in",
      telephone: "+919998106442",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "C-603, Siddhi Vinayak Business Tower, Near Kataria Automobiles, Makarba",
        addressLocality: "Ahmedabad",
        postalCode: "380051",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+919998106442",
          contactType: "customer service",
          email: "fenil@svhealthcare.in",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      ],
    },
  ],
};

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Contact Us"
          description="Contact best pharma companies in India for top-quality healthcare products and reliable global partnerships."
          image={heroImage}
          imageAlt="Contact Best Pharma Companies in India-S V Healthcare"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact Us" },
          ]}
        />

        <section className="section contact-page-intro">
          <div className="container">
            <Reveal className="section-heading centered" y={36}>
              <div className="eyebrow">
                <span />
                Office Address
              </div>
              <h2>Office Address</h2>
            </Reveal>

            <Stagger className="contact-channel-grid" stagger={0.08}>
              {officeChannels.map((channel) => {
                const Icon = channel.icon;
                const body = (
                  <>
                    <span className="contact-channel-icon" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <strong>{channel.label}</strong>
                    <span>{channel.value}</span>
                  </>
                );

                return (
                  <StaggerItem key={channel.label}>
                    {"href" in channel && channel.href ? (
                      <a
                        className="contact-channel-card"
                        href={channel.href}
                        {...("external" in channel && channel.external
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="contact-channel-card">{body}</div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section className="section contact-seo-section">
          <div className="container split-layout contact-seo-layout">
            <Reveal className="section-copy">
              <div className="eyebrow">
                <span />
                Get in touch with us
              </div>
              <h2>Get In Touch</h2>
              <p>
                Connect with S V Healthcare, one of the leading pharmaceutical
                companies in India. We are committed to providing high-quality{" "}
                <AppLink href="/pharmaceutical-products">
                  pharmaceuticals
                </AppLink>{" "}
                and{" "}
                <AppLink href="/nutraceutical-products">nutraceuticals</AppLink>{" "}
                to global markets, supported by products sourced from facilities
                meeting WHO-GMP and EU GMP standards.
              </p>
              <p>
                Our commitment to excellence, innovation, and global quality
                standards makes us a trusted partner in international healthcare.{" "}
                <AppLink href="/contact-us">Contact us</AppLink> to explore
                reliable, high-quality pharmaceutical and nutraceutical
                solutions.
              </p>
              <p>
                As a trusted pharmaceutical exporter from India, S V Healthcare is
                committed to delivering excellence and innovation across its
                product portfolio. Get in touch with us to discover reliable,
                world-class healthcare solutions.
              </p>
            </Reveal>
            <Reveal delay={0.12} y={48}>
              <div className="contact-page-form-panel">
                <p className="contact-form-lead">
                  Our team is happy to answer your questions. Fill out the form
                  and we&apos;ll be in touch <strong>as soon as possible.</strong>
                </p>
                <ContactForm
                  submitLabel="Send Message"
                  placeholders={{
                    name: "Enter Your Name",
                    email: "Enter Your Email",
                    phone: "+91 98765 43210",
                    subject: "Subject",
                    message: "Write Your Message",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal>
          <LocationMap className="contact-page-map" />
        </Reveal>

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
                S V Healthcare is a trusted WHO-GMP and EU GMP-certified{" "}
                <strong>
                  exporter of{" "}
                  <AppLink href="/pharmaceutical-products">
                    pharmaceuticals
                  </AppLink>{" "}
                  and{" "}
                  <AppLink href="/nutraceutical-products">nutraceuticals</AppLink>
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
                  src={heroImage}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
    </>
  );
}
