import { siteConfig } from "@/content/site.config";

export function getLocalBusinessJsonLd() {
  const { contact, seo, company, tagline, social, google, categories } =
    siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    name: company,
    description: siteConfig.description,
    url: seo.siteUrl,
    telephone: contact.phone,
    email: contact.email,
    image: `${seo.siteUrl}${seo.ogImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.lat,
      longitude: contact.geo.lng,
    },
    openingHours: "Mo-Sa 10:00-19:00",
    priceRange: "₹₹",
    areaServed: {
      "@type": "City",
      name: "Hyderabad",
    },
    sameAs: [social.instagram, social.pinterest, social.facebook],
    slogan: tagline,
    knowsAbout: [...categories],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: google.rating,
      reviewCount: google.reviewCount.replace("+", ""),
      bestRating: "5",
    },
  };
}
