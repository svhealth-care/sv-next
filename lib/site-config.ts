export const SITE_CONFIG = {
  name: "S V Healthcare",
  url: "https://svhealthcare.in",
  description:
    "Discover S V Healthcare, the best pharma company in India, renowned for quality medicines, innovative research and global healthcare solutions.",
  contact: {
    phoneDisplay: "+91 99981 06442",
    phoneHref: "tel:+919998106442",
    whatsapp: "https://wa.me/919998106442",
    email: "info@svhealthcare.in",
    emailHref: "mailto:info@svhealthcare.in",
  },
  address: {
    short: "C-603, Siddhi Vinayak Business Tower, Makarba, Ahmedabad",
    full: "C-603, Siddhi Vinayak Business Tower, Near Kataria Automobiles, Makarba, Ahmedabad - 380051, Gujarat, India.",
    mapsUrl:
      "https://www.google.com/maps?cid=8129024145837997000&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.8146041006717!2d72.4994593!3d22.993844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6facdf27e941dc21%3A0x70d01864273f3bc8!2sS%20V%20Healthcare!5e0!3m2!1sen!2sin!4v1786521831135!5m2!1sen!2sin",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100091656957036",
    instagram: "https://www.instagram.com/svhealthcare.in/",
    linkedin: "https://www.linkedin.com/company/s-v-healthcare/",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about-us" },
    { label: "Services", href: "/our-services" },
    { label: "Export", href: "/export" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact-us" },
  ],
  productNavigation: [
    {
      label: "Pharmaceutical",
      href: "/pharmaceutical-products",
    },
    {
      label: "Nutraceutical",
      href: "/nutraceutical-products",
    },
    {
      label: "Cosmetic",
      href: "/cosmetic-products",
    },
  ],
} as const;
