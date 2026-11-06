/**
 * Site-wide brand, contact, nav, and SEO defaults.
 * Change this file first when onboarding a new client.
 */
export const siteConfig = {
  company: "Falkevin Interior Designers",
  tagline: "Blinds · Curtains · Wallpaper · Flooring · Interiors",
  location: "Abids, Hyderabad",
  logoText: "FALKevin",
  contactPerson: "Mohammed Faheem Uddin (Saahil)",
  description:
    "Falkevin Interior Designers in Abids, Hyderabad — blinds, curtains, wallpaper, WPVC panels, louvers, wooden flooring, modular kitchens, sofa work and complete interior fitting. We visit customers with sample catalogues.",

  /** Business categories from the previous Grexa listing. */
  categories: [
    "Blinds Shop",
    "Sofa store",
    "Modular home builder",
    "Curtain Maker and Retailer",
    "Interior fitting contractor",
    "Wood floor installation service",
    "Wood and laminate flooring supplier",
  ] as const,

  visitNote:
    "We visit customers with sample catalogues — wallpaper, curtains, blinds, wooden flooring, WPVC panel and floor mattings.",

  google: {
    rating: "5.0",
    reviewCount: "57+",
  },

  contact: {
    phone: "+91 72888 34999",
    phoneHref: "+917288834999",
    phoneSecondary: "+91 81216 46468",
    phoneSecondaryHref: "+918121646468",
    whatsapp: "917288834999",
    whatsappMessage:
      "Hello Falkevin Interior Designers, I would like to enquire about my space.",
    email: "hello@falkevininteriors.com",
    address: {
      line1: "Bombay Juice Center, Jagdish Market",
      line2: "Near Taj Hotel, Abids",
      city: "Hyderabad",
      state: "Telangana",
      postalCode: "500001",
      country: "India",
      full: "Bombay Juice Center, Jagdish Market, Near Taj Hotel, Abids, Hyderabad 500001",
    },
    geo: {
      lat: 17.3919528,
      lng: 78.4757716,
    },
    mapsUrl:
      "https://www.google.com/maps/place/Falkevin+Interior+Designers/@17.3919528,78.4757716,17z",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.413080818082!2d78.4757716!3d17.3919528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99ad4b2530af%3A0xd69c1fbf85707b5e!2sFalkevin%20Interior%20Designers!5e0!3m2!1sen!2sin!4v1793713617596!5m2!1sen!2sin",
  },

  social: {
    instagram:
      "https://www.instagram.com/falkevininteriordesigners?cplk=MmpnMjBkOGN2NW14",
    instagramHandle: "@falkevininteriordesigners",
    pinterest: "https://pinterest.com/falkevininteriors",
    facebook: "https://facebook.com/falkevininteriors",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/contact#contact-details" },
  ],

  cta: {
    primary: "Book a Consultation",
    primaryHref: "/contact#book-consultation",
    secondary: "Explore Services",
    secondaryHref: "/services",
    whatsapp: "WhatsApp Us",
    quote: "Request a Quote",
    viewAll: "Explore Services",
    discoverStory: "Discover Our Story",
    followInstagram: "Follow Us on Instagram",
    requestConsultation: "Request a Consultation",
  },

  seo: {
    siteUrl: "https://falkevininteriors.com",
    titleDefault:
      "Falkevin Interior Designers | Blinds, Curtains & Interiors, Abids Hyderabad",
    titleTemplate: "%s | Falkevin Interior Designers",
    description:
      "Best blinds shop and interior finishers in Abids, Hyderabad. Roller & Roman blinds, curtains, wallpaper, WPVC panels, louvers, wooden flooring, modular kitchen and complete interior work. 5.0 on Google.",
    ogImage: "/og-default.jpg",
    locale: "en_IN",
  },

  businessHours: "Mon–Sat, 10:00 AM – 10:00 PM",
  foundedYear: 2016,
} as const;

export type SiteConfig = typeof siteConfig;

export function getWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(
    customMessage ?? siteConfig.contact.whatsappMessage
  );
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`;
}
