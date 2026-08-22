import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/product/biotion-2500mg-tablets",
        destination: "/product/biotin-2500mg-tablet/",
        permanent: true,
      },
      {
        source: "/product/biotin-2500mg-tablets",
        destination: "/product/biotin-2500mg-tablet/",
        permanent: true,
      },
      {
        source: "/product/azithromyicin-tablets",
        destination: "/product/azithromycin-tablet/",
        permanent: true,
      },
      {
        source: "/product/azithromycin-tablets",
        destination: "/product/azithromycin-tablet/",
        permanent: true,
      },
      {
        source: "/product/diaclofenac-tablets",
        destination: "/product/diclofenac-tablet/",
        permanent: true,
      },
      {
        source: "/product/diclofenac-tablets",
        destination: "/product/diclofenac-tablet/",
        permanent: true,
      },
      {
        source: "/product/sefixime-suspension",
        destination: "/product/cefixime-suspension/",
        permanent: true,
      },
      {
        source: "/product/cefoperazone-sulbactum-injection",
        destination: "/product/cefoperazone-sulbactam-injection/",
        permanent: true,
      },
      {
        source: "/product/cefti-rox-sulbactum-injection",
        destination: "/product/ceftriaxone-sulbactam-injection/",
        permanent: true,
      },
      {
        source: "/product/vr-glycolic-acid-facewash-3d",
        destination: "/product/vr-glycolic-acid-facewash/",
        permanent: true,
      },
      {
        source: "/product/amoxicillin-and-potassium-clavulanate",
        destination:
          "/product/amoxicillin-and-potassium-clavulanate-625-mg-tablet/",
        permanent: true,
      },
      {
        source: "/product/amoxicillin-and-potassium-clavulanate-625-mg-tablets",
        destination:
          "/product/amoxicillin-and-potassium-clavulanate-625-mg-tablet/",
        permanent: true,
      },
      {
        source: "/product/amlodipine-tablets-2",
        destination: "/product/amlodipine-tablet/",
        permanent: true,
      },
      {
        source: "/product/amlodipine-tablets",
        destination: "/product/amlodipine-tablet/",
        permanent: true,
      },
      {
        source: "/product/joint-support-tablets-2",
        destination: "/product/joint-support-tablet/",
        permanent: true,
      },
      {
        source: "/product/joint-support-tablets",
        destination: "/product/joint-support-tablet/",
        permanent: true,
      },
      {
        source:
          "/diabetes-in-2026-causes-symptoms-types-treatment-options-2",
        destination:
          "/diabetes-in-2026-causes-symptoms-types-treatment-options/",
        permanent: true,
      },
      {
        source: "/product/:slug(.*)-tablets-:rest(.*)",
        destination: "/product/:slug-tablet-:rest/",
        permanent: true,
      },
      {
        source: "/product/:slug(.*)-tablets",
        destination: "/product/:slug-tablet/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
