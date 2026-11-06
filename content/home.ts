import { siteConfig } from "./site.config";

export const homeContent = {
  hero: {
    brand: "Falkevin Interior Designers",
    heading: "Blinds, curtains and interiors for Hyderabad homes.",
    subheading: siteConfig.visitNote,
    primaryCta: "Explore Services",
    primaryHref: "/services",
    secondaryCta: "Book a Consultation",
    secondaryHref: "/contact#book-consultation",
    scrollLabel: "Scroll",
  },
  studio: {
    label: "The Studio",
    heading: "A blinds shop and interior fitting studio in Abids.",
    paragraph:
      "Falkevin Interior Designers supplies and installs blinds, curtains, wallpaper, WPVC panels, louvers, wooden and laminate flooring, modular kitchens, sofa work and complete interior finishes — with sample catalogues brought to your home.",
    cta: "Discover Our Story",
    ctaHref: "/about",
  },
  selectedWork: {
    label: "Selected Work",
    heading: "Selected Work",
    subheading: "Wallpaper, curtains, blinds, flooring and full interior fits.",
    cta: "Book a Consultation",
    ctaHref: "/contact#book-consultation",
    projectSlugs: [
      "urban-retreat",
      "earth-house",
      "minimal-form",
      "warm-apartment",
      "material-house",
    ] as const,
  },
  servicesPreview: {
    heading: "Services from Abids’ trusted blinds & interiors studio.",
    items: [
      { number: "01", title: "Blinds Installation", imageKey: "blinds" },
      { number: "02", title: "Curtains Installation", imageKey: "curtains" },
      { number: "03", title: "Wallpaper", imageKey: "wallpaper" },
      { number: "04", title: "WPVC Panels", imageKey: "wpvc" },
      { number: "05", title: "Louvers", imageKey: "louvers" },
      { number: "06", title: "Wooden Flooring", imageKey: "wooden" },
      { number: "07", title: "Modular Kitchen", imageKey: "kitchen" },
      { number: "08", title: "Interior Fitting", imageKey: "interiors" },
    ] as const,
  },
  whyUs: {
    heading: "Why clients choose Falkevin.",
    blocks: [
      {
        number: "01",
        title: "Home visits with samples",
        text: "We bring catalogues for wallpaper, curtains, blinds, flooring, WPVC and mattings to your space.",
      },
      {
        number: "02",
        title: "Full interior range",
        text: "Blinds shop, curtain maker, flooring supplier, modular kitchens, sofa work and fitting contractor.",
      },
      {
        number: "03",
        title: "Quality that lasts",
        text: "Good materials, careful installation and finishes that hold up to daily use.",
      },
      {
        number: "04",
        title: "Trusted on Google",
        text: `${siteConfig.google.rating} rating from ${siteConfig.google.reviewCount} Google reviews.`,
      },
    ],
  },
  process: {
    id: "process",
    heading: "From enquiry to handover.",
    steps: [
      {
        number: "01",
        title: "Enquire",
        text: "Call or WhatsApp with your room and requirements.",
      },
      {
        number: "02",
        title: "Visit & samples",
        text: "We visit with catalogues and measure the space.",
      },
      {
        number: "03",
        title: "Recommend",
        text: "Clear options for blinds, curtains, panels, flooring or full interiors.",
      },
      {
        number: "04",
        title: "Install",
        text: "Supply and fitting by our team — neat and on time.",
      },
      {
        number: "05",
        title: "Handover",
        text: "Walkthrough so everything works as promised.",
      },
    ],
  },
  stats: [
    { value: siteConfig.google.rating, label: "Google rating" },
    { value: siteConfig.google.reviewCount, label: "Reviews" },
    { value: "137+", label: "Project photos" },
    { value: "Abids", label: "Based in Hyderabad" },
  ],
  journal: {
    heading: "Recent work & updates.",
    cta: "Follow Us on Instagram",
  },
  posts: [
    {
      title: "Customise non-woven wallpaper",
      text: "Custom non-woven wallpaper installed by Falkevin Interior Designers.",
    },
    {
      title: "Curtains installed",
      text: "Curtain installation completed for a Hyderabad home.",
    },
    {
      title: "Complete interior work",
      text: "Full interior fitting — finishes coordinated end to end.",
    },
    {
      title: "Privacy glass film",
      text: "Remote-controlled glass film for conference and cabin rooms — clear or private in one click, with warranty.",
    },
    {
      title: "HD & non-woven wallpaper",
      text: "HD and non-woven media wallpaper installation for feature walls.",
    },
  ] as const,
  finalCta: {
    heading: "Tell us what you need.",
    text: "Blinds, curtains, wallpaper, flooring, WPVC, louvers or a full interior fit — start with a call or WhatsApp.",
    primaryCta: "Book a Consultation",
    primaryHref: "/contact#book-consultation",
    secondaryCta: "WhatsApp Us",
  },
} as const;
