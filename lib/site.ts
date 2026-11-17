import {
  Building2,
  Construction,
  Cog,
  Footprints,
  Home,
  Layers,
  Mountain,
  Route,
  Sparkles,
  Wind,
} from "lucide-react";

export const site = {
  name: "JL Masonry & Construction",
  shortName: "JL Masonry",
  tagline: "Built to Last. Crafted with Pride.",
  phone: "(617) 913-9845",
  phoneHref: "tel:+16179139845",
  email: "contact@jlmasonryma.com",
  emailHref: "mailto:contact@jlmasonryma.com",
  address: {
    city: "Woburn",
    region: "MA",
    regionLong: "Massachusetts",
    country: "US",
    serviceArea: "Eastern Massachusetts",
    postalCode: "01801",
  },
  hours: "Mon–Sat: 7:00 AM – 5:00 PM | Sun: Closed",
  hoursStructured: [
    { days: "Monday – Friday", time: "7:00 AM – 5:00 PM" },
    { days: "Saturday", time: "7:00 AM – 5:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  website: "https://jlmasonryma.com",
  social: {
    facebook: "https://www.facebook.com/jl.masonry.construction",
    instagram: "https://www.instagram.com/jlmasonry_/",
    bbb: "https://www.bbb.org/us/ma/woburn/profile/mason-contractors/jl-masonry-construction-0021-551074",
  },
  /**
   * MA HIC registration number. Leave null until it is confirmed ACTIVE on
   * contractorhub.mass.gov — MA law requires the number on any advertising
   * that mentions it. When set, "MA HIC Reg. #…" shows in the hero badges,
   * the footer, the FAQ and the schema (hasCredential).
   *
   * Removed in Nov/2026 along with the "47+ Google reviews" rating, the GHL
   * reviews widget (it showed "0.00 · 0 reviews") and the placeholder
   * testimonials: the site must only show claims we can prove. Add real,
   * dated reviews to lib/reviews.ts once the Google profile is back.
   */
  hic: null as string | null,
} as const;

/** Hero/footer label for the HIC registration, or null while unconfirmed. */
export const hicLabel = site.hic ? `MA HIC Reg. #${site.hic}` : null;

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: typeof Home;
};

export const services: ServiceItem[] = [
  // Hero card images now match what each photo actually depicts.
  {
    slug: "patios",
    title: "Patios",
    description:
      "Custom stone and paver patios designed to enhance your outdoor living space.",
    image: "/assets/gallery/g-21.jpg", // paver patio in fenced backyard
    icon: Layers,
  },
  {
    slug: "stone-walls",
    title: "Stone Walls",
    description:
      "Elegant and durable stone walls for property lines, gardens, and retaining.",
    image: "/assets/gallery/g-15.jpg", // dry-stack stone wall with steps
    icon: Mountain,
  },
  {
    slug: "walkways",
    title: "Walkways",
    description:
      "Beautiful, safe walkways crafted from natural stone, brick, or pavers.",
    image: "/assets/gallery/g-16.jpg", // bluestone walkway to stone-veneer porch
    icon: Footprints,
  },
  {
    slug: "chimneys",
    title: "Chimneys",
    description:
      "Chimney construction, repair, and rebuilding done right the first time.",
    image: "/assets/gallery/g-14.jpg", // tall stone chimney
    icon: Wind,
  },
  {
    slug: "retaining-walls",
    title: "Retaining Walls",
    description:
      "Functional and attractive retaining walls to protect and define your landscape.",
    image: "/assets/gallery/chimneys.jpg", // tall CMU block wall
    icon: Construction,
  },
  {
    slug: "sidewalks",
    title: "Sidewalks",
    description:
      "Professional sidewalk installation and repair for homes and businesses.",
    image: "/assets/gallery/g-20.jpg", // concrete sidewalk approach
    icon: Route,
  },
  {
    slug: "residential-masonry",
    title: "Residential Masonry",
    description:
      "Enhance your home's beauty and value with expertly crafted masonry.",
    image: "/assets/gallery/g-19.jpg", // granite stoop with brick risers
    icon: Home,
  },
  {
    slug: "commercial-masonry",
    title: "Commercial Masonry",
    description:
      "Reliable masonry services for businesses and commercial properties.",
    image: "/assets/gallery/g-18.jpg", // commercial stoop rebuild collage
    icon: Building2,
  },
  {
    slug: "custom-projects",
    title: "Custom Projects",
    description:
      "Unique stonework and masonry designs that bring your vision to life.",
    image: "/assets/gallery/about-2.jpg", // custom patio with gazebo
    icon: Sparkles,
  },
  {
    slug: "hardscape",
    title: "Hardscape",
    description:
      "Complete hardscape solutions to transform your outdoor environment.",
    image: "/assets/gallery/sidewalks.jpg", // paver driveway with stone border
    icon: Cog,
  },
];

export type GalleryCategory = "All" | "Masonry" | "Patios" | "Hardscape" | "Projects";

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  category: Exclude<GalleryCategory, "All">;
};

