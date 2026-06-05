# JL Masonry & Construction — Next.js Site

Production website for **JL Masonry & Construction** (Woburn, MA), deployed at
[jlmasonryma.com](https://jlmasonryma.com).

Stack: **Next.js 15.5 (App Router) · React 19 · TypeScript · Tailwind CSS v3.4 ·
framer-motion · Lucide icons**.

## Local development

```bash
cd site
npm install
npm run dev      # http://localhost:3000
```

A `.env.local` is required only for the `/mockup` AI feature — see
[`.env.local.example`](.env.local.example).

## Production build

```bash
npm run build    # builds ~1,200 static pages (109 cities × 10 services
                 # + service hubs + city hubs + home + locations + mockup)
npm run start
```

## Project layout

```
site/
├─ app/
│  ├─ layout.tsx              # Metadata, fonts (Playfair + Inter)
│  ├─ page.tsx                # Homepage composition
│  ├─ globals.css             # Tailwind + brand tokens + animations
│  ├─ sitemap.ts              # Generated /sitemap.xml
│  ├─ robots.ts               # Generated /robots.txt
│  ├─ icon.tsx                # Dynamic favicon
│  ├─ (routes)/               # Marketing pages outside the main tree
│  ├─ locations/page.tsx      # Service-area directory of 109 cities
│  ├─ services/
│  │  ├─ page.tsx             # All-services index
│  │  └─ [service]/page.tsx   # Per-service hub (10 services)
│  ├─ [city]/
│  │  ├─ page.tsx             # Per-city hub (109 cities)
│  │  └─ [service]/page.tsx   # City × service combo (~1,090 pages)
│  ├─ mockup/page.tsx         # AI Stone Visualizer (customer-facing)
│  └─ api/mockup/route.ts     # Cloudflare Workers AI proxy
├─ components/
│  ├─ Header.tsx              # Sticky nav + mobile drawer + Services dropdown
│  ├─ Hero.tsx                # Full-bleed hero, server-rendered LCP
│  ├─ Services.tsx            # 10 service cards, link to /services/<slug>
│  ├─ About.tsx               # Story + trust pillars
│  ├─ Gallery.tsx             # Editorial image grid (next/image)
│  ├─ Testimonials.tsx        # Quote cards (visual only — see note below)
│  ├─ FAQ.tsx                 # Accessible accordion
│  ├─ Contact.tsx             # LeadConnector iframe + info block
│  ├─ Footer.tsx              # Sitemap + socials + service areas
│  ├─ JsonLd.tsx              # Home LocalBusiness + FAQPage schema
│  ├─ CityServiceSchema.tsx   # Per-page LocalBusiness + Service + Breadcrumb + FAQ schema
│  ├─ LeadConnectorForm.tsx   # Robust iframe wrapper with fallback panel
│  ├─ QuoteFormSection.tsx    # Mid-page quote form section
│  ├─ QuoteModal.tsx          # Modal version of the quote form
│  ├─ PageBreadcrumb.tsx      # Visual breadcrumb (matches schema)
│  ├─ MockupStudio.tsx        # /mockup page dispatcher (prototype variants)
│  └─ mockup/                 # /mockup feature internals
│     ├─ useMockupStudio.ts   # State hook + stone catalog + API call
│     ├─ VariantA.tsx         # Two-column layout (default public)
│     ├─ VariantB.tsx         # Wizard
│     ├─ VariantC.tsx         # Split-studio
│     └─ PrototypeSwitcher.tsx # Floating switcher (only when ?variant=)
├─ lib/
│  ├─ site.ts                 # Brand info + 10 services + gallery + testimonials + FAQs
│  ├─ cities.ts               # 109 MA cities with local context for SEO copy
│  ├─ service-meta.ts         # Extended metadata for the 10 services
│  ├─ service-images.ts       # Per-service photo metadata
│  ├─ content-generator.ts    # Programmatic copy for city × service pages
│  └─ reviews.ts              # Verified GBP reviews (currently empty — see TODO)
└─ public/                    # Logos, gallery, hero, service photos
```

## Brand tokens

Defined in [`tailwind.config.js`](tailwind.config.js) under `theme.extend.colors.brand`:

| Token              | Value     | Usage                         |
|--------------------|-----------|-------------------------------|
| `brand-dark`       | `#0F0F0F` | Primary background            |
| `brand-stone`      | `#1a1a1a` | Alternate section background  |
| `brand-stone-2`    | `#262626` | Sub-surface                   |
| `brand-light`      | `#FAFAF7` | Body text on dark             |
| `brand-gray`       | `#4A4A4A` | Secondary text, borders       |
| `brand-red`        | `#C13A35` | Primary accent / CTAs         |
| `brand-red-light`  | `#DC4640` | Hover state                   |
| `brand-red-deep`   | `#8B2724` | Active / pressed              |
| `brand-gold`       | `#C13A35` | Legacy alias mapped to red    |

Fonts: **Playfair Display** (display, variable serif) + **Inter** (body, sans).
Both loaded via `next/font/google` with subset narrowing for bundle size.

## SEO

- Full `Metadata` API on every route with OG + Twitter cards.
- `LocalBusiness` + `FAQPage` JSON-LD on the homepage (review schema is
  gated until verified GBP reviews are populated in `lib/reviews.ts`).
- Per-city `LocalBusiness` + `Service` + `Place` + `BreadcrumbList` JSON-LD
  via `CityServiceSchema.tsx`. `aggregateRating` is deliberately NOT
  replicated on city/city × service pages (lives only on the home).
- `sitemap.xml` auto-generated with 1,220 URLs at build.
- One `<h1>` per page, semantic landmarks, descriptive alt text.
- `next/image` for AVIF/WebP delivery with explicit `fetchPriority`.

## Editing content

- **Top-level site copy** (brand info, services, gallery, FAQs,
  testimonials, rating): [`lib/site.ts`](lib/site.ts).
- **Service technical detail** (problems, materials, cost ranges,
  inspection points, FAQs): [`lib/service-meta.ts`](lib/service-meta.ts).
- **City local context** (neighborhoods, architecture, soil,
  landmarks): [`lib/cities.ts`](lib/cities.ts).
- **City × service copy templates** (headlines, intros, why-local,
  process, closing pitch): [`lib/content-generator.ts`](lib/content-generator.ts).

A handful of entries in `lib/cities.ts` are tagged with
`// VERIFICAR(Jonildo)` for facts I could not confirm with confidence —
search the file for that marker before publishing significant edits.

## Reviews & ratings

Schema.org `Review` and `AggregateRating` only render when:

1. `lib/reviews.ts` has at least one entry pulled verbatim from the real
   Google Business Profile (author, ISO date, star rating, text), AND
2. `RATING_VERIFIED = true` in `components/JsonLd.tsx`.

Until then, the visual `<Testimonials />` component renders placeholder
quotes (clearly tagged `// TODO(Luiz)` in `lib/site.ts`) for layout
purposes but they are NOT wired into structured markup. Fabricated
reviews are grounds for a Google manual action and an FTC/UDAP exposure.

## Forms

The `<Contact />`, `<QuoteFormSection />`, and `<QuoteModal />` components
all mount the same LeadConnector form embed via
[`components/LeadConnectorForm.tsx`](components/LeadConnectorForm.tsx).
That wrapper:

- Defers the iframe until first interaction or 3.5 s idle (for LCP).
- Locks the wrapper at `min-height` so the iframe can't collapse to 0.
- Renders a phone + email fallback panel behind the iframe so the lead
  path stays open even when the embed is blocked.

The form ID is hard-coded in `LeadConnectorForm.tsx`.

## /mockup feature

`/mockup` is a customer-facing tool that lets homeowners upload a photo
of their house, select areas with rectangles, choose a stone, and get an
AI-generated before/after preview. The backend calls Cloudflare Workers
AI (SD 1.5 inpainting on the free tier).

Required env vars on the host:

```
CF_ACCOUNT_ID=<cloudflare account id>
CF_API_TOKEN=<cloudflare workers ai token with read scope>
```

See [`.env.local.example`](.env.local.example).

Three layout variants live under `components/mockup/Variant{A,B,C}.tsx`
and are switched via `?variant=A|B|C` URL param. A floating
`<PrototypeSwitcher />` shows only when the URL has `?variant=` so
production visitors hit `Variant A` clean.

## Deploy

Vercel-hosted at `jlmasonryma.com` (project `jlmasonrygabi`). The
project also has a preview project `jl-masonry` that mirrors the same
codebase for staging-style previews.

Manual deploy from a clean working tree:

```bash
npx vercel --prod
```

Env vars (`CF_ACCOUNT_ID`, `CF_API_TOKEN`) must be configured in the
Vercel project for `/mockup` to work in production.
