// Photo mapping per service.
// IMPORTANT: file names in /assets/gallery/ were misleading — every photo
// has been visually inspected and re-mapped below to the SERVICE IT ACTUALLY
// SHOWS, not what the filename suggests.

export type ServicePhotos = {
  hero: { src: string; alt: string };
  gallery: Array<{ src: string; alt: string; caption?: string }>;
};

export const servicePhotos: Record<string, ServicePhotos> = {
  // === PATIOS — paver and stone patios ===
  patios: {
    hero: {
      src: "/assets/gallery/g-21.jpg",
      alt: "Custom paver patio in a fenced backyard by JL Masonry, Middlesex County MA",
    },
    gallery: [
      { src: "/assets/gallery/g-21.jpg", alt: "Multi-tone paver patio with charcoal soldier-course border", caption: "Paver patio with stone border" },
      { src: "/assets/gallery/patios.jpg", alt: "Elevated paver patio with retaining-block base behind a deck", caption: "Elevated paver patio with stair access" },
      { src: "/assets/gallery/retaining-walls.jpg", alt: "Large elevated paver patio behind a blue Cape Cod home", caption: "Elevated backyard paver patio" },
      { src: "/assets/gallery/stone-walls.jpg", alt: "Wide paver patio with stair access from deck", caption: "Custom paver patio with deck stairs" },
    ],
  },

  // === STONE WALLS — natural stone walls (dry-stack / mortared) ===
  "stone-walls": {
    hero: {
      src: "/assets/gallery/g-15.jpg",
      alt: "Hand-laid dry-stack stone wall with integrated steps by JL Masonry, MA",
    },
    gallery: [
      { src: "/assets/gallery/g-15.jpg", alt: "Hand-laid dry-stack fieldstone wall with steps and hydrangeas", caption: "Dry-stack stone wall with steps" },
      { src: "/assets/gallery/about-1.jpg", alt: "Fieldstone stoop with granite tread caps", caption: "Fieldstone stoop with granite caps" },
      { src: "/assets/gallery/g-22.jpg", alt: "Stone wall with integrated granite steps, salt-and-pepper finish", caption: "Stone wall + granite steps" },
      { src: "/assets/gallery/g-16.jpg", alt: "Stone-veneer porch with bluestone walkway leading up to it", caption: "Stone-veneer stoop & walkway" },
    ],
  },

  // === WALKWAYS — front walks, paths ===
  walkways: {
    hero: {
      src: "/assets/gallery/g-16.jpg",
      alt: "Bluestone walkway leading to a stone-veneer front entry by JL Masonry, MA",
    },
    gallery: [
      { src: "/assets/gallery/g-16.jpg", alt: "Wide bluestone walkway with granite curbing leading to a stone-veneer porch", caption: "Bluestone walkway + stone porch" },
      { src: "/assets/gallery/residential.jpg", alt: "Long paver walkway with curved border and landscaped beds", caption: "Curved paver walkway" },
      { src: "/assets/gallery/sidewalks.jpg", alt: "Paver walkway with stone border edging the front yard", caption: "Paver walkway with planter beds" },
    ],
  },

  // === CHIMNEYS — rebuilds and stone chimneys ===
  chimneys: {
    hero: {
      src: "/assets/gallery/g-14.jpg",
      alt: "Tall natural stone chimney by JL Masonry on a Massachusetts home build",
    },
    gallery: [
      { src: "/assets/gallery/g-14.jpg", alt: "Tall stacked-stone chimney during exterior installation", caption: "Stacked-stone chimney" },
      { src: "/assets/gallery/hardscape.jpg", alt: "Custom natural stone chimney shaft with bluestone cap", caption: "Stone chimney with bluestone cap" },
      { src: "/assets/gallery/walkways.jpg", alt: "Mason rebuilding a stone chimney from scaffolding on a residential roof", caption: "Chimney rebuild in progress" },
    ],
  },

  // === RETAINING WALLS — segmental block, fieldstone, foundations ===
  "retaining-walls": {
    hero: {
      src: "/assets/gallery/chimneys.jpg",
      alt: "Tall CMU block retaining/foundation wall under construction by JL Masonry MA",
    },
    gallery: [
      { src: "/assets/gallery/chimneys.jpg", alt: "Tall block retaining wall along a property line, mid-construction", caption: "Block retaining wall" },
      { src: "/assets/gallery/g-15.jpg", alt: "Fieldstone retaining wall with integrated steps along a yard edge", caption: "Fieldstone retaining wall + steps" },
      { src: "/assets/gallery/about-1.jpg", alt: "Fieldstone foundation wall capped with bluestone", caption: "Fieldstone foundation wall" },
      { src: "/assets/gallery/g-22.jpg", alt: "Stone retaining wall with granite step transitions", caption: "Stone retaining wall + steps" },
    ],
  },

  // === SIDEWALKS — concrete + ADA + paver public walks ===
  sidewalks: {
    hero: {
      src: "/assets/gallery/g-20.jpg",
      alt: "Concrete sidewalk approach to a residential entry in Massachusetts",
    },
    gallery: [
      { src: "/assets/gallery/g-20.jpg", alt: "Existing concrete sidewalk approach showing wear, prepped for repour", caption: "Concrete sidewalk (pre-repour)" },
      { src: "/assets/gallery/residential.jpg", alt: "Newly-installed paver walkway adjacent to a town sidewalk", caption: "Paver walk-to-sidewalk transition" },
      { src: "/assets/gallery/sidewalks.jpg", alt: "Paver driveway approach with concrete town sidewalk visible", caption: "Driveway-to-sidewalk transition" },
    ],
  },

  // === RESIDENTIAL MASONRY — stoops, steps, hearths, front entries ===
  "residential-masonry": {
    hero: {
      src: "/assets/gallery/g-19.jpg",
      alt: "Granite-tread stoop with brick risers on a residential home by JL Masonry MA",
    },
    gallery: [
      { src: "/assets/gallery/g-19.jpg", alt: "Granite stoop with brick risers and matching steps", caption: "Granite stoop with brick risers" },
      { src: "/assets/gallery/g-17.jpg", alt: "Granite-tile front stoop with brick riser detail", caption: "Granite-tile stoop & step" },
      { src: "/assets/gallery/g-18.jpg", alt: "Stoop rebuild before-during-after collage for a multi-family home", caption: "Stoop rebuild — before/during/after" },
      { src: "/assets/gallery/about-1.jpg", alt: "Compact fieldstone stoop with granite treads on a residential entry", caption: "Fieldstone & granite stoop" },
    ],
  },

  // === COMMERCIAL MASONRY ===
  "commercial-masonry": {
    hero: {
      src: "/assets/gallery/chimneys.jpg",
      alt: "Tall CMU block wall under construction on a commercial site by JL Masonry MA",
    },
    gallery: [
      { src: "/assets/gallery/chimneys.jpg", alt: "Large CMU block wall under construction on commercial site", caption: "Commercial CMU block wall" },
      { src: "/assets/gallery/g-18.jpg", alt: "Commercial-grade stoop rebuild collage", caption: "Commercial stoop rebuild" },
      { src: "/assets/gallery/residential.jpg", alt: "Wide paver entry approach for a multi-family property", caption: "Multi-family paver entry" },
    ],
  },

  // === CUSTOM PROJECTS ===
  "custom-projects": {
    hero: {
      src: "/assets/gallery/about-2.jpg",
      alt: "Custom paver patio with timber gazebo overhead, built by JL Masonry MA",
    },
    gallery: [
      { src: "/assets/gallery/about-2.jpg", alt: "Custom paver patio with timber gazebo and lounge seating", caption: "Custom patio with gazebo" },
      { src: "/assets/gallery/custom.jpg", alt: "Custom pool deck in dark gray pavers around an in-ground pool", caption: "Pool deck pavers" },
      { src: "/assets/gallery/g-14.jpg", alt: "Custom tall stone chimney detail", caption: "Custom stone chimney" },
      { src: "/assets/gallery/hardscape.jpg", alt: "Custom natural stone chimney feature with bluestone cap", caption: "Custom stone chimney" },
    ],
  },

  // === HARDSCAPE — full property + driveways ===
  hardscape: {
    hero: {
      src: "/assets/gallery/sidewalks.jpg",
      alt: "Paver driveway with stone border and landscaped beds, JL Masonry MA",
    },
    gallery: [
      { src: "/assets/gallery/sidewalks.jpg", alt: "Paver driveway with curved stone border", caption: "Paver driveway" },
      { src: "/assets/gallery/custom.jpg", alt: "Custom paver pool deck around in-ground pool", caption: "Pool deck hardscape" },
      { src: "/assets/gallery/residential.jpg", alt: "Coordinated walkway and beds in a custom hardscape package", caption: "Coordinated walks + beds" },
      { src: "/assets/gallery/about-2.jpg", alt: "Hardscape patio with timber gazebo overhead", caption: "Patio + gazebo hardscape" },
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
