import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarHeart,
  Handshake,
  MapPinned,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";
import { EventListingFilters } from "@/components/EventListingFilters";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { UtilityButtons } from "@/components/UtilityButtons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EVENT_CATEGORIES, featuredEvent, siteEvents } from "@/lib/events";
import { SITE_CONFIG } from "@/lib/site-config";

const baseUrl = SITE_CONFIG.url;

const pageTitle = "Events - S V Healthcare";
const pageDescription =
  "Celebrating festivals, friendships, shared experiences, and the moments that make S V Healthcare a community.";

const categoryIcons = {
  festival: CalendarHeart,
  "get-together": Handshake,
  trip: MapPinned,
  dining: UtensilsCrossed,
  sports: Trophy,
} as const;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "S V Healthcare events",
    "company festivals",
    "team get-together",
    "Ganesh Chaturthi SV Healthcare",
    "workplace culture Ahmedabad",
  ],
  alternates: { canonical: "/events/" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/events/",
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: featuredEvent.coverImage,
        width: 1600,
        height: 900,
        alt: featuredEvent.coverImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [featuredEvent.coverImage],
  },
};

const eventsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${baseUrl}/events/#collection`,
      name: pageTitle,
      description: pageDescription,
      url: `${baseUrl}/events/`,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_CONFIG.name,
        url: baseUrl,
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
          name: "Events",
          item: `${baseUrl}/events/`,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "S V Healthcare events",
      numberOfItems: siteEvents.length,
      itemListElement: siteEvents.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}/events/${event.slug}/`,
        name: event.title,
      })),
    },
  ],
};

export default function EventsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Events"
          description={pageDescription}
          image={featuredEvent.coverImage}
          imageAlt="S V Healthcare team events and celebrations"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Events" },
          ]}
        />

        <section
          className="section bg-surface"
          aria-labelledby="event-types-title"
        >
          <div className="container">
            <Reveal className="section-heading" y={36}>
              <div className="eyebrow">
                <span />
                Life at SV
              </div>
              <h2 id="event-types-title">Moments beyond the workday</h2>
              <p className="!mx-0 text-left">
                From festivals and sports to trips and shared meals — these are
                the gatherings that keep our team connected, energized, and
                proud to grow together.
              </p>
            </Reveal>

            <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {EVENT_CATEGORIES.map((category) => {
                const Icon = categoryIcons[category.id];
                return (
                  <StaggerItem key={category.id}>
                    <article className="h-full rounded-2xl border border-line bg-white p-5">
                      <span className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <h3 className="m-0 font-display text-lg font-extrabold tracking-[-0.02em] text-ink">
                        {category.label}
                      </h3>
                      <p className="mt-2 mb-0 text-sm leading-relaxed text-ink-soft">
                        {category.description}
                      </p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section
          className="section"
          aria-labelledby="event-gallery-title"
        >
          <div className="container">
            <Reveal className="section-heading" y={36}>
              <div className="eyebrow">
                <span />
                Photo stories
              </div>
              <h2 id="event-gallery-title">Explore our event gallery</h2>
              <p className="!mx-0 text-left">
                Browse celebrations and team moments captured across the year —
                starting with Ganesh Chaturthi 2026.
              </p>
            </Reveal>

            <div className="mt-9">
              <EventListingFilters events={siteEvents} />
            </div>
          </div>
        </section>

        <section className="section blog-cta-section">
          <div className="container">
            <Reveal className="blog-cta-panel" y={40}>
              <div>
                <div className="eyebrow light">
                  <span />
                  Grow with us
                </div>
                <h2>Want to partner with a team that cares?</h2>
                <p>
                  Talk to S V Healthcare about pharmaceutical, nutraceutical,
                  and cosmetic solutions — backed by quality and a people-first
                  culture.
                </p>
              </div>
              <div className="blog-cta-actions">
                <ButtonLink href="/contact-us">
                  Contact us <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink variant="ghost" href="/about-us">
                  About our team
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />
    </>
  );
}
