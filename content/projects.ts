export type ProjectCategory =
  | "apartments"
  | "villas"
  | "kitchens"
  | "bedrooms"
  | "living"
  | "commercial";

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  area: string;
  style: string;
  type: string;
  overview: string;
  brief: string;
  concept: string;
  materials: string[];
  featured?: boolean;
  homeIndex?: number;
};

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "apartments", label: "Apartments" },
  { id: "villas", label: "Villas" },
  { id: "kitchens", label: "Kitchens" },
  { id: "bedrooms", label: "Bedrooms" },
  { id: "living", label: "Living" },
  { id: "commercial", label: "Commercial" },
] as const;

export const projects: Project[] = [
  {
    slug: "urban-retreat",
    title: "The Urban Retreat",
    location: "Kondapur",
    category: "apartments",
    categoryLabel: "Residential / 3BHK",
    year: "2024",
    area: "1,850 sq.ft",
    style: "Contemporary Warm",
    type: "3BHK Apartment",
    featured: true,
    homeIndex: 1,
    overview:
      "A Kondapur apartment redesigned as a calm urban retreat — soft neutrals, considered storage and living spaces that open gently to light.",
    brief:
      "The clients wanted a home that felt quieter after long workdays, with a living room that could host family without feeling formal, and bedrooms that stayed restful.",
    concept:
      "We softened the existing shell with a warm ivory palette, introduced timber joinery as a continuous language, and reorganised circulation so the living–dining axis reads as one composed volume.",
    materials: [
      "White oak veneer",
      "Lime-wash wall finish",
      "Honed limestone",
      "Linen upholstery",
      "Brushed brass accents",
    ],
  },
  {
    slug: "earth-house",
    title: "The Earth House",
    location: "Jubilee Hills",
    category: "villas",
    categoryLabel: "Luxury Villa",
    year: "2023",
    area: "6,200 sq.ft",
    style: "Material Modern",
    type: "Luxury Villa",
    featured: true,
    homeIndex: 2,
    overview:
      "A Jubilee Hills villa composed around stone, timber and daylight — generous volumes tempered by tactile, grounded materials.",
    brief:
      "The family asked for a villa that felt substantial but not ornate: spaces for entertaining, a quieter private wing, and materials that age with dignity.",
    concept:
      "We anchored the public rooms in stone and warm timber, kept ceilings calm, and used lighting to emphasise height without spectacle. Private suites were edited for hush and continuity.",
    materials: [
      "Italian limestone",
      "Teak joinery",
      "Hand-finished plaster",
      "Natural wool rugs",
      "Antique bronze hardware",
    ],
  },
  {
    slug: "minimal-form",
    title: "Minimal Form",
    location: "Gachibowli",
    category: "apartments",
    categoryLabel: "Residential",
    year: "2024",
    area: "1,420 sq.ft",
    style: "Quiet Minimal",
    type: "2.5BHK Apartment",
    featured: true,
    homeIndex: 3,
    overview:
      "A Gachibowli residence distilled to essential forms — clean lines, restrained colour and storage that disappears into architecture.",
    brief:
      "A young couple sought a home free of clutter: fewer pieces, better proportions, and a kitchen that felt like part of the living space.",
    concept:
      "We reduced visual noise, aligned openings, and used a single timber tone throughout. Furniture was sparse; light and shadow do the rest.",
    materials: [
      "Matte laminate joinery",
      "Microcement accents",
      "Pale oak flooring",
      "Linen curtains",
      "Soft graphite metal",
    ],
  },
  {
    slug: "warm-apartment",
    title: "The Warm Apartment",
    location: "Madhapur",
    category: "living",
    categoryLabel: "2BHK Apartment",
    year: "2023",
    area: "1,180 sq.ft",
    style: "Soft Contemporary",
    type: "2BHK Apartment",
    featured: true,
    homeIndex: 4,
    overview:
      "A Madhapur 2BHK layered with warmth — rugs, timber and soft seating that make a compact plan feel generous.",
    brief:
      "The brief was simple: make a small apartment feel like a home you want to stay in — especially the living room and primary bedroom.",
    concept:
      "We used colour temperature and textile layering rather than square footage. Built-in storage freed the floor; lighting stayed low and warm.",
    materials: [
      "Walnut veneer",
      "Bouclé textiles",
      "Clay paint",
      "Handmade ceramics",
      "Warm LED lighting",
    ],
  },
  {
    slug: "material-house",
    title: "Material House",
    location: "Banjara Hills",
    category: "villas",
    categoryLabel: "Villa",
    year: "2022",
    area: "4,800 sq.ft",
    style: "Tactile Modern",
    type: "Independent Villa",
    featured: true,
    homeIndex: 5,
    overview:
      "A Banjara Hills villa organised as a material story — stone, timber and soft plaster in quiet conversation.",
    brief:
      "Clients wanted the interiors to feel architectural: honest materials, visible craft, and rooms that photograph as well as they live.",
    concept:
      "Each major room carries one dominant material, supported by quieter companions. Transitions are deliberate; thresholds become moments.",
    materials: [
      "Travertine",
      "Smoked oak",
      "Tadelakt-inspired plaster",
      "Linen and cotton blends",
      "Satin nickel fittings",
    ],
  },
  {
    slug: "light-kitchen",
    title: "Light Kitchen",
    location: "Hitech City",
    category: "kitchens",
    categoryLabel: "Modular Kitchen",
    year: "2024",
    area: "220 sq.ft",
    style: "Warm Minimal",
    type: "Modular Kitchen",
    overview:
      "A modular kitchen designed for serious cooking and quiet mornings — marble, timber and storage planned around real workflow.",
    brief:
      "The clients cook daily and entertain often. They needed durable surfaces, deep storage and an island that seats four without crowding.",
    concept:
      "We mapped the work triangle carefully, lifted upper storage into continuous volumes, and kept the island as a calm social counter.",
    materials: [
      "Calacatta-look quartz",
      "Warm oak shutters",
      "Soft-close hardware",
      "Fluted glass accents",
      "Under-cabinet lighting",
    ],
  },
  {
    slug: "quiet-bedroom",
    title: "Quiet Bedroom",
    location: "Financial District",
    category: "bedrooms",
    categoryLabel: "Primary Bedroom",
    year: "2023",
    area: "320 sq.ft",
    style: "Restful Neutral",
    type: "Primary Suite",
    overview:
      "A primary bedroom edited for rest — soft walls, layered textiles and lighting that never shouts.",
    brief:
      "The clients struggled to sleep in a visually busy room. They asked for calm materials, better blackout and storage that did not dominate.",
    concept:
      "We wrapped the headboard wall in warm timber, reduced contrast elsewhere, and introduced dimmable layers for evening wind-down.",
    materials: [
      "Oak paneling",
      "Stonewashed linen",
      "Wool carpet",
      "Blackout sheers",
      "Dim-to-warm LEDs",
    ],
  },
  {
    slug: "atelier-office",
    title: "Atelier Office",
    location: "Madhapur",
    category: "commercial",
    categoryLabel: "Office Interior",
    year: "2024",
    area: "2,400 sq.ft",
    style: "Warm Workplace",
    type: "Studio Office",
    overview:
      "A Madhapur studio office with timber accents, soft acoustics and spaces that support both deep work and conversation.",
    brief:
      "A design-led firm needed a workplace that felt like them: calm, material-rich, and free of corporate clichés.",
    concept:
      "We zoned focus and collaboration clearly, used timber to warm the glass shell, and kept branding subtle — present only in detail.",
    materials: [
      "Ash timber screens",
      "Acoustic felt",
      "Polished concrete",
      "Leather task seating",
      "Diffused linear lighting",
    ],
  },
  {
    slug: "stone-bath",
    title: "Stone Bath",
    location: "Jubilee Hills",
    category: "villas",
    categoryLabel: "Bathroom / Villa",
    year: "2022",
    area: "180 sq.ft",
    style: "Spa Minimal",
    type: "Primary Bathroom",
    overview:
      "A spa-like bathroom carved in stone — quiet luxury through texture, proportion and carefully controlled light.",
    brief:
      "Part of a villa renovation, the clients wanted a primary bath that felt like a retreat: stone, soft light, and a freestanding tub.",
    concept:
      "We kept the palette almost monochrome, celebrated the stone’s grain, and used niches and concealed storage to preserve calm surfaces.",
    materials: [
      "Honored marble",
      "Brushed gunmetal taps",
      "Fluted glass",
      "Teak bath stool",
      "Warm cove lighting",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProjectBySlug(slug);
  if (!current) return projects.slice(0, limit);
  return projects
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 1 : 0;
      const bScore = b.category === current.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.homeIndex ?? 99) - (b.homeIndex ?? 99));
}
