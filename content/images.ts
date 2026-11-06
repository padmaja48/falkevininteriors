/**
 * ALL image URLs live here. Client photography from Falkevin project archives.
 * Files in /public/images/portfolio — sourced from INTERIOR1–3 deliveries.
 */
export type ImageAsset = {
  src: string;
  alt: string;
  photographer?: string;
  sourceUrl?: string;
};

export const images = {
  logo: {
    src: "/brand/logo-circle.webp",
    alt: "Falkevin Interior Designers",
  },
  logoLight: {
    src: "/brand/logo-circle.webp",
    alt: "Falkevin Interior Designers",
  },
  hero: {
    src: "/images/hero.jpg",
    alt: "Warm cafe interior with terracotta seating, fluted wood arches and geometric ceiling lighting",
  },
  studio: {
    src: "/images/portfolio/211.webp",
    alt: "Sage green modular kitchen with black stone worktops and warm under-cabinet lighting",
  },
  finalCta: {
    src: "/images/client/final-cta-s28.png",
    alt: "Contemporary living room with blue seating, warm accents and a mountain view",
  },
  aboutHero: {
    src: "/images/portfolio/207.webp",
    alt: "Warm cafe lounge with banquette seating, mural walls and layered lighting",
  },
  founder: {
    src: "/images/client/about-founder-s11.png",
    alt: "Warm interior with a fluted wood feature wall, arched niches and pendant lighting",
  },
  studioPhoto1: {
    src: "/images/portfolio/206.webp",
    alt: "L-shaped modular kitchen in sage green with black countertops",
  },
  studioPhoto2: {
    src: "/images/portfolio/209.webp",
    alt: "Dining lounge with terracotta chairs and botanical wall art",
  },
  whyUs: {
    src: "/images/client/why-us-s15.png",
    alt: "Living room media wall with illuminated shelving and a marble panel",
  },
  services: {
    blinds: {
      src: "/images/client/service-s31-blinds.png",
      alt: "Roller blind installation in a colourful bedroom",
    },
    curtains: {
      src: "/images/client/service-curtains.png",
      alt: "Layered curtains and sheer drapes framing a living room window",
    },
    wallpaper: {
      src: "/images/client/service-s31-wallpaper.png",
      alt: "Floral wallpaper feature wall with curtains",
    },
    wpvc: {
      src: "/images/client/service-wpvc.png",
      alt: "Decorative wall panel installation with an illuminated arched opening",
    },
    louvers: {
      src: "/images/client/service-s31-louvers.png",
      alt: "Wooden louver feature wall framing a living room TV unit",
    },
    wooden: {
      src: "/images/client/service-wooden.png",
      alt: "Wooden flooring in a bedroom",
    },
    epoxy: {
      src: "/images/client/service-s31-epoxy.png",
      alt: "Seamless epoxy flooring in a modern commercial interior",
    },
    flooring: {
      src: "/images/client/service-s30-flooring.png",
      alt: "Wooden flooring in a bright living room",
    },
    kitchen: {
      src: "/images/client/service-s31-kitchen.png",
      alt: "Green modular kitchen with warm under-cabinet lighting",
    },
    sofa: {
      src: "/images/client/service-s30-sofa.png",
      alt: "Custom wooden TV unit and living room joinery",
    },
    ceilings: {
      src: "/images/client/service-s31-ceilings.png",
      alt: "Wood-panelled ceiling with recessed and cove lighting",
    },
    lighting: {
      src: "/images/client/service-s30-lighting.png",
      alt: "Crystal chandelier with layered ceiling lighting",
    },
    glass: {
      src: "/images/client/service-s31-glass.png",
      alt: "Frosted privacy film on glass office partitions",
    },
    grass: {
      src: "/images/client/service-s30-grass.png",
      alt: "Artificial grass installation in a modern fitness space",
    },
    interiors: {
      src: "/images/client/service-s31-interiors.png",
      alt: "Complete bedroom interior with blinds, curtains and custom finishes",
    },
  },
  journal: [
    {
      src: "/images/client/recent-work-1.png",
      alt: "Bedroom with blue wardrobe cabinetry and warm cove lighting",
    },
    {
      src: "/images/client/recent-work-2.png",
      alt: "Entry living area with a wooden double door, marble flooring and an illuminated textured wall",
    },
    {
      src: "/images/client/recent-work-3.png",
      alt: "Bedroom with an arched upholstered headboard, fluted feature wall and illuminated shelving",
    },
    {
      src: "/images/client/recent-work-4.png",
      alt: "Illuminated balcony with a wood ceiling and city view",
    },
    {
      src: "/images/portfolio/206.webp",
      alt: "Sage modular kitchen",
    },
    {
      src: "/images/client/recent-work-5.png",
      alt: "Living room with a marble TV wall, geometric detailing and warm cove lighting",
    },
    {
      src: "/images/client/recent-work-6.png",
      alt: "Living room with colourful abstract wallpaper, dark wood doors and a backlit TV unit",
    },
    {
      src: "/images/client/recent-work-7.png",
      alt: "Living room with a tropical botanical wallpaper feature wall and illuminated TV unit",
    },
    {
      src: "/images/client/recent-work-s16.png",
      alt: "Recent interior project photograph 16",
    },
    {
      src: "/images/client/recent-work-s17.png",
      alt: "Recent interior project photograph 17",
    },
    {
      src: "/images/client/recent-work-s18.png",
      alt: "Recent interior project photograph 18",
    },
    {
      src: "/images/client/recent-work-s19.png",
      alt: "Recent interior project photograph 19",
    },
    {
      src: "/images/client/recent-work-s20.png",
      alt: "Recent interior project photograph 20",
    },
    {
      src: "/images/client/recent-work-s21.png",
      alt: "Recent interior project photograph 21",
    },
    {
      src: "/images/client/recent-work-s22.png",
      alt: "Recent interior project photograph 22",
    },
    {
      src: "/images/client/recent-work-s23.png",
      alt: "Recent interior project photograph 23",
    },
    {
      src: "/images/client/recent-work-s24.png",
      alt: "Recent interior project photograph 24",
    },
    {
      src: "/images/client/recent-work-s25.png",
      alt: "Recent interior project photograph 25",
    },
    {
      src: "/images/client/recent-work-s26.png",
      alt: "Recent interior project photograph 26",
    },
    {
      src: "/images/client/recent-work-s27.png",
      alt: "Recent interior project photograph 27",
    },
  ],
  projects: {
    "urban-retreat": {
      cover: {
        src: "/images/selected-work/a1.webp",
        alt: "Urban Retreat — project cover",
      },
      gallery: [
{
          src: "/images/portfolio/015.webp",
          alt: "Urban Retreat gallery view 1",
        },
{
          src: "/images/portfolio/034.webp",
          alt: "Urban Retreat gallery view 2",
        },
{
          src: "/images/portfolio/035.webp",
          alt: "Urban Retreat gallery view 3",
        },
{
          src: "/images/portfolio/036.webp",
          alt: "Urban Retreat gallery view 4",
        },
      ],
      before: {
        src: "/images/portfolio/003.webp",
        alt: "Urban Retreat before stage",
      },
      after: {
        src: "/images/portfolio/009.webp",
        alt: "Urban Retreat after stage",
      },
      final: {
        src: "/images/portfolio/011.webp",
        alt: "Urban Retreat final view",
      },
    },
    "earth-house": {
      cover: {
        src: "/images/selected-work/s2.webp",
        alt: "Earth House — project cover",
      },
      gallery: [
{
          src: "/images/portfolio/085.webp",
          alt: "Earth House gallery view 1",
        },
{
          src: "/images/portfolio/090.webp",
          alt: "Earth House gallery view 2",
        },
{
          src: "/images/portfolio/045.webp",
          alt: "Earth House gallery view 3",
        },
{
          src: "/images/portfolio/046.webp",
          alt: "Earth House gallery view 4",
        },
      ],
      before: {
        src: "/images/portfolio/022.webp",
        alt: "Earth House before stage",
      },
      after: {
        src: "/images/portfolio/023.webp",
        alt: "Earth House after stage",
      },
      final: {
        src: "/images/portfolio/024.webp",
        alt: "Earth House final view",
      },
    },
    "minimal-form": {
      cover: {
        src: "/images/selected-work/s3.webp",
        alt: "Minimal Form — project cover",
      },
      gallery: [
{
          src: "/images/portfolio/090.webp",
          alt: "Minimal Form gallery view 1",
        },
{
          src: "/images/portfolio/028.webp",
          alt: "Minimal Form gallery view 2",
        },
{
          src: "/images/portfolio/030.webp",
          alt: "Minimal Form gallery view 3",
        },
{
          src: "/images/portfolio/033.webp",
          alt: "Minimal Form gallery view 4",
        },
      ],
      before: {
        src: "/images/portfolio/026.webp",
        alt: "Minimal Form before stage",
      },
      after: {
        src: "/images/portfolio/027.webp",
        alt: "Minimal Form after stage",
      },
      final: {
        src: "/images/portfolio/029.webp",
        alt: "Minimal Form final view",
      },
    },
    "warm-apartment": {
      cover: {
        src: "/images/selected-work/s4.webp",
        alt: "Warm Apartment — project cover",
      },
      gallery: [
{
          src: "/images/portfolio/020.webp",
          alt: "Warm Apartment gallery view 1",
        },
{
          src: "/images/portfolio/037.webp",
          alt: "Warm Apartment gallery view 2",
        },
{
          src: "/images/portfolio/038.webp",
          alt: "Warm Apartment gallery view 3",
        },
{
          src: "/images/portfolio/039.webp",
          alt: "Warm Apartment gallery view 4",
        },
      ],
      before: {
        src: "/images/portfolio/041.webp",
        alt: "Warm Apartment before stage",
      },
      after: {
        src: "/images/portfolio/042.webp",
        alt: "Warm Apartment after stage",
      },
      final: {
        src: "/images/portfolio/014.webp",
        alt: "Warm Apartment final view",
      },
    },
    "material-house": {
      cover: {
        src: "/images/selected-work/s5.webp",
        alt: "Material House — project cover",
      },
      gallery: [
{
          src: "/images/portfolio/085.webp",
          alt: "Material House gallery view 1",
        },
{
          src: "/images/portfolio/043.webp",
          alt: "Material House gallery view 2",
        },
{
          src: "/images/portfolio/044.webp",
          alt: "Material House gallery view 3",
        },
{
          src: "/images/portfolio/047.webp",
          alt: "Material House gallery view 4",
        },
      ],
      before: {
        src: "/images/portfolio/048.webp",
        alt: "Material House before stage",
      },
      after: {
        src: "/images/portfolio/049.webp",
        alt: "Material House after stage",
      },
      final: {
        src: "/images/portfolio/051.webp",
        alt: "Material House final view",
      },
    },
    "light-kitchen": {
      cover: {
        src: "/images/portfolio/206.webp",
        alt: "Light Kitchen — project cover",
      },
      gallery: [
{
          src: "/images/portfolio/025.webp",
          alt: "Light Kitchen gallery view 1",
        },
{
          src: "/images/portfolio/052.webp",
          alt: "Light Kitchen gallery view 2",
        },
{
          src: "/images/portfolio/053.webp",
          alt: "Light Kitchen gallery view 3",
        },
{
          src: "/images/portfolio/054.webp",
          alt: "Light Kitchen gallery view 4",
        },
      ],
      before: {
        src: "/images/portfolio/056.webp",
        alt: "Light Kitchen before stage",
      },
      after: {
        src: "/images/portfolio/057.webp",
        alt: "Light Kitchen after stage",
      },
      final: {
        src: "/images/portfolio/058.webp",
        alt: "Light Kitchen final view",
      },
    },
    "quiet-bedroom": {
      cover: {
        src: "/images/portfolio/203.webp",
        alt: "Quiet Bedroom — project cover",
      },
      gallery: [
{
          src: "/images/portfolio/012.webp",
          alt: "Quiet Bedroom gallery view 1",
        },
{
          src: "/images/portfolio/020.webp",
          alt: "Quiet Bedroom gallery view 2",
        },
{
          src: "/images/portfolio/060.webp",
          alt: "Quiet Bedroom gallery view 3",
        },
{
          src: "/images/portfolio/061.webp",
          alt: "Quiet Bedroom gallery view 4",
        },
      ],
      before: {
        src: "/images/portfolio/062.webp",
        alt: "Quiet Bedroom before stage",
      },
      after: {
        src: "/images/portfolio/063.webp",
        alt: "Quiet Bedroom after stage",
      },
      final: {
        src: "/images/portfolio/064.webp",
        alt: "Quiet Bedroom final view",
      },
    },
    "atelier-office": {
      cover: {
        src: "/images/portfolio/209.webp",
        alt: "Atelier Office — project cover",
      },
      gallery: [
{
          src: "/images/portfolio/040.webp",
          alt: "Atelier Office gallery view 1",
        },
{
          src: "/images/portfolio/068.webp",
          alt: "Atelier Office gallery view 2",
        },
{
          src: "/images/portfolio/069.webp",
          alt: "Atelier Office gallery view 3",
        },
{
          src: "/images/portfolio/071.webp",
          alt: "Atelier Office gallery view 4",
        },
      ],
      before: {
        src: "/images/portfolio/072.webp",
        alt: "Atelier Office before stage",
      },
      after: {
        src: "/images/portfolio/073.webp",
        alt: "Atelier Office after stage",
      },
      final: {
        src: "/images/portfolio/074.webp",
        alt: "Atelier Office final view",
      },
    },
    "stone-bath": {
      cover: {
        src: "/images/portfolio/090.webp",
        alt: "Stone Bath — project cover",
      },
      gallery: [
{
          src: "/images/portfolio/076.webp",
          alt: "Stone Bath gallery view 1",
        },
{
          src: "/images/portfolio/077.webp",
          alt: "Stone Bath gallery view 2",
        },
{
          src: "/images/portfolio/078.webp",
          alt: "Stone Bath gallery view 3",
        },
{
          src: "/images/portfolio/079.webp",
          alt: "Stone Bath gallery view 4",
        },
      ],
      before: {
        src: "/images/portfolio/080.webp",
        alt: "Stone Bath before stage",
      },
      after: {
        src: "/images/portfolio/081.webp",
        alt: "Stone Bath after stage",
      },
      final: {
        src: "/images/portfolio/082.webp",
        alt: "Stone Bath final view",
      },
    },
  },
} as const;

export type ImagesConfig = typeof images;
