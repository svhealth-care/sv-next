import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { IphexEventProvider } from "@/components/IphexEventProvider";
import { RouteScrollManager } from "@/components/RouteScrollManager";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const headingFont = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: "S V Healthcare: Best Pharma Company in India",
  description: SITE_CONFIG.description,
  keywords: [
    "best pharma company in India",
    "top pharma companies in India",
    "leading pharma companies in India",
    "pharmaceutical exporter",
    "nutraceutical products",
    "S V Healthcare",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "S V Healthcare: Best Pharma Company in India",
    description:
      "Discover S V Healthcare, the best pharma company in India, renowned for quality medicines, innovative research and global healthcare solutions.",
    url: "/",
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/home/about.webp",
        width: 649,
        height: 661,
        alt: "S V Healthcare pharmaceutical company in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "S V Healthcare: Best Pharma Company in India",
    description:
      "Discover quality medicines, innovative research and global healthcare solutions from S V Healthcare.",
    images: ["/images/home/about.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "hDM8z5G6E06xzQNAu8TaYlLgHt6sc3R8v_bFaRafL_8",
  },
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "Healthcare",
  icons: { icon: "/images/brand/logo-mark.webp" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/images/brand/sv-healthcare-logo.webp`,
      email: SITE_CONFIG.contact.email,
      telephone: SITE_CONFIG.contact.phoneDisplay,
      sameAs: [
        SITE_CONFIG.social.facebook,
        SITE_CONFIG.social.instagram,
        SITE_CONFIG.social.linkedin,
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress:
          SITE_CONFIG.address.full,
        addressLocality: "Ahmedabad",
        postalCode: "380051",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why is your company the best pharma exporter in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We focus on best quality, diverse product range and extensive experience in global exports. Our commitment to innovation, patient welfare and international health sets us apart.",
          },
        },
        {
          "@type": "Question",
          name: "What kind of pharma products do you export?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer a comprehensive portfolio covering pharmaceutical, nutraceutical and cosmetics categories.",
          },
        },
        {
          "@type": "Question",
          name: "Which countries do you currently export to?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We have a strong presence across the USA, Myanmar, Cambodia, Venezuela, South East Asia and Latin America.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <RouteScrollManager />
        <IphexEventProvider>{children}</IphexEventProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
