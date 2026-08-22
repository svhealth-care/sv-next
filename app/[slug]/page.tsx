import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { AppLink } from "@/components/ui/AppLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog-posts";
import { SITE_CONFIG } from "@/lib/site-config";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    alternates: { canonical: `/${post.slug}/` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `/${post.slug}/`,
      siteName: "SV Healthcare",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 627,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(post.slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seoDescription,
        image: [`${SITE_CONFIG.url}${post.image}`],
        datePublished: post.dateIso,
        dateModified: post.dateIso,
        author: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
        },
        mainEntityOfPage: `${SITE_CONFIG.url}/${post.slug}/`,
        keywords: post.keywords.join(", "),
        articleSection: post.category,
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
            name: "Blog",
            item: `${SITE_CONFIG.url}/blog/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${SITE_CONFIG.url}/${post.slug}/`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="blog-detail-page">
        <PageHero
          title={post.title}
          description={post.excerpt}
          image={post.image}
          imageAlt={post.imageAlt}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <section className="section blog-detail-section">
          <div className="container blog-detail-layout">
            <article className="blog-detail-main">
              <Reveal className="blog-detail-featured" y={28} amount={0.05}>
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 980px) 92vw, 70vw"
                />
              </Reveal>

              <div className="blog-detail-meta">
                <span>{post.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.dateIso}>{post.date}</time>
                <span aria-hidden="true">·</span>
                <span>S V Healthcare</span>
              </div>

              <div
                className="blog-article-content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </article>

            <aside className="blog-detail-aside">
              <Reveal y={36} delay={0.08} amount={0.15}>
                <div className="blog-aside-card">
                  <div className="eyebrow">
                    <span />
                    Related reading
                  </div>
                  <h2>More insights</h2>
                  <Stagger className="blog-aside-list" stagger={0.1}>
                    {related.map((item) => (
                      <StaggerItem key={item.slug}>
                        <AppLink
                          href={item.href}
                          className="blog-aside-item"
                        >
                          <span className="blog-aside-thumb">
                            <Image
                              src={item.image}
                              alt={item.imageAlt}
                              fill
                              sizes="88px"
                            />
                          </span>
                          <span>
                            <span className="blog-aside-date">{item.date}</span>
                            <span className="blog-aside-title">{item.title}</span>
                          </span>
                        </AppLink>
                      </StaggerItem>
                    ))}
                  </Stagger>
                  <ButtonLink href="/blog" variant="outline" className="mt-5">
                    View all articles <ArrowRight size={16} />
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal y={32} delay={0.12} amount={0.15}>
                <div className="blog-aside-cta">
                  <div className="eyebrow light">
                    <span />
                    Partner with us
                  </div>
                  <h2>Need healthcare product support?</h2>
                  <p>
                    Talk to S V Healthcare about pharmaceutical, nutraceutical,
                    and cosmetic solutions.
                  </p>
                  <ButtonLink href="/contact-us">
                    Contact us <ArrowRight size={16} />
                  </ButtonLink>
                </div>
              </Reveal>
            </aside>
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
