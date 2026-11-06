import fs from "fs";

const pad = (n) => String(n).padStart(3, "0");
const img = (n, alt) => ({
  src: `/images/portfolio/${pad(n)}.webp`,
  alt,
});

/** Curated: polished finished shots preferred for public-facing slots */
const site = {
  hero: img(55, "Bedroom with arched botanical niche and custom headboard"),
  studio: img(18, "Sage green modular kitchen with black stone worktops"),
  finalCta: img(90, "Tray ceiling with warm cove lighting and geometric centrepiece"),
  aboutHero: img(8, "Commercial lounge with fluted wood, arched niches and warm lighting"),
  founder: img(25, "Sage cabinetry with open shelving and integrated LED lighting"),
  studioPhoto1: img(18, "L-shaped modular kitchen in sage green with black countertops"),
  studioPhoto2: img(85, "Floral feature wall with timber media console"),
  whyUs: img(12, "Bedroom with dual-tone wardrobes, window seat and custom headboard"),
};

const services = {
  blinds: img(1, "Geometric patterned roller blinds in a Hyderabad home"),
  curtains: img(100, "Floor-to-ceiling sheer and taupe curtains at a living room window"),
  wallpaper: img(85, "Floral wallpaper feature wall with timber media unit"),
  wpvc: img(95, "Marble-look wall panels with gold inlays and tray ceiling lighting"),
  louvers: img(8, "Vertical fluted wood wall panels and arched niches"),
  wooden: img(50, "Balcony with timber-look ceiling and warm recessed lights"),
  epoxy: img(15, "Polished light flooring in an open-plan living dining space"),
  flooring: img(10, "Living–dining flooring with custom cabinetry beyond"),
  kitchen: img(18, "L-shaped modular kitchen in sage green with black countertops"),
  sofa: img(20, "Custom bunk and seating upholstery in dusty rose fabric"),
  ceilings: img(90, "Multi-tier tray ceiling with cove and accent lighting"),
  lighting: img(8, "Pendant lighting and backlit lattice column"),
  glass: img(40, "Home office desk with large window and roller-ready frames"),
  grass: img(50, "Covered balcony terrace overlooking the city"),
  interiors: img(55, "Complete bedroom interior with arched niche and soft furnishings"),
};

const journal = [
  img(1, "Roller blind fabric detail"),
  img(5, "Cafe mural wardrobe panels"),
  img(8, "Fluted wood commercial lounge"),
  img(12, "Custom bedroom wardrobe and seating"),
  img(18, "Sage modular kitchen"),
  img(20, "Kids bunk bed with LED lighting"),
  img(25, "Tall pantry and open shelving detail"),
  img(55, "Arched botanical bedroom niche"),
  img(90, "Decorative tray ceiling with warm cove light"),
];

/** Thematic project blocks — strongest matching photos first */
const projectCurated = {
  "urban-retreat": {
    title: "Urban Retreat",
    nums: [10, 15, 34, 35, 36, 3, 9, 11],
  },
  "earth-house": {
    title: "Earth House",
    nums: [8, 85, 95, 45, 46, 22, 23, 24],
  },
  "minimal-form": {
    title: "Minimal Form",
    nums: [55, 90, 28, 30, 33, 26, 27, 29],
  },
  "warm-apartment": {
    title: "Warm Apartment",
    nums: [12, 20, 37, 38, 39, 41, 42, 14],
  },
  "material-house": {
    title: "Material House",
    nums: [95, 85, 43, 44, 47, 48, 49, 51],
  },
  "light-kitchen": {
    title: "Light Kitchen",
    nums: [18, 25, 52, 53, 54, 56, 57, 58],
  },
  "quiet-bedroom": {
    title: "Quiet Bedroom",
    nums: [55, 12, 20, 60, 61, 62, 63, 64],
  },
  "atelier-office": {
    title: "Atelier Office",
    nums: [70, 40, 68, 69, 71, 72, 73, 74],
  },
  "stone-bath": {
    title: "Stone Bath",
    nums: [95, 76, 77, 78, 79, 80, 81, 82],
  },
};

const used = new Set();
function claim(n) {
  used.add(n);
  return n;
}

for (const v of Object.values(site)) {
  const m = v.src.match(/(\d+)\.webp$/);
  if (m) used.add(Number(m[1]));
}
for (const v of Object.values(services)) {
  const m = v.src.match(/(\d+)\.webp$/);
  if (m) used.add(Number(m[1]));
}
for (const v of journal) {
  const m = v.src.match(/(\d+)\.webp$/);
  if (m) used.add(Number(m[1]));
}

const projects = {};
for (const [slug, { title, nums }] of Object.entries(projectCurated)) {
  const assigned = nums.map(claim);
  projects[slug] = {
    cover: img(assigned[0], `${title} — project cover`),
    gallery: [
      img(assigned[1], `${title} gallery view 1`),
      img(assigned[2], `${title} gallery view 2`),
      img(assigned[3], `${title} gallery view 3`),
      img(assigned[4], `${title} gallery view 4`),
    ],
    before: img(assigned[5], `${title} before stage`),
    after: img(assigned[6], `${title} after stage`),
    final: img(assigned[7], `${title} final view`),
  };
}

function serialize(obj, indent = 0) {
  const padStr = "  ".repeat(indent);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map((item) => serialize(item, indent + 1)).join(",\n");
    return `[\n${items},\n${padStr}]`;
  }
  if (obj && typeof obj === "object") {
    const keys = Object.keys(obj);
    const lines = keys.map((k) => {
      const key = /^[a-zA-Z_][\w]*$/.test(k) ? k : JSON.stringify(k);
      return `${"  ".repeat(indent + 1)}${key}: ${serialize(obj[k], indent + 1)}`;
    });
    return `{\n${lines.join(",\n")},\n${padStr}}`;
  }
  if (typeof obj === "string") return JSON.stringify(obj);
  return String(obj);
}

const imagesObj = {
  logo: { src: "/brand/logo-circle.webp", alt: "Falkevin Interior Designers" },
  logoLight: { src: "/brand/logo-circle.webp", alt: "Falkevin Interior Designers" },
  ...site,
  services,
  journal,
  projects,
};

const file = `/**
 * ALL image URLs live here. Client photography from Falkevin project archives.
 * Files in /public/images/portfolio — sourced from INTERIOR1–3 deliveries.
 */
export type ImageAsset = {
  src: string;
  alt: string;
  photographer?: string;
  sourceUrl?: string;
};

export const images = ${serialize(imagesObj)} as const;

export type ImagesConfig = typeof images;
`;

// Fix journal cast — serialize loses `as ImageAsset[]`
const fixed = file.replace(
  /(\n  journal: \[[\s\S]*?\],)\n  projects:/,
  "$1\n  projects:",
);

fs.writeFileSync("content/images.ts", fixed);
console.log("wrote content/images.ts, unique claimed:", used.size);
