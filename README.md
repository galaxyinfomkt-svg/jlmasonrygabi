# JL Masonry & Construction — Next.js Site

Production-ready, high-conversion website for **JL Masonry & Construction** (Woburn, MA).

Stack: **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Lucide icons**.

## Local development

```bash
cd site
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Project layout

```
site/
├─ app/
│  ├─ layout.tsx        # Metadata, fonts (Fraunces + Manrope), <html>
│  ├─ page.tsx          # Homepage composition
│  ├─ globals.css       # Tailwind v4 + brand tokens + animations
│  ├─ sitemap.ts        # Generated /sitemap.xml
│  ├─ robots.ts         # Generated /robots.txt
│  └─ icon.tsx          # Dynamic favicon (gold "JL" on charcoal)
├─ components/
│  ├─ Header.tsx        # Sticky nav, mobile drawer
│  ├─ Hero.tsx          # Full-bleed hero, Ken-Burns image, marquee
│  ├─ Stats.tsx         # 4-stat trust strip
│  ├─ Services.tsx      # 10 service cards (image + bullets)
│  ├─ About.tsx         # Story + 4 trust pillars + image collage
│  ├─ Process.tsx       # 4-step timeline
│  ├─ CTABanner.tsx     # Mid-page call-to-action with background
│  ├─ Gallery.tsx       # Editorial asymmetric image grid
│  ├─ Testimonials.tsx  # Google-review style quote cards
│  ├─ FAQ.tsx           # Accordion (controlled, accessible)
│  ├─ Contact.tsx       # Form + business info block
│  ├─ Footer.tsx        # Sitemap + socials + hours
│  ├─ MobileCallBar.tsx # Sticky bottom call/CTA on mobile
│  └─ JsonLd.tsx        # LocalBusiness + FAQ + Breadcrumb schema
├─ lib/site.ts          # All content (services, testimonials, FAQ, etc.)
└─ public/              # Logo + masonry photography
```

## Brand tokens

Defined in [`app/globals.css`](app/globals.css) under `@theme`:

| Token            | Value     | Usage                          |
|------------------|-----------|--------------------------------|
| `--color-charcoal` | `#1C1C1C` | Primary background             |
| `--color-stone`    | `#2E2E2E` | Alternate section background   |
| `--color-graphite` | `#4A4A4A` | Secondary text, borders        |
| `--color-bone`     | `#F5F5F0` | Body text on dark              |
| `--color-gold`     | `#C9963B` | Primary accent / CTAs          |
| `--color-gold-bright` | `#E0B864` | Hover state                  |

Fonts: **Fraunces** (display, variable serif) + **Manrope** (body, sans).

## SEO

- Full `Metadata` with OG + Twitter cards.
- `LocalBusiness` + `FAQPage` + `BreadcrumbList` JSON-LD.
- `sitemap.xml` + `robots.txt` auto-generated at build.
- Semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`), one `<h1>`, descriptive alt text.
- Image optimization via `next/image` (AVIF/WebP, lazy by default).

## Editing content

All site copy and lists live in [`lib/site.ts`](lib/site.ts) — services, testimonials, FAQ,
process, stats, contact info, social links. Update one file, the whole site reflects it.

## Wiring the contact form

The `<Contact />` form currently uses optimistic client state. To send real emails, replace
the `onSubmit` handler in [`components/Contact.tsx`](components/Contact.tsx) with a fetch
to your backend (Resend, Formspree, n8n webhook, etc.).

## Accessibility checklist (already addressed)

- Color contrast ≥ AA on all body text (bone-on-charcoal: 14:1).
- Keyboard navigation + visible gold focus rings.
- `aria-label`, `aria-expanded`, `aria-hidden` on interactive controls.
- `prefers-reduced-motion` honored — all animations collapse to instant.
- Mobile call bar avoids fixed-overlap with body content via padding.

## Deploy

This is a standard Next.js 15 app — deploy on **Vercel** in one click, or any Node host.
