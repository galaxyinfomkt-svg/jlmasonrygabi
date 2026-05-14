// Photo mapping per service — hero image + gallery (3–5 photos per service).
// Used by /services/[service] and /[city]/[service] pages.

export type ServicePhotos = {
  hero: { src: string; alt: string };
  gallery: Array<{ src: string; alt: string; caption?: string }>;
};

export const servicePhotos: Record<string, ServicePhotos> = {
  patios: {
    hero: {
      src: "/assets/gallery/patios.jpg",
      alt: "Custom stone patio installation by JL Masonry in Massachusetts",
    },
    gallery: [
      { src: "/assets/gallery/g-14.jpg", alt: "Custom flagstone patio with integrated fire pit in Winchester, MA", caption: "Fieldstone patio with fire pit" },
      { src: "/assets/gallery/g-19.jpg", alt: "Outdoor stone fireplace and patio in Burlington, MA", caption: "Stone fireplace patio" },
      { src: "/assets/gallery/g-18.jpg", alt: "Paver patio with stone border installation", caption: "Paver patio with stone border" },
      { src: "/assets/gallery/patios.jpg", alt: "Bluestone patio installation", caption: "Bluestone patio detail" },
    ],
  },
  "stone-walls": {
    hero: {
      src: "/assets/gallery/stone-walls.jpg",
      alt: "Hand-laid stone wall by JL Masonry, Middlesex County MA",
    },
    gallery: [
      { src: "/assets/gallery/g-16.jpg", alt: "Hand-laid fieldstone retaining wall in Lexington, MA", caption: "Hand-laid fieldstone wall" },
      { src: "/assets/gallery/g-22.jpg", alt: "Mortared stone wall in Belmont, MA", caption: "Mortared stone wall" },
      { src: "/assets/gallery/about-1.jpg", alt: "Mason laying stone by hand", caption: "Hand-selected face stones" },
      { src: "/assets/gallery/g-21.jpg", alt: "Terraced garden stone wall in Medford, MA", caption: "Terraced garden walls" },
    ],
  },
  walkways: {
    hero: {
      src: "/assets/gallery/walkways.jpg",
      alt: "Stone walkway installation by JL Masonry in Massachusetts",
    },
    gallery: [
      { src: "/assets/gallery/g-15.jpg", alt: "Bluestone walkway leading to a Colonial home in Woburn, MA", caption: "Bluestone front walk" },
      { src: "/assets/gallery/g-20.jpg", alt: "Bluestone stoop with brick risers in Stoneham, MA", caption: "Bluestone stoop & steps" },
      { src: "/assets/gallery/walkways.jpg", alt: "Custom walkway detail with cobble border", caption: "Cobble-edged walkway" },
      { src: "/assets/gallery/g-22.jpg", alt: "Side-entry walkway with mortared joints", caption: "Mortared paver walkway" },
    ],
  },
  chimneys: {
    hero: {
      src: "/assets/gallery/chimneys.jpg",
      alt: "Brick chimney rebuild by JL Masonry in Massachusetts",
    },
    gallery: [
      { src: "/assets/gallery/g-17.jpg", alt: "Brick chimney rebuild with new copper flashing in Arlington, MA", caption: "Full chimney rebuild with copper flashing" },
      { src: "/assets/gallery/chimneys.jpg", alt: "Repointed brick chimney with new crown", caption: "Repointing & crown replacement" },
      { src: "/assets/gallery/g-22.jpg", alt: "Detail of fresh mortar joints on chimney", caption: "Fresh tuckpointing detail" },
    ],
  },
  "retaining-walls": {
    hero: {
      src: "/assets/gallery/retaining-walls.jpg",
      alt: "Engineered retaining wall by JL Masonry in Middlesex County MA",
    },
    gallery: [
      { src: "/assets/gallery/g-16.jpg", alt: "Fieldstone retaining wall holding a slope in Lexington, MA", caption: "Fieldstone retaining wall" },
      { src: "/assets/gallery/g-21.jpg", alt: "Terraced garden wall with integrated steps in Medford, MA", caption: "Terraced wall with steps" },
      { src: "/assets/gallery/about-2.jpg", alt: "Completed segmental block retaining wall", caption: "Segmental block wall" },
      { src: "/assets/gallery/retaining-walls.jpg", alt: "Engineered retaining wall hero shot", caption: "Engineered retaining wall" },
    ],
  },
  sidewalks: {
    hero: {
      src: "/assets/gallery/sidewalks.jpg",
      alt: "Concrete and paver sidewalk installation by JL Masonry in Massachusetts",
    },
    gallery: [
      { src: "/assets/gallery/sidewalks.jpg", alt: "Brushed concrete sidewalk along residential frontage", caption: "Brushed concrete sidewalk" },
      { src: "/assets/gallery/g-22.jpg", alt: "Paver sidewalk with stone curb in Belmont, MA", caption: "Paver sidewalk with curb" },
      { src: "/assets/gallery/walkways.jpg", alt: "ADA-compliant sidewalk transition", caption: "ADA transition" },
    ],
  },
  "residential-masonry": {
    hero: {
      src: "/assets/gallery/residential.jpg",
      alt: "Residential masonry project by JL Masonry in Middlesex County MA",
    },
    gallery: [
      { src: "/assets/gallery/g-14.jpg", alt: "Custom residential patio and outdoor living area", caption: "Outdoor living area" },
      { src: "/assets/gallery/g-19.jpg", alt: "Residential stone fireplace and hearth", caption: "Outdoor stone fireplace" },
      { src: "/assets/gallery/g-20.jpg", alt: "Front entry steps with bluestone treads", caption: "Front entry stonework" },
      { src: "/assets/gallery/residential.jpg", alt: "Residential masonry detail", caption: "Whole-home masonry" },
    ],
  },
  "commercial-masonry": {
    hero: {
      src: "/assets/gallery/commercial.jpg",
      alt: "Commercial masonry project by JL Masonry in Massachusetts",
    },
    gallery: [
      { src: "/assets/gallery/commercial.jpg", alt: "Commercial storefront masonry detail", caption: "Storefront masonry" },
      { src: "/assets/gallery/g-22.jpg", alt: "Commercial sidewalk and entry stonework", caption: "Commercial walkway" },
      { src: "/assets/gallery/g-15.jpg", alt: "Multi-family entry masonry", caption: "Multi-family entry" },
    ],
  },
  "custom-projects": {
    hero: {
      src: "/assets/gallery/custom.jpg",
      alt: "Custom masonry project by JL Masonry in Massachusetts",
    },
    gallery: [
      { src: "/assets/gallery/g-19.jpg", alt: "Custom outdoor stone fireplace", caption: "Custom outdoor fireplace" },
      { src: "/assets/gallery/g-14.jpg", alt: "Custom fire pit with surrounding patio", caption: "Custom fire pit & patio" },
      { src: "/assets/gallery/custom.jpg", alt: "Custom designed masonry feature", caption: "Custom design build" },
      { src: "/assets/gallery/g-21.jpg", alt: "Custom terraced garden with integrated lighting", caption: "Custom terrace with lighting" },
    ],
  },
  hardscape: {
    hero: {
      src: "/assets/gallery/hardscape.jpg",
      alt: "Full property hardscape by JL Masonry in Massachusetts",
    },
    gallery: [
      { src: "/assets/gallery/g-18.jpg", alt: "Paver driveway with stone border", caption: "Paver driveway" },
      { src: "/assets/gallery/g-15.jpg", alt: "Coordinated walkway and patio hardscape", caption: "Coordinated walks & patio" },
      { src: "/assets/gallery/g-21.jpg", alt: "Terraced hardscape with retaining walls", caption: "Terraced hardscape" },
      { src: "/assets/gallery/hardscape.jpg", alt: "Full property hardscape master plan", caption: "Full property package" },
    ],
  },
};

export function getServicePhotos(slug: string): ServicePhotos {
  return (
    servicePhotos[slug] || {
      hero: { src: "/assets/hero.jpg", alt: "JL Masonry project" },
      gallery: [],
    }
  );
}
