import Image from "next/image";
import {
  ArrowRight,
  Award,
  FlaskConical,
  Globe2,
  Leaf,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  Pill,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { LocationMap } from "@/components/LocationMap";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCarousel } from "@/components/ProductCarousel";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { AppLink } from "@/components/ui/AppLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { blogPosts } from "@/lib/blog-posts";
import { SITE_CONFIG } from "@/lib/site-config";

const baseUrl = SITE_CONFIG.url;

const categories = [
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

const benefits = [
  {
    title: "Best Quality & Compliance",
    text: "Sourced from accredited facilities that meet demanding global standards.",
    icon: ShieldCheck,
  },
  {
    title: "Expertise in Global Export",
    text: "Regulatory, documentation and logistics support across international markets.",
    icon: Globe2,
  },
  {
    title: "Quality and Trust",
    text: "Reliable healthcare products built around safety, consistency and patient care.",
    icon: PackageCheck,
  },
  {
    title: "Diverse Product Range",
    text: "A broad range of formulations across pharma, nutrition and personal care.",
    icon: FlaskConical,
  },
];

const posts = blogPosts.slice(0, 3).map((post) => ({
  image: post.image,
  date: post.date,
  title: post.title,
  href: post.href,
}));

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/home/hero-care.webp"
        fetchPriority="high"
      />
      <Header />
      <main>
        <HeroCarousel />

        <section className="trust-strip" aria-label="Company highlights">
          <div className="container trust-grid">
            <div>
              <strong>15+</strong>
              <span>Years of expertise</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Core product divisions</span>
            </div>
            <div>
              <strong>Global</strong>
              <span>Export capabilities</span>
            </div>
            <div>
              <Award />
              <span>Quality-first sourcing</span>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container split-layout">
            <div className="about-visual reveal-card">
              <div className="image-frame">
                <Image
                  src="/images/home/about.webp"
                  alt="S V Healthcare pharmaceutical professionals"
                  fill
                  sizes="(max-width: 900px) 90vw, 48vw"
                />
              </div>
            </div>
            <div className="section-copy">
              <div className="eyebrow">
                <span />
                Who we are
              </div>
              <h2>Your Trusted Partner in Pharmaceutical Excellence</h2>
              <p className="lead">
                S V Healthcare is considered one of the best pharmaceutical
                companies in India and has emerged as a leading pharmaceutical
                exporter.
              </p>
              <p>
                Our team, composed of professionals with over 15 years of
                experience in regulatory affairs, sales and marketing, and
                research and development, is united by a vision to provide
                high-quality medicines at cost-effective solutions.
              </p>
              <p>
                As one of the top pharma companies in India, we source our
                products from manufacturing facilities that meet the highest
                quality standards, accredited with WHO GMP, PIC, EU GMP and US
                FDA certifications.
              </p>
              <p>
                Our goal is to become the preferred partner for both domestic
                and global pharmaceutical customers by ensuring the availability
                of all required pharma products, meeting the desired quality and
                providing the best value.
              </p>
              <p>
                Our scientific approach from concept to development of
                pharmaceutical and nutraceutical products ensures success for
                our customers, strengthening our position as one of the leading
                pharma companies in India.
              </p>
              <AppLink className="text-link" href="/about-us">
                Learn more about S V Healthcare <ArrowRight />
              </AppLink>
            </div>
          </div>
        </section>

        <section className="section categories-section" id="products">
          <div className="container">
            <div className="section-heading centered">
              <div className="eyebrow">
                <span />
                What we deliver
              </div>
              <h2>Product Offerings</h2>
            </div>
            <div className="category-grid">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <AppLink
                    key={category.title}
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
                );
              })}
            </div>
          </div>
        </section>

        <section className="section products-section">
          <div className="container">
            <div className="section-heading heading-row">
              <div>
                <div className="eyebrow">
                  <span />
                  In demand
                </div>
                <h2>Top Selling Products</h2>
              </div>
              <ButtonLink
                variant="outline"
                href={"/pharmaceutical-products"}
              >
                View full portfolio <ArrowRight size={18} />
              </ButtonLink>
            </div>
            <ProductCarousel />
          </div>
        </section>

        <section className="why-section">
          <div className="why-image">
            <Image
              src="/images/home/why-us.webp"
              alt="Pharmaceutical quality and research"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="why-content">
            <div>
              <div className="eyebrow light">
                <span />
                Why choose us
              </div>
              <h2>Why Choose Us</h2>
              <p>
              Choose S V Healthcare for outstanding expertise and quality. As one of the top pharma companies in India, we excel in providing innovative healthcare solutions. Our commitment to research, safety, and patient care makes us a trusted leader in the pharmaceutical industry. Trust S V Healthcare for reliable, world-class pharmaceutical products that prioritize health and well-being.
              </p>
            </div>
            <div className="benefit-grid">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div className="benefit" key={benefit.title}>
                    <Icon />
                    <div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-layout">
            <div className="faq-intro">
              <div className="eyebrow">
                <span />
                Questions, answered
              </div>
              <h2>Everything you need to know about partnering with us.</h2>
              <p>
                Learn how our portfolio, quality process and export support help
                healthcare businesses move forward.
              </p>
              <div className="faq-callout">
                <Phone />
                <div>
                  <span>Still have a question?</span>
                  <a href={SITE_CONFIG.contact.phoneHref}>
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
            <FaqAccordion />
          </div>
        </section>

        <section className="section blog-section">
          <div className="container">
            <div className="section-heading heading-row">
              <div>
                <div className="eyebrow">
                  <span />
                  Latest insights
                </div>
                <h2>Ideas for a healthier world.</h2>
              </div>
              <AppLink className="text-link" href="/blog">
                Visit our blog <ArrowRight />
              </AppLink>
            </div>
            <div className="blog-grid">
              {posts.map((post) => (
                <article className="blog-card" key={post.title}>
                  <AppLink
                    className="blog-image"
                    href={post.href}
                    aria-label={post.title}
                  >
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 90vw, 31vw"
                    />
                  </AppLink>
                  <div className="blog-content">
                    <p>
                      <span>Healthcare</span> {post.date}
                    </p>
                    <h3>
                      <AppLink href={post.href}>{post.title}</AppLink>
                    </h3>
                    <AppLink className="card-link" href={post.href}>
                      Read article <ArrowRight />
                    </AppLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <div className="contact-intro">
              <div className="eyebrow light">
                <span />
                Start a conversation
              </div>
              <h2>Get In Touch</h2>
              <p>
                <strong>Contact S V Healthcare</strong> for high quality
                pharmaceutical, nutraceutical and cosmetic products. Partner
                with the global leader in healthcare solutions.
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
            </div>
            <ContactForm />
          </div>
          <LocationMap />
        </section>
      </main>

      <SiteFooter />
      <UtilityButtons />
    </>
  );
}
