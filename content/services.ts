import { images } from "./images";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  filter?: string;
  description: string;
  offer: string[];
  approach: string;
  imageKey: keyof typeof images.services;
};

export const services: Service[] = [
  {
    slug: "blinds-installation",
    name: "Blinds Installation",
    shortName: "Blinds",
    filter: "living",
    description:
      "All kinds of blinds for homes and offices — measured, supplied and installed for light control and a clean finish.",
    offer: [
      "Roller blinds",
      "Roman blinds",
      "Vertical blinds",
      "Custom blinds",
      "All kinds of blinds",
    ],
    approach:
      "We visit with samples, measure accurately, and install blinds that fit the window and how you use the room.",
    imageKey: "blinds",
  },
  {
    slug: "curtains-installation",
    name: "Curtains Installation",
    shortName: "Curtains",
    filter: "living",
    description:
      "Curtain making and installation — sheer, main and net curtains tailored for Hyderabad homes.",
    offer: [
      "Sheer / share curtains",
      "Main curtains",
      "Net curtains",
      "Custom curtains",
      "All kinds of curtain services",
    ],
    approach:
      "As curtain makers and retailers, we help you pick fabric and style, then stitch and hang for a neat drape.",
    imageKey: "curtains",
  },
  {
    slug: "wallpaper",
    name: "Wallpaper",
    shortName: "Wallpaper",
    description:
      "HD and non-woven wallpaper — feature walls and full rooms installed cleanly with careful pattern alignment.",
    offer: [
      "Non-woven wallpaper",
      "HD media wallpaper",
      "Custom wallpaper",
      "Feature and full-room installs",
    ],
    approach:
      "We bring wallpaper catalogues to your home, recommend what suits the wall, and install with invisible seams.",
    imageKey: "wallpaper",
  },
  {
    slug: "wpvc-panel",
    name: "WPVC Panel Installation",
    shortName: "WPVC",
    description:
      "WPVC wall and ceiling panels for a neat, durable finish in homes, shops and offices.",
    offer: [
      "WPVC panel supply",
      "Wall and feature installs",
      "Moisture-friendly options",
      "Clean finishing and joins",
    ],
    approach:
      "Panels are planned for layout and joins first, then fixed so surfaces look even and intentional.",
    imageKey: "wpvc",
  },
  {
    slug: "louvers",
    name: "Louvers Installation",
    shortName: "Louvers",
    description:
      "Charcoal and decorative louvers for feature walls, partitions and architectural accents.",
    offer: [
      "Charcoal louvers",
      "Feature wall louvers",
      "Partition applications",
      "All kinds of louvers installation",
    ],
    approach:
      "We match louver profile and colour to the room, then install with consistent spacing and alignment.",
    imageKey: "louvers",
  },
  {
    slug: "wooden-flooring",
    name: "Wooden & Laminate Flooring",
    shortName: "Wood floors",
    filter: "apartments",
    description:
      "Wood floor installation and wood & laminate flooring supply for living rooms, bedrooms and corridors.",
    offer: [
      "Wooden flooring",
      "Laminate flooring",
      "Floor mattings",
      "Skirting and transitions",
    ],
    approach:
      "As a wood and laminate flooring supplier, we recommend durable options for Hyderabad use and install with clean edges.",
    imageKey: "wooden",
  },
  {
    slug: "epoxy-flooring",
    name: "Epoxy Flooring",
    shortName: "Epoxy",
    filter: "commercial",
    description:
      "Seamless epoxy floors for homes, shops and workspaces — durable and easy to maintain.",
    offer: [
      "Residential and commercial epoxy",
      "Solid and metallic options",
      "Surface preparation",
      "Sealing and aftercare",
    ],
    approach:
      "Good epoxy starts with prep. We assess the base, choose the system, and deliver a smooth lasting finish.",
    imageKey: "epoxy",
  },
  {
    slug: "floorings",
    name: "Floorings — All Types",
    shortName: "Flooring",
    description:
      "Multiple flooring systems and floor mattings matched to room use and budget.",
    offer: [
      "All types of flooring",
      "Floor mattings",
      "Room-by-room recommendations",
      "Supply and installation",
    ],
    approach:
      "Different rooms need different floors. We recommend what lasts, cleans easily and fits the look you want.",
    imageKey: "flooring",
  },
  {
    slug: "modular-kitchen",
    name: "Modular Kitchen",
    shortName: "Kitchen",
    filter: "kitchens",
    description:
      "Modular kitchen planning and fitting as part of complete interior work — storage, worktops and finishes that cook well.",
    offer: [
      "Modular kitchen layouts",
      "Carcass and shutter options",
      "Worktop coordination",
      "Installation with interior fit-out",
    ],
    approach:
      "As a modular home builder, we plan the kitchen around how you cook, then fit it with the rest of the interior.",
    imageKey: "kitchen",
  },
  {
    slug: "sofa-wooden-work",
    name: "Sofa & Wooden Work",
    shortName: "Sofa & wood",
    description:
      "Sofa making and custom wooden work coordinated with your blinds, flooring and interior finishes.",
    offer: [
      "Sofa making",
      "Custom wooden work",
      "Living and bedroom pieces",
      "Finish matching to interiors",
    ],
    approach:
      "Furniture and joinery should feel part of the same room story — we match materials and scale to the space.",
    imageKey: "sofa",
  },
  {
    slug: "pvc-ceiling-planks",
    name: "PVC Ceiling Planks",
    shortName: "Ceilings",
    description:
      "Lightweight PVC ceiling planks for neat, moisture-resistant ceilings.",
    offer: [
      "PVC plank ceiling systems",
      "False ceiling detailing",
      "Lighting cut-outs",
      "Moisture-prone area solutions",
    ],
    approach:
      "Ceilings should feel quiet and even. We plan layout and lighting points before installation.",
    imageKey: "ceilings",
  },
  {
    slug: "chandeliers-lighting",
    name: "Chandeliers & Lighting",
    shortName: "Lighting",
    filter: "living",
    description:
      "Statement chandeliers and lighting selected for room height, style and daily use.",
    offer: [
      "Chandelier selection and supply",
      "Dining and living focal lights",
      "Placement guidance",
      "Coordination with ceiling work",
    ],
    approach:
      "Lighting finishes a room. We help you choose pieces that feel right in scale and install them safely.",
    imageKey: "lighting",
  },
  {
    slug: "glass-film",
    name: "Glass Film / Privacy Film",
    shortName: "Glass film",
    filter: "commercial",
    description:
      "Privacy glass film for conference rooms, MD and CEO cabins — switch from clear to private at a click, with warranty options.",
    offer: [
      "Remote privacy glass film",
      "Conference and cabin installs",
      "One-click clear / privacy modes",
      "Warranty-backed systems",
    ],
    approach:
      "Ideal for offices that need daylight and privacy. We assess glass size and power access before install.",
    imageKey: "glass",
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    shortName: "Grass",
    filter: "villas",
    description:
      "Artificial grass for balconies, terraces and courtyards — green, low-maintenance and neatly edged.",
    offer: [
      "Balcony and terrace turf",
      "Courtyard installs",
      "Underlay and drainage prep",
      "Edging and finishing",
    ],
    approach:
      "We measure the area, choose pile for use, and install with clean edges.",
    imageKey: "grass",
  },
  {
    slug: "interior-fitting",
    name: "Interior Fitting Contractor",
    shortName: "Interiors",
    filter: "apartments",
    description:
      "Complete interior fitting — wallpapers, blinds, curtains, WPVC, louvers, modular kitchen, wooden flooring, wooden work, sofa making and all kinds of interior work.",
    offer: [
      "Wallpapers, blinds & curtains",
      "WPVC panels & louvers",
      "Modular kitchen & wooden work",
      "Sofa making & full interior work",
    ],
    approach:
      "When several finishes meet in one space, coordination matters. We keep the palette consistent and the site organised.",
    imageKey: "interiors",
  },
];

export const servicesPage = {
  label: "Services",
  heading: "Services from the best blinds shop in Abids.",
  intro:
    "Blinds, curtains, wallpaper, WPVC panels, louvers, wooden flooring, modular kitchens, sofa work, glass film and complete interior fitting — with sample catalogues brought to your home.",
} as const;
