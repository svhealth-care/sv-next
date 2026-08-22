import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

type PageHeroProps = {
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
};

export function PageHero({
  title,
  description,
  image,
  imageAlt,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="page-hero-image"
      />
      <div className="page-hero-overlay" />
      <div className="container page-hero-content">
        <div className="page-hero-copy-block">
          <p className="page-hero-brand">{SITE_CONFIG.name}</p>
          <nav aria-label="Breadcrumb" className="page-breadcrumb">
            <ol>
              {breadcrumbs.map((item, index) => (
                <li key={item.label}>
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span aria-current="page">{item.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <span className="page-breadcrumb-sep" aria-hidden="true">
                      /
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
          <h1 id="page-hero-title">{title}</h1>
          {description ? <p className="page-hero-copy">{description}</p> : null}
        </div>
      </div>
    </section>
  );
}