// Local gallery — every entry's alt/title/category was visually verified
// against the actual photo content.
export const galleryImages: GalleryImage[] = [
  {
    src: "/assets/gallery/g-14.jpg",
    alt: "Tall stacked-stone chimney on a residential home in Middlesex County MA",
    title: "Stacked-Stone Chimney · Winchester",
    category: "Masonry",
  },
  {
    src: "/assets/gallery/g-15.jpg",
    alt: "Hand-laid dry-stack stone wall with integrated steps and hydrangeas",
    title: "Dry-Stack Stone Wall · Lexington",
    category: "Masonry",
  },
  {
    src: "/assets/gallery/g-16.jpg",
    alt: "Bluestone walkway leading to a stone-veneer porch entry",
    title: "Bluestone Walkway · Arlington",
    category: "Patios",
  },
  {
    src: "/assets/gallery/g-17.jpg",
    alt: "Granite-tile front stoop with brick risers",
    title: "Granite Stoop · Reading",
    category: "Masonry",
  },
  {
    src: "/assets/gallery/g-18.jpg",
    alt: "Multi-family stoop rebuild before-during-after photo collage",
    title: "Stoop Rebuild · Burlington",
    category: "Projects",
  },
  {
    src: "/assets/gallery/g-19.jpg",
    alt: "Granite stoop with brick risers and matching step on a residential entry",
    title: "Granite Stoop & Steps · Stoneham",
    category: "Masonry",
  },
  {
    src: "/assets/gallery/g-20.jpg",
    alt: "Concrete sidewalk approach with mature shrub borders",
    title: "Concrete Sidewalk · Medford",
    category: "Hardscape",
  },
  {
    src: "/assets/gallery/g-21.jpg",
    alt: "Multi-tone paver patio with charcoal soldier-course border in a fenced backyard",
    title: "Paver Patio with Border · Belmont",
    category: "Patios",
  },
  {
    src: "/assets/gallery/g-22.jpg",
    alt: "Stone wall with integrated granite steps in a salt-and-pepper finish",
    title: "Stone Wall + Granite Steps · Cambridge",
    category: "Masonry",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/QDJQl1odcMmCwTMFVIKK/media/68c83604703dead6e2d6a964.webp",
    alt: "Masonry project in Middlesex County, MA",
    title: "Custom Stone Build",
    category: "Projects",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/QDJQl1odcMmCwTMFVIKK/media/68c8360457da565202feec94.webp",
    alt: "Custom hardscape project in Massachusetts",
    title: "Premium Hardscape",
    category: "Hardscape",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/QDJQl1odcMmCwTMFVIKK/media/68c83604703dea4a49d6a965.webp",
    alt: "JL Masonry custom project",
    title: "Custom Masonry Project",
    category: "Projects",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/QDJQl1odcMmCwTMFVIKK/media/68c8360417537c1fa05a56a8.webp",
    alt: "Stone patio installation",
    title: "Stone Patio Build",
    category: "Patios",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/QDJQl1odcMmCwTMFVIKK/media/68c83605b855e64d62413e28.webp",
    alt: "Masonry walkway detail",
    title: "Detailed Walkway",
    category: "Patios",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/QDJQl1odcMmCwTMFVIKK/media/68c836044f724e4b13382d1b.webp",
    alt: "Outdoor stone feature",
    title: "Outdoor Stone Feature",
    category: "Hardscape",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/QDJQl1odcMmCwTMFVIKK/media/68c83604b376d95152f02911.webp",
    alt: "JL Masonry detail shot",
    title: "Craft Detail",
    category: "Masonry",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/QDJQl1odcMmCwTMFVIKK/media/68c8425634fadb51a584574a.webp",
    alt: "Completed masonry project",
    title: "Completed Build",
    category: "Projects",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/QDJQl1odcMmCwTMFVIKK/media/694b1a72147f516dc5e4c0ac.jpeg",
    alt: "Stonework signature finish",
    title: "Signature Finish",
    category: "Projects",
  },
];

export const galleryCategories: GalleryCategory[] = [
  "All",
  "Masonry",
  "Patios",
  "Hardscape",
  "Projects",
];

export const faqs = [
  {
    q: "What areas do you serve?",
    a: "Based in Woburn, we serve 109+ cities across Eastern Massachusetts — Greater Boston, MetroWest, the North Shore, the South Suburban area, and parts of Central MA (Middlesex, Worcester, Norfolk, Essex and surrounding counties).",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes! Free, no-obligation estimates for all masonry projects.",
  },
  ...(site.hic
    ? [
        {
          q: "Are you registered with the state?",
          a: `Yes — we're registered with the Massachusetts Home Improvement Contractor program, HIC #${site.hic}.`,
        },
      ]
    : []),
  {
    q: "How long does a typical project take?",
    a: "Standard patio: 3–5 days. Larger projects: 1–2 weeks. We provide a clear timeline upfront before we ever start work.",
  },
  {
    q: "What materials do you work with?",
    a: "Natural stone, brick, pavers, concrete, granite, and more.",
  },
];

export const aboutHighlights = [
  "Free, No-Obligation Estimates",
  "Itemized Written Quotes",
  "Trusted Local Experts in Woburn, MA",
  "Residential & Commercial Projects",
  "Quick & Easy Scheduling",
];
