import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import QuoteModal from "@/components/QuoteModal";
import { blogPostsByDate } from "@/lib/blog";
import { site } from "@/lib/site";

const url = `${site.website}/blog`;
const title = "Masonry Advice for Massachusetts Homes | JL Masonry";
const description =
  "Straight answers on chimneys, patios, steps and winter damage from a working mason in Woburn, MA. No fluff, no sales pitch.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title,
    description,
    url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
};

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.website },
      { "@type": "ListItem", position: 2, name: "Blog", item: url },
    ],
  };

  const [featured, ...rest] = blogPostsByDate;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <PageBreadcrumb items={[{ label: "Blog" }]} />

      <main id="main" className="bg-brand-dark">
        <section className="pt-28 lg:pt-36 pb-12 lg:pb-16">
          <div className="container-edge">
            <h1
              className="font-display text-brand-light tracking-[-0.025em] text-balance max-w-3xl"
              style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.8rem)", lineHeight: 1.04 }}
            >
              Masonry advice for{" "}
              <span className="italic text-brand-red font-medium">
                Massachusetts homes
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-brand-light/75 leading-relaxed">
              What we learn taking apart failed masonry around Greater Boston,
              written so you can decide what your own house needs. Written by{" "}
              {site.owner}, who does the work.
            </p>
          </div>
        </section>

        {featured && (
          <section className="pb-12 lg:pb-16">
            <div className="container-edge">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid lg:grid-cols-2 gap-6 lg:gap-10 items-center bg-brand-stone border border-white/10 hover:border-brand-red/50 rounded-sm overflow-hidden transition-colors"
              >
                <div className="relative aspect-[16/10] lg:aspect-[4/3]">
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                </div>
                <div className="p-6 lg:p-10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.65rem] uppercase tracking-[0.2em] font-bold text-brand-red">
                    <span>{featured.cluster}</span>
                    <span className="flex items-center gap-1.5 text-brand-light/50">
                      <CalendarDays className="h-3 w-3" />
                      {formatDate(featured.date)}
                    </span>
                    <span className="flex items-center gap-1.5 text-brand-light/50">
                      <Clock className="h-3 w-3" />
                      {featured.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl lg:text-3xl text-brand-light leading-tight text-balance group-hover:text-brand-red transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-brand-light/70 leading-relaxed">
                    {featured.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-red">
                    Read the article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {rest.length > 0 && (
          <section className="pb-16 lg:pb-24">
            <div className="container-edge">
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col bg-brand-stone border border-white/10 hover:border-brand-red/50 rounded-sm overflow-hidden transition-colors"
                    >
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] uppercase tracking-[0.2em] font-bold text-brand-red">
                          <span>{post.cluster}</span>
                          <span className="text-brand-light/45">
                            {post.readingMinutes} min
                          </span>
                        </div>
                        <h2 className="mt-3 font-display text-xl text-brand-light leading-snug group-hover:text-brand-red transition-colors">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-sm text-brand-light/70 leading-relaxed">
                          {post.summary}
                        </p>
                        <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-red">
                          Read more <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="border-t border-white/10 py-14 lg:py-20">
          <div className="container-edge text-center">
            <h2 className="font-display text-2xl lg:text-3xl text-brand-light text-balance">
              Got a question about your own masonry?
            </h2>
            <p className="mt-3 text-brand-light/70">
              Call and ask. We answer questions about jobs we are not quoting too.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {site.phone}
              </a>
              <Link href="/services" className="btn-ghost">
                See all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <QuoteModal />
    </>
  );
}
