import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { SITE_CONFIG } from "@/lib/site-config";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: `/product/${product.slug}`,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle,
      description: product.seoDescription,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const hasDescription = Boolean(product.descriptionHtml?.trim());

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        image: [`${SITE_CONFIG.url}${product.image}`],
        description: product.seoDescription,
        brand: { "@type": "Brand", name: SITE_CONFIG.name },
        category: product.categoryLabel,
        url: `${SITE_CONFIG.url}/product/${product.slug}/`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_CONFIG.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.categoryLabel,
            item: `${SITE_CONFIG.url}${product.categoryHref}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${SITE_CONFIG.url}/product/${product.slug}/`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={product.name}
          description={`${product.form} from our ${product.categoryLabel.toLowerCase()} range`}
          image={product.image}
          imageAlt={product.name}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: product.categoryLabel, href: product.categoryHref },
            { label: product.name },
          ]}
        />

        <section className="section product-detail-section">
          <div className="container product-detail-layout">
            <Reveal className="product-detail-gallery" y={48} scale={0.96}>
              <div className="product-detail-image">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 900px) 90vw, 42vw"
                />
              </div>
            </Reveal>

            <Reveal className="product-detail-summary" delay={0.12} y={40}>
              <Link href={product.categoryHref} className="product-card-form">
                {product.categoryLabel}
              </Link>
              <h2>{product.name}</h2>
              <p className="product-detail-form">{product.form}</p>
              {product.shortDescriptionHtml ? (
                <div
                  className="product-richtext"
                  dangerouslySetInnerHTML={{
                    __html: product.shortDescriptionHtml,
                  }}
                />
              ) : null}
              <div className="about-intro-actions">
                <ButtonLink href="#contact">
                  Request a Quote <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink variant="outline" href={product.categoryHref}>
                  Back to {product.categoryLabel}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>

        {hasDescription ? (
          <section className="section product-benefits-section">
            <div className="container">
              <Reveal className="section-heading" y={36}>
                <div className="eyebrow">
                  <span />
                  Product details
                </div>
                <h2>Description</h2>
              </Reveal>
              <Reveal delay={0.1} y={32}>
                <div
                  className="product-richtext product-richtext-wide"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </Reveal>
            </div>
          </section>
        ) : null}

        {related.length ? (
          <section className="section product-related-section">
            <div className="container">
              <Reveal className="section-heading heading-row" y={36}>
                <div>
                  <div className="eyebrow">
                    <span />
                    More from this range
                  </div>
                  <h2>Related products</h2>
                </div>
                <Link className="text-link" href={product.categoryHref}>
                  View all <ArrowRight />
                </Link>
              </Reveal>
              <Stagger className="product-grid" stagger={0.1}>
                {related.map((item) => (
                  <StaggerItem key={item.slug}>
                    <Link
                      className="catalog-card"
                      href={`/product/${item.slug}`}
                    >
                      <span className="catalog-card-media">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 760px) 90vw, 23vw"
                        />
                      </span>
                      <span className="catalog-card-body">
                        <span className="catalog-card-form">{item.form}</span>
                        <span className="catalog-card-title">{item.name}</span>
                        <span className="catalog-card-action holographic-btn">
                          <span className="holographic-btn__label">
                            View product
                            <ArrowRight size={14} />
                          </span>
                        </span>
                      </span>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        ) : null}

        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <Reveal className="contact-intro" y={40}>
              <div className="eyebrow light">
                <span />
                Start a conversation
              </div>
              <h2>Get In Touch</h2>
              <p>
                Request a quote for <strong>{product.name}</strong> or explore
                more {product.categoryLabel.toLowerCase()} products with S V
                Healthcare.
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
            <Reveal delay={0.15} y={48} scale={0.97}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <UtilityButtons />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
