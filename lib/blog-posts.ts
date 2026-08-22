import { BLOG_SLUGS } from "@/lib/blog-slugs";
import {
  blogPostContents,
  type BlogPostContent,
} from "@/lib/blog-content.generated";

export type BlogPost = BlogPostContent & {
  href: string;
};

function localizeContentHtml(html: string) {
  const known = new Set<string>([...BLOG_SLUGS]);
  const aliases: Record<string, string> = {
    "diabetes-in-2026-causes-symptoms-types-treatment-options-2":
      "diabetes-in-2026-causes-symptoms-types-treatment-options",
  };

  return html
    .replace(
      /https?:\/\/(?:www\.)?svhealthcare\.in\/([a-z0-9-]+)\/?(#[a-z0-9-]+)?/gi,
      (match, slug: string, hash = "") => {
        const target = aliases[slug] || slug;
        if (known.has(target)) return `/${target}/${hash || ""}`;
        return match;
      },
    )
    .replace(/\sstyle="[^"]*width:\d+px[^"]*"/gi, "")
    .replace(/\r\n/g, "\n");
}

export const blogPosts: BlogPost[] = blogPostContents.map((post) => ({
  ...post,
  contentHtml: localizeContentHtml(post.contentHtml),
  href: `/${post.slug}`,
}));

export const featuredBlogPost = blogPosts[0];

export function getAllBlogSlugs() {
  return [...BLOG_SLUGS];
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const current = getBlogPostBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);

  const sameCategory = blogPosts.filter(
    (post) => post.slug !== slug && post.category === current.category,
  );
  const others = blogPosts.filter(
    (post) => post.slug !== slug && post.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}
