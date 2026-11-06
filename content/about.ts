import { siteConfig } from "./site.config";

export const aboutContent = {
  label: "About",
  heading: "Blinds, curtains and interiors — brought to your door with samples.",
  story: {
    label: "Our Story",
    heading: "Based in Abids, built around real rooms.",
    paragraphs: [
      "Falkevin Interior Designers is a blinds shop and interior fitting studio in Abids, Hyderabad. We help homes and workplaces with wallpaper, curtains, blinds, wooden flooring, WPVC panels, louvers, modular kitchens, sofa work and complete interior finishing.",
      siteConfig.visitNote,
      "As a curtain maker and retailer, wood and laminate flooring supplier, and interior fitting contractor, we stay close to materials and installation — so what you choose is what gets fitted properly.",
    ],
  },
  philosophy: {
    label: "Philosophy",
    heading: "See it, feel it, then decide.",
    text: "We bring sample catalogues to you — wallpaper, curtains, blinds, flooring, WPVC and mattings — so decisions happen in your light, in your room, not only in a showroom.",
  },
  approach: {
    label: "Approach",
    heading: "Visit, recommend, install.",
    text: "Share what you need. We visit with options, recommend what fits budget and use, then supply and install — blinds, curtains, panels, flooring, kitchens and full interior work.",
  },
  founder: {
    label: "Founder",
    name: "Mohammed Faheem Uddin (Saahil)",
    role: "Founder · Falkevin Interior Designers",
    note: "“Every home deserves finishes that feel intentional. At Falkevin, we help you choose well — and we make sure the work is done properly.”",
  },
  team: {
    label: "The Studio",
    heading: "A focused team for finishes and fit-outs.",
    members: [
      {
        name: "Mohammed Faheem Uddin (Saahil)",
        role: "Founder & Lead",
      },
    ],
  },
  whatWeDo: {
    label: "What we do",
    heading: "More than a blinds shop.",
    items: siteConfig.categories,
  },
  values: {
    label: "Values",
    items: [
      {
        title: "Clarity",
        text: "Clear recommendations, clear pricing, clear timelines.",
      },
      {
        title: "Craft",
        text: "Careful installation across blinds, curtains, flooring and panels.",
      },
      {
        title: "Care",
        text: "Homes and shops are personal — we treat every project that way.",
      },
      {
        title: "Continuity",
        text: "From first WhatsApp enquiry to final handover on site.",
      },
    ],
  },
} as const;
