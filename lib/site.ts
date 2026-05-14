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
  email: "info@jlmasonryma.com",
  emailHref: "mailto:info@jlmasonryma.com",
  address: {
    city: "Woburn",
    region: "MA",
    regionLong: "Massachusetts",
    country: "US",
    serviceArea: "Middlesex County, Massachusetts",
    street: "Woburn, MA 01801",
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
    review: "https://g.page/r/CYrB7gKa9WaQEBM/review",
  },
  rating: { value: "5.0", count: 47 },
  reviewsWidget:
    "https://backend.leadconnectorhq.com/appengine/reviews/get_widget/QDJQl1odcMmCwTMFVIKK",
} as const;

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: typeof Home;
};

export const services: ServiceItem[] = [
  {
    slug: "patios",
    title: "Patios",
    description:
      "Custom stone and paver patios designed to enhance your outdoor living space.",
    image: "/assets/gallery/patios.jpg",
    icon: Layers,
  },
  {
    slug: "stone-walls",
    title: "Stone Walls",
    description:
      "Elegant and durable stone walls for property lines, gardens, and retaining.",
    image: "/assets/gallery/stone-walls.jpg",
    icon: Mountain,
  },
  {
    slug: "walkways",
    title: "Walkways",
    description:
      "Beautiful, safe walkways crafted from natural stone, brick, or pavers.",
    image: "/assets/gallery/walkways.jpg",
    icon: Footprints,
  },
  {
    slug: "chimneys",
    title: "Chimneys",
    description:
      "Chimney construction, repair, and rebuilding done right the first time.",
    image: "/assets/gallery/chimneys.jpg",
    icon: Wind,
  },
  {
    slug: "retaining-walls",
    title: "Retaining Walls",
    description:
      "Functional and attractive retaining walls to protect and define your landscape.",
    image: "/assets/gallery/retaining-walls.jpg",
    icon: Construction,
  },
  {
    slug: "sidewalks",
    title: "Sidewalks",
    description:
      "Professional sidewalk installation and repair for homes and businesses.",
    image: "/assets/gallery/walkways.jpg",
    icon: Route,
  },
  {
    slug: "residential-masonry",
    title: "Residential Masonry",
    description:
      "Enhance your home's beauty and value with expertly crafted masonry.",
    image: "/assets/gallery/g-14.jpg",
    icon: Home,
  },
  {
    slug: "commercial-masonry",
    title: "Commercial Masonry",
    description:
      "Reliable masonry services for businesses and commercial properties.",
    image: "/assets/gallery/g-15.jpg",
    icon: Building2,
  },
  {
    slug: "custom-projects",
    title: "Custom Projects",
    description:
      "Unique stonework and masonry designs that bring your vision to life.",
    image: "/assets/gallery/g-19.jpg",
    icon: Sparkles,
  },
  {
    slug: "hardscape",
    title: "Hardscape",
    description:
      "Complete hardscape solutions to transform your outdoor environment.",
    image: "/assets/gallery/hardscape.jpg",
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

// Local gallery + CDN fallbacks per spec
export const galleryImages: GalleryImage[] = [
  {
    src: "/assets/gallery/g-14.jpg",
    alt: "Custom flagstone patio with fire pit in Middlesex County, MA",
    title: "Fieldstone Patio · Winchester",
    category: "Patios",
  },
  {
    src: "/assets/gallery/g-16.jpg",
    alt: "Hand-laid fieldstone retaining wall in Lexington, MA",
    title: "Fieldstone Retaining Wall · Lexington",
    category: "Masonry",
  },
  {
    src: "/assets/gallery/g-17.jpg",
    alt: "Chimney rebuild with copper flashing in Arlington, MA",
    title: "Chimney Rebuild · Arlington",
    category: "Masonry",
  },
  {
    src: "/assets/gallery/g-18.jpg",
    alt: "Paver driveway with stone border in Reading, MA",
    title: "Paver Driveway · Reading",
    category: "Hardscape",
  },
  {
    src: "/assets/gallery/g-19.jpg",
    alt: "Outdoor stone fireplace with hearth in Burlington, MA",
    title: "Stone Fireplace · Burlington",
    category: "Projects",
  },
  {
    src: "/assets/gallery/g-20.jpg",
    alt: "Bluestone front entry steps in Stoneham, MA",
    title: "Bluestone Stoop · Stoneham",
    category: "Masonry",
  },
  {
    src: "/assets/gallery/g-21.jpg",
    alt: "Terraced garden wall with integrated lighting in Medford, MA",
    title: "Terraced Garden Wall · Medford",
    category: "Hardscape",
  },
  {
    src: "/assets/gallery/g-22.jpg",
    alt: "Mortared stone wall in Belmont, MA",
    title: "Mortared Stone Wall · Belmont",
    category: "Masonry",
  },
  {
    src: "/assets/gallery/g-15.jpg",
    alt: "Bluestone walkway in Woburn, MA",
    title: "Bluestone Front Walk · Woburn",
    category: "Patios",
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

export const testimonials = [
  {
    quote:
      "JL Masonry transformed our backyard completely. The stone patio they built is absolutely stunning — professional crew, on time, and exceptional quality.",
    author: "Maria S.",
    location: "Woburn, MA",
    rating: 5,
  },
  {
    quote:
      "Hired them to repair our chimney and build a retaining wall. Excellent work, fair pricing, and great communication throughout.",
    author: "David R.",
    location: "Burlington, MA",
    rating: 5,
  },
  {
    quote:
      "Best masonry contractor in Middlesex County. Our walkway looks incredible. Highly recommend!",
    author: "Karen T.",
    location: "Winchester, MA",
    rating: 5,
  },
  {
    quote:
      "Their team rebuilt our front steps and stone wall. Quality of the masonry is honestly better than the original house. Crew showed up every day on time.",
    author: "Priya & Anand S.",
    location: "Arlington, MA",
    rating: 5,
  },
  {
    quote:
      "We hired JL for a commercial walkway repour. They treated it like their own storefront — on time, on budget, no callbacks needed.",
    author: "Tom B.",
    location: "Lexington, MA",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "What areas do you serve?",
    a: "Woburn, Burlington, Winchester, Lexington, Stoneham, and all of Middlesex County, MA.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes! Free, no-obligation estimates for all masonry projects.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Fully licensed and insured for your peace of mind.",
  },
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
  "Licensed & Insured",
  "Trusted Local Experts in Woburn, MA",
  "Residential & Commercial Projects",
  "Quick & Easy Scheduling",
];
