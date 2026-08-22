import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { BlogPostGrid } from "@/components/BlogPostGrid";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { blogPosts, featuredBlogPost } from "@/lib/blog-posts";
import { SITE_CONFIG } from "@/lib/site-config";

const baseUrl = SITE_CONFIG.url;

const pageTitle = "Blog - S V Healthcare";
const pageDescription =
  "Learn diabetes causes and symptoms, different types, diabetes treatment options, prevention tips, and lifestyle changes for better health.";
const listingDescription =
  "Healthcare insights from S V Healthcare — diabetes causes and symptoms, diabetes treatment, women’s health, immunity, seasonal care, and pharma export guidance.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "diabetes causes and symptoms",
    "diabetes treatment",
    "S V Healthcare blog",
    "healthcare tips",
    "pharma export insights",
    "women's health",
    "immunity tips",
  ],
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/blog/",
    siteName: "SV Healthcare",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: featuredBlogPost.image,
        width: 1200,
        height: 628,
        alt: featuredBlogPost.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [featuredBlogPost.image],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${baseUrl}/blog/#blog`,
      name: pageTitle,
      description: listingDescription,
      url: `${baseUrl}/blog/`,
      publisher: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: baseUrl,
      },
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.dateIso,
        image: `${baseUrl}${post.image}`,
        url: `${baseUrl}${post.href}/`,
        author: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
        },
      })),
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
          name: "Blog",
          item: `${baseUrl}/blog/`,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "S V Healthcare blog articles",
      numberOfItems: blogPosts.length,
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}${post.href}/`,
        name: post.title,
      })),
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="blog-listing-page">
        <PageHero
          title="Blog"
          description={listingDescription}
          image={featuredBlogPost.image}
          imageAlt="S V Healthcare blog insights"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog" },
          ]}
        />

        <section
          className="section blog-listing-section"
          aria-labelledby="all-posts-title"
        >
          <div className="container">
            <Reveal className="section-heading" y={36}>
              <div className="eyebrow">
                <span />
                All articles
              </div>
              <h2 id="all-posts-title">Explore health & industry insights</h2>
              <p>
                Practical guidance on wellness, women’s health, seasonal care,
                and pharmaceutical export — written for patients, partners, and
                healthcare professionals.
              </p>
            </Reveal>

            <BlogPostGrid posts={blogPosts} />
          </div>
        </section>

        <section className="section blog-cta-section">
          <div className="container">
            <Reveal className="blog-cta-panel" y={40}>
              <div>
                <div className="eyebrow light">
                  <span />
                  Partner with us
                </div>
                <h2>Need product support or export guidance?</h2>
                <p>
                  Talk to S V Healthcare about pharmaceutical, nutraceutical,
                  and cosmetic solutions backed by quality and global reach.
                </p>
              </div>
              <div className="blog-cta-actions">
                <ButtonLink href="/contact-us">
                  Contact us <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink variant="ghost" href="/export">
                  Explore export
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </>
  );
}
