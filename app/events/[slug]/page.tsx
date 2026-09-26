import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
} from "lucide-react";
import { EventGallery } from "@/components/EventGallery";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { AppLink } from "@/components/ui/AppLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  getAllEventSlugs,
  getEventBySlug,
  getRelatedEvents,
} from "@/lib/events";
import { SITE_CONFIG } from "@/lib/site-config";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  return {
    title: event.seoTitle,
    description: event.seoDescription,
    keywords: event.keywords,
    alternates: { canonical: `/events/${event.slug}/` },
    openGraph: {
      title: event.seoTitle,
      description: event.seoDescription,
      url: `/events/${event.slug}/`,
      siteName: SITE_CONFIG.name,
      type: "article",
      locale: "en_US",
      images: [
        {
          url: event.coverImage,
          width: 1600,
          height: 900,
          alt: event.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.seoTitle,
      description: event.seoDescription,
      images: [event.coverImage],
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const related = getRelatedEvents(event.slug);
  const cover = event.images.find((image) => image.src === event.coverImage);
  const coverWidth = cover?.width ?? 1600;
  const coverHeight = cover?.height ?? 900;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: event.title,
        description: event.seoDescription,
        image: event.images.map((image) => `${SITE_CONFIG.url}${image.src}`),
        startDate: event.dateIso,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.location,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ahmedabad",
            addressRegion: "Gujarat",
            addressCountry: "IN",
          },
        },
        organizer: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
        },
        url: `${SITE_CONFIG.url}/events/${event.slug}/`,
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
            name: "Events",
            item: `${SITE_CONFIG.url}/events/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: event.title,
            item: `${SITE_CONFIG.url}/events/${event.slug}/`,
          },
        ],
      },
      {
        "@type": "ImageGallery",
        name: `${event.title} photo gallery`,
        associatedMedia: event.images.map((image) => ({
          "@type": "ImageObject",
          contentUrl: `${SITE_CONFIG.url}${image.src}`,
          description: image.alt,
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={event.title}
          description={event.excerpt}
          image={event.coverImage}
          imageAlt={event.coverImageAlt}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Events", href: "/events" },
            { label: event.title },
          ]}
        />

        <section className="section bg-surface">
          <div className="container grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] xl:items-start">
            <article className="overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[0_14px_40px_rgba(15,41,68,0.06)]">
              <div className="relative min-h-[clamp(240px,42vw,420px)] bg-surface">
                <Image
                  src={event.coverImage}
                  alt={event.coverImageAlt}
                  width={coverWidth}
                  height={coverHeight}
                  priority
                  sizes="(max-width: 980px) 92vw, 60vw"
                  className="h-full min-h-[clamp(240px,42vw,420px)] w-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 px-[clamp(22px,3vw,40px)] pt-[22px] text-xs font-bold uppercase tracking-[0.04em] text-[#8390a0]">
                <span className="text-brand">{event.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{event.date}</span>
                <span aria-hidden="true">·</span>
                <span>{SITE_CONFIG.name}</span>
              </div>

              <div className="px-[clamp(22px,3vw,40px)] pb-[clamp(28px,4vw,48px)] pt-5">
                <p className="m-0 text-base leading-[1.8] text-ink-soft">
                  {event.description}
                </p>

                <ul className="mt-8 grid list-none gap-3 p-0 sm:grid-cols-2">
                  {event.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm leading-relaxed text-ink"
                    >
                      <Sparkles
                        size={16}
                        className="mt-0.5 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <aside className="xl:sticky xl:top-28">
              <div className="rounded-[var(--radius)] border border-line bg-white p-6 shadow-[0_14px_40px_rgba(15,41,68,0.06)]">
                <div className="eyebrow">
                  <span />
                  Event details
                </div>
                <h2 className="mt-3 mb-5 font-display text-[26px] font-extrabold tracking-[-0.03em] text-ink">
                  {event.title}
                </h2>

                <dl className="m-0 grid gap-4">
                  <div className="flex gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <CalendarDays size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="m-0 text-xs font-bold uppercase tracking-[0.04em] text-[#8390a0]">
                        When
                      </dt>
                      <dd className="m-0 mt-1 text-sm font-semibold text-ink">
                        {event.date}
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <MapPin size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="m-0 text-xs font-bold uppercase tracking-[0.04em] text-[#8390a0]">
                        Where
                      </dt>
                      <dd className="m-0 mt-1 text-sm font-semibold text-ink">
                        {event.location}
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href="/events" variant="outline">
                    <ArrowLeft size={16} />
                    All events
                  </ButtonLink>
                  <ButtonLink href="/contact-us">
                    Contact us
                    <ArrowRight size={16} />
                  </ButtonLink>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section
          className="section"
          aria-labelledby="event-photos-title"
        >
          <div className="container">
            <Reveal className="section-heading" y={36}>
              <div className="eyebrow">
                <span />
                Gallery
              </div>
              <h2 id="event-photos-title">
                {event.images.length} photos from the celebration
              </h2>
              <p className="!mx-0 text-left">
                Tap any image to open the full gallery. Fresh memories from our
                Ganesh Chaturthi celebration at S V Healthcare.
              </p>
            </Reveal>

            <div className="mt-9">
              <EventGallery images={event.images} title={event.title} />
            </div>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="section bg-surface" aria-labelledby="more-events">
            <div className="container">
              <Reveal className="section-heading" y={36}>
                <div className="eyebrow">
                  <span />
                  More moments
                </div>
                <h2 id="more-events">Keep exploring our culture</h2>
              </Reveal>

              <Stagger className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {related.map((item) => (
                  <StaggerItem key={item.id}>
                    <AppLink
                      href={`/events/${item.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white no-underline transition hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_34px_rgba(15,41,68,0.1)]"
                    >
                      <span className="relative block min-h-[200px] overflow-hidden">
                        <Image
                          src={item.coverImage}
                          alt={item.coverImageAlt}
                          fill
                          sizes="(max-width: 760px) 92vw, 30vw"
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                      </span>
                      <span className="flex flex-1 flex-col gap-2 p-5">
                        <span className="text-xs font-bold uppercase tracking-[0.04em] text-brand">
                          {item.categoryLabel}
                        </span>
                        <span className="font-display text-lg font-extrabold text-ink">
                          {item.title}
                        </span>
                        <span className="line-clamp-2 text-sm text-ink-soft">
                          {item.excerpt}
                        </span>
                      </span>
                    </AppLink>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        ) : null}

        <section className="section blog-cta-section">
          <div className="container">
            <Reveal className="blog-cta-panel" y={40}>
              <div>
                <div className="eyebrow light">
                  <span />
                  Join the journey
                </div>
                <h2>Building healthcare and community</h2>
                <p>
                  Discover how S V Healthcare combines quality medicines with a
                  culture of celebration, care, and collaboration.
                </p>
              </div>
              <div className="blog-cta-actions">
                <ButtonLink href="/about-us">
                  About us <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink variant="ghost" href="/events">
                  Back to events
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
