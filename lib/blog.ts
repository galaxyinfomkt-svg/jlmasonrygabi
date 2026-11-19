/**
 * Blog posts. Added Nov/2026 — audit item 22: every stronger competitor in
 * the area publishes seasonal content and JL published none.
 *
 * Posts are written here instead of pulled from a CMS so they ship with the
 * build and need no extra service. Keep `summary` under 155 characters: it is
 * the meta description. The three starter posts are the seasonal ones from
 * the audit's editorial list (Nov–Dec cluster).
 *
 * Author is the owner on purpose: the audit found zero named people on the
 * site, which is what costs the company in AI answers and in trust.
 */

export type BlogSection = {
  heading: string;
  /** Paragraphs. */
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Used as meta description and in the index card. ≤ 155 chars. */
  summary: string;
  /** ISO date. */
  date: string;
  updated?: string;
  readingMinutes: number;
  cluster: "Chimneys" | "Patios" | "Stonework" | "Hiring";
  image: string;
  imageAlt: string;
  intro: string[];
  sections: BlogSection[];
  faqs: Array<{ q: string; a: string }>;
  /** Service slug this post should send readers to. */
  relatedService: string;
  relatedServiceLabel: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "freeze-thaw-chimney-mortar-when-to-repoint",
    title:
      "How New England Freeze-Thaw Destroys Chimney Mortar (and When to Repoint)",
    summary:
      "Why Massachusetts winters open chimney joints, the signs to look for from the ground, and the point where repointing stops being enough.",
    date: "2026-11-19",
    readingMinutes: 6,
    cluster: "Chimneys",
    image: "/assets/gallery/g-14.jpg",
    imageAlt:
      "Tall stacked-stone chimney with tight, tooled mortar joints on a Massachusetts home",
    relatedService: "brick-repointing",
    relatedServiceLabel: "Brick repointing & tuckpointing",
    intro: [
      "Every chimney we take apart in Massachusetts fails the same way. Not from wind, not from age on its own, and almost never from the fire inside it. It fails because water got into the masonry and then froze.",
      "Understanding that one cycle tells you most of what you need to know about when your chimney needs attention — and how long you can safely put it off.",
    ],
    sections: [
      {
        heading: "What freeze-thaw actually does to a chimney",
        body: [
          "Water expands roughly 9% when it freezes. When that happens inside a mortar joint, inside a crack in the crown, or inside the pores of a brick, it pushes outward with far more force than the mortar can resist.",
          "The thaw is the other half of the problem. The ice melts, the joint is now slightly wider than it was, and the next rain puts more water in than before. Greater Boston runs through dozens of freeze-thaw cycles between November and March, and a chimney standing above the roofline gets wind-driven rain from every direction with no overhang protecting it.",
          "That is why chimneys fail years before the walls of the same house do. They are the most exposed masonry on the building and usually the least inspected.",
        ],
      },
      {
        heading: "The signs you can see from the ground",
        body: [
          "You do not need to be on a roof to know a chimney is in trouble. Stand back on the lawn with a pair of binoculars or the zoom on your phone and look for:",
        ],
        list: [
          "Joints that look recessed or shadowed compared to the rest of the stack — mortar washing out leaves the brick standing proud",
          "Missing chunks of mortar, or gaps you can see daylight-colored sky through at the corners",
          "Brick faces that look flaky, pitted or like a thin layer has popped off (spalling) — that is water that froze inside the brick itself",
          "White chalky staining running down the stack (efflorescence): salts carried out of the masonry by water moving through it",
          "A crown at the top that is cracked, or that is just a smear of mortar instead of a cast slab with an overhang",
          "A stack that looks like it leans, bows, or has a visible kink partway up",
        ],
      },
      {
        heading: "The signs you will only see inside",
        body: [
          "Just as often, the first evidence shows up indoors, and people blame the roof for it:",
        ],
        list: [
          "Water staining on the ceiling or wall near where the chimney passes through",
          "Damp, musty smell in a fireplace that has not been used",
          "Rust on a damper or on the firebox",
          "Peeling paint or crumbling plaster on the chimney breast in an upstairs room",
        ],
      },
      {
        heading: "Repoint, or rebuild?",
        body: [
          "This is the question that decides the cost, and the honest answer depends on what has failed.",
          "If the brick or stone itself is sound and only the joints have washed out, repointing is the right repair. We cut the failed mortar out to at least twice the joint width, clean the joint, pack it with mortar matched to the original, and tool it to the same profile. Done properly, that buys 25 to 50 years.",
          "Once the brick itself is spalling across large areas, or the stack leans, bows or has open vertical cracks, repointing only hides the problem. Fresh mortar in a wall that is already moving will crack again within a season or two. At that point the affected section — usually everything above the roofline — has to come down and go back up.",
          "There is a third case worth knowing about: a chimney that was repointed at some point with hard Portland-based mortar on soft old brick. Portland mortar is stronger than pre-1930 brick, so when the wall moves, the brick face breaks instead of the joint. Those chimneys often need brick replacement along with the repointing, and a softer, lime-based mix going back in.",
        ],
      },
      {
        heading: "Fix the water first",
        body: [
          "The mistake we see most often is repointing a chimney while the thing that let the water in is still there. Before any joint work, the crown, the cap and the flashing have to be right.",
          "The crown is the sloped slab at the very top. It should be cast concrete with an overhang and a drip edge that throws water clear of the brick — not a thin skim of mortar troweled flat, which cracks in the first winter. A cap over the flue keeps rain out of the chimney interior.",
          "The flashing is where the chimney meets the roof. Step flashing and counter-flashing, properly let into a joint and sealed, is what keeps that junction dry. A bead of caulk over an old failed flashing is a one-season fix, and it is where a large share of 'my chimney leaks' calls actually start.",
        ],
      },
      {
        heading: "Why timing matters more than people expect",
        body: [
          "Mortar needs temperatures above roughly 40°F to cure properly, and it needs to stay there while it sets. That is why serious chimney work in Massachusetts runs from April into late fall and then stops.",
          "Practically, that means a chimney with open joints in December is taking on water for four or five months before anyone can fix it. A joint you could have repointed in the fall can easily be a rebuild by the time the ground thaws. If you are seeing the signs above now, getting on a schedule early in the season is worth more than it sounds.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often does a chimney need repointing?",
        a: "Quality mortar lasts 25 to 50 years, but exposure decides it. A chimney on the weather side of the house with no cap can need work in 15 years; a sheltered one with a good crown can go much longer. Look at the joints, not the calendar.",
      },
      {
        q: "Can chimney repointing be done in winter?",
        a: "Generally no. Mortar needs to stay above about 40°F while it cures. Small emergency repairs are sometimes possible, but full repointing and rebuilds wait for spring — which is why fall inspections matter.",
      },
      {
        q: "How much does chimney repointing cost in Massachusetts?",
        a: "Most chimney repointing runs $1,500–$5,000 depending on height, roof pitch, access and how much of the stack has failed. A rebuild above the roofline costs more. We price it after an on-site inspection, in writing.",
      },
      {
        q: "Is a cracked chimney crown urgent?",
        a: "It is the single most common entry point for water. A cracked crown lets rain straight into the core of the chimney, where it freezes. Recasting a crown is a small job compared to the rebuild it prevents.",
      },
    ],
  },
  {
    slug: "ice-melt-salt-damage-pavers-bluestone-steps",
    title: "Salt, Ice Melt and Your Stonework: What's Safe for Pavers and Bluestone",
    summary:
      "Rock salt quietly destroys concrete, mortar and some stone. What to use instead on patios, walkways and steps through a Massachusetts winter.",
    date: "2026-11-19",
    readingMinutes: 5,
    cluster: "Stonework",
    image: "/assets/about.jpg",
    imageAlt:
      "Granite steps and landing beside a fieldstone wall with granite caps, built by JL Masonry in Massachusetts",
    relatedService: "steps",
    relatedServiceLabel: "Granite & stone steps",
    intro: [
      "Every spring we get called to look at steps and walkways that were fine in October and are crumbling in April. Most of the time the owner did nothing wrong except buy the cheapest bag at the hardware store.",
      "Here is what de-icers actually do to masonry, and what to put down instead.",
    ],
    sections: [
      {
        heading: "Why rock salt is hard on masonry",
        body: [
          "Rock salt — sodium chloride — does two things to stonework, and neither is about the salt being corrosive in the way people imagine.",
          "First, it drives more freeze-thaw cycles. Salt lowers the freezing point, so instead of your steps freezing once in November and staying frozen, the surface melts and refreezes over and over through the winter. Every one of those cycles is another chance for water in a pore or a joint to expand.",
          "Second, salt crystals grow inside the pores of concrete and some stone as the solution dries. That growth pushes from the inside, which is what makes a concrete step surface flake away in sheets. Masons call it scaling, and once it starts you cannot reverse it — you can only resurface or replace.",
        ],
      },
      {
        heading: "What is at risk, in order",
        body: [
          "Not all masonry reacts the same way. Roughly from most vulnerable to least:",
        ],
        list: [
          "Concrete poured within the last year — new concrete has not finished curing and scales very easily. Keep all de-icer off it for the first full winter",
          "Mortar joints on brick stoops, steps and walls — mortar is softer than the units around it and goes first",
          "Precast concrete steps and pavers — surfaces pit and lose their colored top layer",
          "Bluestone — natural stone, but porous enough to spall at the edges with heavy salt use",
          "Granite — the most resistant of the common materials here, which is a large part of why we recommend it for steps",
        ],
      },
      {
        heading: "What to use instead",
        body: [
          "There is no de-icer that is completely harmless, but there are clear tiers:",
        ],
        list: [
          "Sand or stone grit: no melting at all, pure traction, zero chemical damage. The best choice on anything new or already damaged. Sweep it up in spring so it does not wash into joints",
          "Calcium magnesium acetate (CMA): the gentlest common de-icer on concrete and mortar. Costs more and works more slowly in deep cold",
          "Magnesium chloride: works at lower temperatures than rock salt and is easier on masonry, though not harmless",
          "Calcium chloride: effective, but hard on concrete at high concentrations. Use sparingly",
          "Rock salt (sodium chloride) and anything with ammonium sulfate or ammonium nitrate: avoid on masonry. The ammonium compounds attack concrete directly",
        ],
      },
      {
        heading: "Habits that matter more than the product",
        body: [
          "How you use the de-icer matters as much as which one you buy.",
        ],
        list: [
          "Shovel first, then treat. De-icer is for the thin layer left behind, not for melting six inches of snow",
          "Spread it thin. More product does not melt faster; it just leaves more salt sitting in the stone",
          "Clear the slush once it melts. Leaving salty water to refreeze on the surface is the worst case",
          "Keep de-icer off brand-new work for its first winter, with no exceptions",
          "Watch where the runoff goes. Salty melt that drains into a planting bed or against a foundation wall causes its own problems",
        ],
      },
      {
        heading: "If the damage is already done",
        body: [
          "Scaled concrete steps and crumbled mortar joints do not heal. But what you do next depends on how deep it goes.",
          "Surface scaling on concrete can sometimes be resurfaced, though in our experience it comes back within a few years if the slab underneath is saturated and the base is poor. Washed-out joints on a brick or stone stoop are a straightforward repointing job, and worth doing before water reaches the structure underneath.",
          "When steps have moved — when a riser is now a different height from the others, or the whole unit has pulled away from the house — the problem is no longer the surface. That is the base, and that is a rebuild. If you are at that point, granite with a proper frost-depth footing is the version that stops the cycle for good.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is ice melt safe on pavers?",
        a: "Most paver manufacturers allow calcium magnesium acetate or magnesium chloride and warn against rock salt and anything containing ammonium. Sand is always safe. Never use de-icer on pavers installed within the last year.",
      },
      {
        q: "Will salt damage bluestone?",
        a: "Bluestone handles salt better than concrete but is porous enough to spall at the edges with heavy repeated use. Sand is the safer choice on bluestone treads and walkways.",
      },
      {
        q: "What is the best de-icer for concrete steps?",
        a: "Calcium magnesium acetate (CMA) is the gentlest effective option. On concrete poured within the past year, use sand only — no de-icer at all until it has been through a full curing season.",
      },
      {
        q: "Can scaled concrete steps be repaired?",
        a: "Surface resurfacing is possible, but if the base has moved or the risers are now uneven, resurfacing just hides it. At that point rebuilding on a proper footing — ideally in granite — is the repair that lasts.",
      },
    ],
  },
  {
    slug: "book-spring-patio-project-in-winter-massachusetts",
    title: "When to Book Your Spring Patio in Greater Boston (Hint: It's Winter)",
    summary:
      "Masonry schedules in Eastern MA fill before the ground thaws. Why planning a patio in January gets you a better build and a better price.",
    date: "2026-11-19",
    readingMinutes: 5,
    cluster: "Patios",
    image: "/assets/gallery/g-21.jpg",
    imageAlt:
      "Multi-tone paver patio with a charcoal soldier-course border in a fenced backyard",
    relatedService: "patios",
    relatedServiceLabel: "Patio installation",
    intro: [
      "The call we get most often is in late May: someone wants a patio finished before a graduation party in June. By then every good crew in the area is booked into August.",
      "The homeowners who get their patio when they want it, built the way they want it, are the ones who start the conversation in January and February. Here is why that is not just a scheduling trick.",
    ],
    sections: [
      {
        heading: "The season is shorter than people think",
        body: [
          "Masonry in Eastern Massachusetts has a real working window. Base work can start once the frost is out of the ground, usually late March or April depending on the year. Mortared work needs sustained temperatures above about 40°F. The season effectively closes in late November.",
          "That is roughly eight months of build time for twelve months of demand, and most of the demand arrives in a four-week window in spring. The math does not work out in favor of the person who calls in May.",
        ],
      },
      {
        heading: "What you actually gain by planning in winter",
        body: [
          "Booking early is not about rushing the decision. It is about having time to make it:",
        ],
        list: [
          "A real design conversation instead of a rushed one. Layout, sight lines, where the sun actually hits the yard in the afternoon, whether a seating wall or a fire feature belongs in the plan",
          "Time to see materials in person. Paver and stone colors look nothing in a brochure like they do against your house",
          "Permit lead time. Retaining walls over four feet, work near wetlands and conservation review all take weeks, and towns are slower in spring",
          "Your choice of start date rather than whatever is left",
          "Time to get more than one quote and compare them line by line instead of signing under deadline pressure",
        ],
      },
      {
        heading: "What we can do before the ground opens up",
        body: [
          "A winter site visit tells us most of what we need. We can walk the yard, measure, look at the grade and how water currently moves across it, check access for equipment, and talk through what you want to use the space for.",
          "From that we produce the itemized quote — materials, base prep, dimensions, timeline. Nothing about that process needs the ground to be soft. When April comes, the work starts instead of starting to be planned.",
        ],
      },
      {
        heading: "The part nobody thinks about: drainage",
        body: [
          "There is one genuine advantage to looking at a yard in late winter that you cannot get in July. You can see where water goes.",
          "Snowmelt and early spring rain show you exactly which part of the yard holds water, where runoff crosses, and whether the grade sends water toward the house. That information changes how we build: base depth, pitch, whether a drain line or a dry well belongs under the patio.",
          "A patio built without that knowledge is the one that heaves in its third winter. Walking the site when the ground is telling you the truth is worth more than any upgrade you can buy later.",
        ],
      },
      {
        heading: "What a well-built patio costs here",
        body: [
          "Most paver and stone patios we build run about $45 to $85 per square foot installed, including base and materials. The spread comes from stone choice, access for equipment, how much excavation the grade requires, and whether drainage work is needed.",
          "The cheap quotes in this market are almost always cheap in the same place: base depth. A patio set on three inches of unscreened fill looks identical to one on six inches of compacted crushed stone — for about two winters. When you compare quotes, compare the excavation and base lines first.",
        ],
      },
    ],
    faqs: [
      {
        q: "When should I book a patio for spring in Massachusetts?",
        a: "January through March. Crews schedule the spring season over the winter, and permits for walls or work near wetlands take weeks. By May most reputable crews are booked months out.",
      },
      {
        q: "Can masonry work be done in the winter in Massachusetts?",
        a: "Base excavation can continue until the ground freezes, but mortared work needs sustained temperatures above about 40°F. The practical build season runs from April into late November.",
      },
      {
        q: "How much does a paver patio cost in the Woburn area?",
        a: "Typically $45–$85 per square foot installed, base and materials included. Size, stone choice, site access, excavation and drainage drive where a project lands in that range.",
      },
      {
        q: "How long does a patio take to build?",
        a: "Most 300–600 square foot patios take 5 to 10 working days, weather permitting. You get a start date and a timeline in the written quote before anything begins.",
      },
    ],
  },
];

export const blogPostBySlug = new Map(blogPosts.map((p) => [p.slug, p]));

/** Newest first, which is the order the index renders. */
export const blogPostsByDate = [...blogPosts].sort((a, b) =>
  b.date.localeCompare(a.date)
);
