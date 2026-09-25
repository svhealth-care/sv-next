export const EVENT_CATEGORIES = [
  {
    id: "festival",
    label: "Festivals",
    description:
      "Seasonal celebrations that bring our teams together in culture, gratitude, and joy.",
  },
  {
    id: "get-together",
    label: "Get-togethers",
    description:
      "Informal team moments that strengthen bonds beyond the workday.",
  },
  {
    id: "trip",
    label: "Trips",
    description:
      "Outings and excursions where the SV family explores, unwinds, and reconnects.",
  },
  {
    id: "dining",
    label: "Lunch & Dinner",
    description:
      "Shared meals that turn colleagues into a community.",
  },
  {
    id: "sports",
    label: "Sports",
    description:
      "Friendly matches and active days that keep energy and teamwork high.",
  },
] as const;

export type EventCategoryId = (typeof EVENT_CATEGORIES)[number]["id"];

export type EventImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SiteEvent = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: EventCategoryId;
  categoryLabel: string;
  date: string;
  dateIso: string;
  location: string;
  coverImage: string;
  coverImageAlt: string;
  images: EventImage[];
  highlights: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

const ganeshBase = "/images/event_2026/ganesh_chaturthi";

export const siteEvents: SiteEvent[] = [
  {
    id: "ganesh-chaturthi-2026",
    slug: "ganesh-chaturthi-2026",
    title: "Ganesh Chaturthi 2026",
    excerpt:
      "Our team came together to welcome Lord Ganesha with devotion, decoration, prasadam, and the warmth of a shared celebration.",
    description:
      "Ganesh Chaturthi at S V Healthcare is more than a festival — it is a reminder of new beginnings, teamwork, and gratitude. Colleagues gathered to decorate the mandap, offer prayers, share sweets, and celebrate the spirit of togetherness that defines our workplace culture.",
    category: "festival",
    categoryLabel: "Festival",
    date: "August 2026",
    dateIso: "2026-08-27",
    location: "S V Healthcare, Ahmedabad",
    coverImage: `${ganeshBase}/6.webp`,
    coverImageAlt:
      "S V Healthcare team celebrating Ganesh Chaturthi 2026",
    images: [
      {
        src: `${ganeshBase}/1.webp`,
        alt: "Ganesh Chaturthi celebration at S V Healthcare — festive moment",
        width: 1200,
        height: 1600,
      },
      {
        src: `${ganeshBase}/2.webp`,
        alt: "Team gathering during Ganesh Chaturthi at S V Healthcare",
        width: 2268,
        height: 4032,
      },
      {
        src: `${ganeshBase}/4.webp`,
        alt: "Colleagues celebrating Ganesh Chaturthi together",
        width: 2268,
        height: 4032,
      },
      {
        src: `${ganeshBase}/5.webp`,
        alt: "Ganesh Chaturthi decorations and celebration details",
        width: 720,
        height: 1280,
      },
      {
        src: `${ganeshBase}/6.webp`,
        alt: "Wide view of the Ganesh Chaturthi celebration at S V Healthcare",
        width: 1600,
        height: 900,
      },
      {
        src: `${ganeshBase}/7.webp`,
        alt: "Team joy and togetherness during Ganesh Chaturthi",
        width: 720,
        height: 1280,
      },
      {
        src: `${ganeshBase}/8.webp`,
        alt: "Memorable moments from Ganesh Chaturthi 2026",
        width: 720,
        height: 1280,
      },
    ],
    highlights: [
      "Traditional aarti and blessings for a prosperous year ahead",
      "Decorated mandap prepared with care by our team",
      "Prasadam and festive snacks shared across departments",
      "A day of laughter, photos, and workplace togetherness",
    ],
    seoTitle: "Ganesh Chaturthi 2026 - S V Healthcare Events",
    seoDescription:
      "See highlights from Ganesh Chaturthi 2026 at S V Healthcare — team celebration, devotion, and workplace culture in Ahmedabad.",
    keywords: [
      "Ganesh Chaturthi S V Healthcare",
      "SV Healthcare events",
      "company festival celebration",
      "Ahmedabad pharma team culture",
    ],
  },
];

export const featuredEvent = siteEvents[0];

export function getAllEventSlugs() {
  return siteEvents.map((event) => event.slug);
}

export function getEventBySlug(slug: string) {
  return siteEvents.find((event) => event.slug === slug);
}

export function getEventsByCategory(category: EventCategoryId | "all") {
  if (category === "all") return siteEvents;
  return siteEvents.filter((event) => event.category === category);
}

export function getRelatedEvents(slug: string, limit = 3) {
  const current = getEventBySlug(slug);
  if (!current) return siteEvents.slice(0, limit);

  const sameCategory = siteEvents.filter(
    (event) => event.slug !== slug && event.category === current.category,
  );
  const others = siteEvents.filter(
    (event) => event.slug !== slug && event.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}
