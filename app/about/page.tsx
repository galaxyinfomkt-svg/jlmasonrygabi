import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Hammer,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import QuoteModal from "@/components/QuoteModal";
import LeadConnectorForm from "@/components/LeadConnectorForm";
import { BUSINESS_ID } from "@/lib/schema";
import { hicLabel, site } from "@/lib/site";

const url = `${site.website}/about`;
const title = "About JL Masonry & Construction | Woburn, MA";
const description =
  "Owner-led masonry out of Woburn, MA. Who we are, how we quote and build, and the towns we work in. Free on-site estimates.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: ["/assets/about.jpg"],
  },
};

/* The towns the audit identified as the real working radius around Woburn. */
const coreTowns = [
  "Woburn",
  "Burlington",
  "Lexington",
  "Winchester",
  "Stoneham",
  "Reading",
  "Wilmington",
  "Medford",
  "Arlington",
  "Melrose",
  "Wakefield",
  "Billerica",
  "Bedford",
  "Lynnfield",
  "Malden",
];

const steps = [
  {
    icon: Phone,
    title: "You call or send a few details",
    body: "Tell us what you have and, if you can, text a photo of the area. Most questions get answered on that first call, including whether the job is something we should even be doing.",
  },
  {
    icon: MapPin,
    title: "We come out and measure — free",
    body: "We look at the site, the grade, the drainage and what is under the existing work. That visit is free and there is no obligation at the end of it.",
  },
  {
    icon: ClipboardList,
    title: "You get an itemized written quote",
    body: "Materials, base prep, dimensions, timeline and what is not included — in writing, so you can compare it line by line against anyone else's.",
  },
  {
    icon: Hammer,
    title: "We build it and clean up",
    body: "We give you a start date and keep you posted as the work moves. The site gets cleaned at the end of the job, not left for you to deal with.",
  },
];

