import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  FlaskConical,
  Globe2,
  HeartHandshake,
  Leaf,
  Pill,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { AppLink } from "@/components/ui/AppLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SITE_CONFIG } from "@/lib/site-config";

const baseUrl = SITE_CONFIG.url;

export const metadata: Metadata = {
  title: "About Us - S V Healthcare",
  description:
    "S V Healthcare is one of the best pharmaceutical companies in India, committed to providing high-quality, innovative and affordable healthcare solutions globally.",
  keywords: [
    "about S V Healthcare",
    "best pharmaceutical companies in India",
    "top pharmaceutical companies in India",
    "WHO GMP pharmaceutical exporter",
    "pharmaceutical company Ahmedabad",
  ],
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Us - S V Healthcare",
    description:
      "S V Healthcare is one of the best pharmaceutical companies in India, committed to providing high-quality, innovative and affordable healthcare solutions globally.",
    url: "/about-us",
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [
      {
        url: "/images/about/about-hero.webp",
        width: 1024,
        height: 1024,
        alt: "About S V Healthcare pharmaceutical company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - S V Healthcare",
    description:
      "High-quality, innovative and affordable healthcare solutions from one of India's trusted pharmaceutical companies.",
    images: ["/images/about/about-hero.webp"],
  },
};

const pillars = [
  {
    title: "Innovative Specialty and Pharmaceutical Portfolio",
    image: "/images/about/portfolio.webp",
    alt: "Innovative Specialty and Pharmaceutical Portfolio",
    paragraphs: [
      "At S V Healthcare, we pride ourselves on offering a diverse portfolio of specialty and pharmaceutical products that cater to a wide range of therapeutic areas. Our comprehensive product line includes high-quality, cost-effective generics that provide reliable alternatives to brand-name drugs, as well as specialty products designed to address complex medical conditions.",
      "Our specialty portfolio covers key therapeutic segments, including oncology, cardiology, neurology, and others, ensuring that we meet the specific needs of healthcare providers and patients worldwide.",
    ],
  },
  {
    title: "Innovative Excellence in Pharmaceuticals",
    image: "/images/about/excellence.webp",
    alt: "Innovative Excellence in Pharmaceuticals",
    paragraphs: [
      "At S V Healthcare, innovation is at the heart of everything we do. We are committed to advancing healthcare by developing cutting-edge pharmaceutical solutions that meet the evolving needs of patients and healthcare providers around the world.",
      "S V Healthcare is committed to delivering high-quality, effective, and affordable medicines. Our innovative approach extends to all aspects of our operations, from research and development to marketing and distribution, ensuring that we remain at the forefront of the pharmaceutical industry. We believe that through innovation, we can deliver better health outcomes for millions of people around the world.",
    ],
  },
  {
    title: "Global Expansion",
    image: "/images/about/global-expansion.webp",
    alt: "Global Expansion - S V Healthcare",
    paragraphs: [
      "S V Healthcare is committed to global expansion, accessing new markets, and providing high-quality pharmaceutical solutions worldwide. Our strategic growth initiatives ensure that our innovative products and services are accessible across global markets, contributing to improved healthcare outcomes.",
      "Focused on expanding our international presence, we are dedicated to meeting the diverse needs of patients and healthcare providers around the world. S V Healthcare is committed to improving health outcomes and making a positive impact on global healthcare through innovation, quality, and reliable pharmaceutical solutions.",
    ],
  },
];

const visionPoints = [
  {
    title: "Leading innovation",
    text: "Leading advances in pharmaceutical research and development.",
  },
  {
    title: "Expanding global reach",
    text: "Growing our presence in international markets.",
  },
  {
    title: "Ensuring quality",
    text: "Providing high-quality, reliable and effective healthcare solutions.",
  },
  {
    title: "Enhancing patient care",
    text: "Providing affordable and efficacious medicines to improve the quality of life.",
  },
];

const missionPoints = [
  {
    title: "Advancing healthcare",
    text: "Developing innovative solutions to meet global medical needs.",
  },
  {
    title: "Ensuring access",
    text: "Making our products available and affordable to diverse markets.",
  },
  {
    title: "Maintaining excellence",
    text: "Adhering to the highest standards of quality and manufacturing.",
  },
  {
    title: "Ethical conduct",
    text: "Maintaining integrity and transparency in all our operations.",
  },
];

const values = [
  {
    title: "Quality",
    text: "Ensure accuracy and excellence in every product and process, strive to get it right the first time.",
    icon: ShieldCheck,
  },
  {
    title: "Reliability",
    text: "Maintain efficiency and discipline in all systems and processes, consistently deliver on your promises to stakeholders.",
    icon: BadgeCheck,
  },
  {
    title: "Trust",
    text: "Promote transparency and honesty in all your transactions, build lasting relationships based on trust.",
    icon: HeartHandshake,
  },
  {
    title: "Sustainability",
    text: "Consistently bring new, high-quality products to market while delivering continued value to your stakeholders.",
    icon: Leaf,
  },
];

const whyChooseUs = [
  {
    title: "Quality Products",
    text: "High-quality standards and state-of-the-art manufacturing facilities are used for all our healthcare products.",
    icon: ShieldCheck,
  },
  {
    title: "Expert Team",
    text: "We offer a diverse range of products, supported by a team of young, dynamic professionals with broad knowledge and experience.",
    icon: Users,
  },
  {
    title: "Affordable Products",
    text: "While maintaining high ethical standards, we strive to provide an affordable range of high-quality generic products.",
    icon: FlaskConical,
  },
  {
    title: "On-Time Delivery",
    text: "We deliver dossiers and all the technical documents necessary for regulatory compliance on time.",
    icon: Globe2,
  },
];

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

const stats = [
  { value: "15+", label: "Years of expertise" },
  { value: "3", label: "Product divisions" },
  { value: "WHO-GMP", label: "Quality sourcing" },
  { value: "Global", label: "Export presence" },
];

const testimonials = [
  {
    name: "Pratik Khandagale",
    quote:
      "One of the best fastest growing companies in the pharmaceutical and nutraceutical industries, with a clear vision and mission.",
  },
  {
    name: "Amol Barshe",
    quote:
      "One of the trustworthy and prominent organizations in this niche is SV Healthcare, which trades pharmaceutical medicines that are high in quality.",
  },
  {
    name: "Mayank Shrivastava",
    quote:
      "It is a good organization and manufacturing practice for pharmaceutical products, with well-educated technical staff and good practice.",
  },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${baseUrl}/about-us/#webpage`,
      url: `${baseUrl}/about-us/`,
      name: "About Us - S V Healthcare",
      description:
        "S V Healthcare is one of the best pharmaceutical companies in India, committed to providing high-quality, innovative and affordable healthcare solutions globally.",
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${baseUrl}/#organization` },
      inLanguage: "en-IN",
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
          name: "About Us",
          item: `${baseUrl}/about-us/`,
        },
      ],
    },
  ],
};

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="About Us"
          description="To be the most trusted quality and cost-effective pharmaceutical products supplier."
          image="/images/about/about-hero.webp"
          imageAlt="About S V Healthcare pharmaceutical company"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
        />

        <section className="section about-intro-section">
          <div className="container about-intro-grid">
            <Reveal className="about-intro-copy">
              <div className="eyebrow">
                <span />
                What about us
              </div>
              <h2>
                To be the most trusted quality and cost-effective pharmaceutical
                products supplier.
              </h2>
              <p>
                S V Healthcare is a group of like-minded people having vision to
                provide the best medicines in a cost-effective way. We are
                Industry experienced people of more than 15 years in the field of
                Regulatory Affairs, Sales & Marketing, Research & Development.
                Our team sources the products from manufacturing facilities that
                meet the highest quality standards having accreditation of WHO
                GMP / PICs / EU / FDA.
              </p>
              <p>
                To be preferred partner for domestic and global pharma clients by
                ensuring availability of all possible pharma products with
                desired quality and best price of cGMP/PICS/EU GMP /US FDA. Our
                scientific approach for work from conceptualization to
                development of pharmaceutical products ensures success for our
                clients.
              </p>
              <div className="about-intro-actions">
                <ButtonLink href={"/pharmaceutical-products"}>
                  Explore products <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink variant="outline" href="/contact-us">
                  Contact our team
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal className="about-intro-panel">
              <Sparkles />
              <p>
                Trusted pharmaceutical, nutraceutical and cosmetic solutions
                backed by experienced regulatory, commercial and scientific
                teams.
              </p>
              <ul>
                <li>WHO GMP / PIC/S / EU GMP / US FDA sourcing</li>
                <li>15+ years industry experience</li>
                <li>Domestic and global partnership focus</li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section about-who-section" id="who-we-are">
          <div className="container split-layout">
            <Reveal className="about-visual" y={56} scale={0.94}>
              <div className="image-frame about-image-frame">
                <Image
                  src="/images/about/who-we-are.webp"
                  alt="best pharmaceutical companies in India- S V Healthcare"
                  fill
                  sizes="(max-width: 900px) 90vw, 48vw"
                />
              </div>
            </Reveal>
            <Reveal className="section-copy" delay={0.12} y={40}>
              <div className="eyebrow">
                <span />
                Who we are
              </div>
              <h2>Who We Are</h2>
              <p>
                S V Healthcare is one of the leading pharmaceutical companies in
                India, dedicated to providing high-quality healthcare solutions
                globally. As a trusted name in the pharmaceutical industry, we
                specialize in the development, manufacturing, and export of a
                wide range of{" "}
                <AppLink href="/pharmaceutical-products">
                  pharmaceutical
                </AppLink>{" "}
                and{" "}
                <AppLink href="/nutraceutical-products">nutraceutical</AppLink>{" "}
                products. Our commitment to excellence, innovation, and customer
                satisfaction has positioned us as a trusted leader in the
                industry, making us a preferred choice for healthcare partners
                across the globe.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section about-pillars-section" aria-labelledby="pillars-heading">
          <div className="container">
            <Reveal className="section-heading centered" y={36}>
              <div className="eyebrow">
                <span />
                How we create value
              </div>
              <h2 id="pillars-heading">Built for quality, innovation and reach.</h2>
            </Reveal>
            <Stagger className="about-pillar-grid">
              {pillars.map((pillar) => (
                <StaggerItem key={pillar.title}>
                  <article className="about-pillar-card">
                    <div className="about-pillar-image">
                      <Image
                        src={pillar.image}
                        alt={pillar.alt}
                        fill
                        sizes="(max-width: 900px) 90vw, 33vw"
                      />
                    </div>
                    <h3>{pillar.title}</h3>
                    {pillar.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section about-vision-section" id="vision">
          <div className="container split-layout">
            <Reveal className="about-visual" y={56} scale={0.94}>
              <div className="image-frame about-image-frame">
                <Image
                  src="/images/about/our-vision.webp"
                  alt="Our Vision is best pharmaceutical companies in India - S V Healthcare"
                  fill
                  sizes="(max-width: 900px) 90vw, 48vw"
                />
              </div>
            </Reveal>
            <Reveal className="section-copy" delay={0.12} y={40}>
              <div className="eyebrow">
                <span />
                Our vision
              </div>
              <h2>Our Vision</h2>
              <p>
                SV Healthcare is recognized as one of the{" "}
                <strong>best pharmaceutical companies in India</strong> and a
                leading global force in the pharmaceutical industry. Our goal is
                to promote innovation and excellence in healthcare by developing
                cutting-edge solutions that enhance the quality of life of people
                around the world. We aspire to set new standards in{" "}
                <AppLink href="/pharmaceutical-products">
                  pharmaceutical care
                </AppLink>
                , expand our global presence while providing effective,
                affordable and high-quality products and have a positive impact
                on global health.
              </p>
              <ul className="about-point-list">
                {visionPoints.map((point) => (
                  <li key={point.title}>
                    <strong>{point.title}:</strong> {point.text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section about-mission-section" id="mission">
          <div className="container split-layout about-mission-layout">
            <Reveal className="section-copy" delay={0.12} y={40}>
              <div className="eyebrow">
                <span />
                Our mission
              </div>
              <h2>Our Mission</h2>
              <p>
                At S V Healthcare, our mission is to provide high-quality,
                effective, and affordable pharmaceutical products that meet the
                needs of diverse markets. As one of the{" "}
                <strong>top pharmaceutical companies in India</strong>, we are
                committed to advancing healthcare by investing in research and
                development, adhering to the highest standards of manufacturing,
                and ensuring the accessibility of our products worldwide.
              </p>
              <ul className="about-point-list">
                {missionPoints.map((point) => (
                  <li key={point.title}>
                    <strong>{point.title}:</strong> {point.text}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="about-visual" y={56} scale={0.94}>
              <div className="image-frame about-image-frame">
                <Image
                  src="/images/about/our-mission.webp"
                  alt="Our Mission - S V Healthcare"
                  fill
                  sizes="(max-width: 900px) 90vw, 48vw"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section about-values-section" id="values">
          <div className="container">
            <Reveal className="section-heading centered" y={36}>
              <div className="eyebrow">
                <span />
                Principles that guide us
              </div>
              <h2>Our Values</h2>
            </Reveal>
            <Stagger className="about-values-grid">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <StaggerItem key={value.title}>
                    <article className="about-value-card">
                      <div className="about-value-icon">
                        <Icon />
                      </div>
                      <h3>{value.title}</h3>
                      <p>{value.text}</p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section className="section about-why-section" id="why-choose-us">
          <div className="container">
            <Reveal className="section-heading centered" y={36}>
              <div className="eyebrow">
                <span />
                Why choose us
              </div>
              <h2>All The Great Work That We Done</h2>
            </Reveal>
            <Stagger className="about-why-grid">
              {whyChooseUs.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title}>
                    <article className="about-why-card">
                      <div className="about-why-icon">
                        <Icon />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section className="section categories-section" id="product-offerings">
          <div className="container">
            <Reveal className="section-heading centered" y={36}>
              <div className="eyebrow">
                <span />
                What we deliver
              </div>
              <h2>Product Offerings</h2>
            </Reveal>
            <Stagger className="category-grid" stagger={0.14}>
              {productOfferings.map((category, index) => {
                const Icon = category.icon;
                return (
                  <StaggerItem key={category.title}>
                    <AppLink
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
                    </AppLink>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section className="about-stats-section" aria-label="Company highlights">
          <Stagger className="container about-stats-grid">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                {stat.value === "15+" ? (
                  <CountUp value={15} suffix="+" />
                ) : stat.value === "3" ? (
                  <CountUp value={3} />
                ) : (
                  <strong>{stat.value}</strong>
                )}
                <span>{stat.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section className="section about-testimonials-section" aria-labelledby="testimonials-heading">
          <div className="container">
            <Reveal className="section-heading centered" y={36}>
              <div className="eyebrow">
                <span />
                Our clients
              </div>
              <h2 id="testimonials-heading">Our Client Happy Say About Us</h2>
            </Reveal>
            <Stagger className="about-testimonial-grid">
              {testimonials.map((item) => (
                <StaggerItem key={item.name}>
                  <blockquote className="about-testimonial-card">
                    <Quote />
                    <p>{item.quote}</p>
                    <footer>
                      <cite>{item.name}</cite>
                    </footer>
                  </blockquote>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="about-cta-section">
          <Reveal className="container about-cta-panel">
            <div>
              <div className="eyebrow light">
                <span />
                Partner with us
              </div>
              <h2>
                S V Healthcare - WHO-GMP & EUGMP Certified Pharmaceuticals &
                Nutraceuticals Exporter
              </h2>
              <p>
                S V Healthcare is a trusted WHO-GMP and EU GMP-certified exporter
                of{" "}
                <AppLink href="/pharmaceutical-products">
                  pharmaceuticals
                </AppLink>{" "}
                and{" "}
                <AppLink href="/nutraceutical-products">nutraceuticals</AppLink>
                , supplying high-quality products to countries around the world.
                With a strong commitment to international standards, innovation,
                and safety, we ensure that our products meet the highest quality
                requirements, making us a preferred partner in global healthcare
                solutions.
              </p>
            </div>
            <div className="about-cta-actions">
              <ButtonLink href="/contact-us">
                Get in touch <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink
                variant="ghost"
                href={"/pharmaceutical-products"}
              >
                View products
              </ButtonLink>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
      <UtilityButtons />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
    </>
  );
}