const principles = [
  {
    title: "The base is the job",
    body: "Almost every masonry failure in Massachusetts starts underground: a base that is too shallow, not compacted, or holding water that freezes. Most of what you pay us for is the part you will never see.",
  },
  {
    title: "You deal with the people doing the work",
    body: "This is a small, owner-led crew. There is no sales rep who disappears after the contract, and no subcontractor you meet for the first time on day one.",
  },
  {
    title: "A written quote, not a number on a napkin",
    body: "Everything is itemized before we start. If something changes mid-project, you hear about it before it costs you money.",
  },
  {
    title: "We say no to the wrong job",
    body: "If overlaying your old patio would just fail again, or the repair you asked for will not hold, we will tell you that — even when the honest answer is a smaller job for us.",
  },
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#page`,
    url,
    name: title,
    description,
    mainEntity: { "@id": BUSINESS_ID },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.website },
      { "@type": "ListItem", position: 2, name: "About", item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <PageBreadcrumb items={[{ label: "About" }]} />

      <main id="main">
        {/* INTRO */}
        <section className="bg-brand-dark pt-28 lg:pt-36 pb-16 lg:pb-24">
          <div className="container-edge grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-bold text-brand-red">
                <Sparkles className="h-3.5 w-3.5" />
                About us
              </div>
              <h1
                className="mt-5 font-display text-brand-light tracking-[-0.025em] text-balance"
                style={{ fontSize: "clamp(2.1rem, 4.6vw, 4rem)", lineHeight: 1.04 }}
              >
                An owner-led masonry crew based in{" "}
                <span className="italic text-brand-red font-medium">Woburn, MA</span>
              </h1>

              <div className="mt-7 space-y-5 text-brand-light/80 text-lg leading-relaxed max-w-xl text-pretty">
                <p>
                  {site.name} is run by {site.owner}, who has been laying stone
                  and brick in Massachusetts since {site.tradeSince} and formed the
                  company in Woburn in {site.llcFounded}. Today the crew builds
                  patios, walkways, stone and retaining walls, steps, chimneys and
                  concrete work for homeowners and businesses across Eastern
                  Massachusetts.
                </p>
                <p>
                  Masonry here lives or dies by one thing: how the work handles
                  the freeze-thaw cycle. Water gets into a shallow base, a failed
                  mortar joint or an open chimney crown, freezes, expands, and
                  takes the work apart from the inside. Everything we do — the
                  depth we dig to, the mortar we match, the pitch we set — comes
                  back to keeping water out and letting it drain.
                </p>
                <p>
                  We are a small operation on purpose. {site.ownerFirstName} is on
                  the jobs, and the person who quotes your project is the person
                  who builds it.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={site.phoneHref} className="btn-primary">
                  <Phone className="h-4 w-4" />
                  Call {site.phone}
                </a>
                <a href="#about-form" className="btn-ghost">
                  Get a free estimate <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {hicLabel && (
                <p className="mt-5 text-sm text-brand-light/60">{hicLabel}</p>
              )}
            </div>

            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-white/10 shadow-warm">
              <Image
                src="/assets/about.jpg"
                alt="Granite steps and landing beside a fieldstone wall with granite caps, built by JL Masonry in Massachusetts"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                quality={72}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="bg-brand-stone py-16 lg:py-24">
          <div className="container-edge">
            <h2
              className="font-display text-brand-light text-balance"
              style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", lineHeight: 1.08 }}
            >
              What happens after you call
            </h2>
            <p className="mt-4 max-w-2xl text-brand-light/70 leading-relaxed">
              No deposit to get on the schedule, and no pressure at the end of the
              estimate. Here is the whole process.
            </p>

            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="p-6 bg-brand-dark border border-white/10 rounded-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-sm bg-brand-red/15 border border-brand-red/40 grid place-items-center text-brand-red shrink-0">
                      <s.icon className="h-4 w-4" />
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-brand-light/50">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg text-brand-light leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-light/70 leading-relaxed">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="bg-brand-dark py-16 lg:py-24">
          <div className="container-edge grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16">
            <div>
              <h2
                className="font-display text-brand-light text-balance"
                style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", lineHeight: 1.08 }}
              >
                How we work, in four sentences
              </h2>
              <p className="mt-4 text-brand-light/70 leading-relaxed max-w-lg">
                Every masonry company says &ldquo;quality craftsmanship&rdquo;. These
                are the specific things we do differently, and you can hold us to
                each one.
              </p>
            </div>
            <ul className="space-y-5">
              {principles.map((p) => (
                <li
                  key={p.title}
                  className="p-6 bg-brand-stone border border-white/10 rounded-sm"
                >
                  <h3 className="font-display text-xl text-brand-light flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-red mt-1 shrink-0" />
                    {p.title}
                  </h3>
                  <p className="mt-2 text-brand-light/75 leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* AREA */}
        <section className="bg-brand-stone py-16 lg:py-24">
          <div className="container-edge">
            <h2
              className="font-display text-brand-light text-balance"
              style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", lineHeight: 1.08 }}
            >
              Where we work
            </h2>
            <p className="mt-4 max-w-2xl text-brand-light/70 leading-relaxed">
              We are based in Woburn and most of our work is within a short drive
              of it. These are the towns we are in most weeks:
            </p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {coreTowns.map((t) => (
                <li
                  key={t}
                  className="px-4 py-1.5 bg-brand-dark border border-white/10 rounded-sm text-sm text-brand-light/80"
                >
                  {t}, MA
                </li>
              ))}
            </ul>
            <Link
              href="/locations"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:text-brand-red-light transition"
            >
              See every town we serve <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FORM */}
        <section id="about-form" className="bg-brand-dark py-16 lg:py-24 scroll-mt-24">
          <div className="container-edge max-w-2xl">
            <h2
              className="font-display text-brand-light text-center text-balance"
              style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.4rem)", lineHeight: 1.1 }}
            >
              Ready to see what your project will cost?
            </h2>
            <p className="mt-3 text-center text-brand-light/70">
              Send a few details and we will set up a free on-site estimate. You
              get an itemized written quote — no pressure.
            </p>
            <div className="mt-8 bg-brand-light rounded-sm border border-brand-red/30 shadow-2xl p-5 lg:p-6">
              <LeadConnectorForm height={520} title="JL Masonry — About page" />
              <div className="mt-4 pt-4 border-t border-brand-dark/10 flex items-center justify-between gap-3 text-xs">
                <span className="text-brand-gray">Prefer to call?</span>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-1.5 text-brand-dark hover:text-brand-red-deep font-bold transition"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-red-deep" />
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <QuoteModal />
    </>
  );
}
