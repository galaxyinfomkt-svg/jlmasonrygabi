import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import QuoteModal from "@/components/QuoteModal";
import LeadConnectorForm from "@/components/LeadConnectorForm";
import { blogPosts, blogPostBySlug, blogPostsByDate } from "@/lib/blog";
import { BUSINESS_ID } from "@/lib/schema";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug.get(slug);
  if (!post) return {};

  const url = `${site.website}/blog/${post.slug}`;
  // Keep the brand suffix only while the whole title still fits ~60 chars.
  const title =
    post.title.length <= 44 ? `${post.title} | JL Masonry` : post.title;

  return {
    title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description: post.summary,
      url,
      siteName: site.name,
      type: "article",
      locale: "en_US",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [post.image],
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostBySlug.get(slug);
  if (!post) notFound();

  const url = `${site.website}/blog/${post.slug}`;
  const related = blogPostsByDate.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.summary,
    image: `${site.website}${post.image}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: site.owner, worksFor: { "@id": BUSINESS_ID } },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: url,
    inLanguage: "en-US",
  };

  const faqSchema = post.faqs.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.website },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.website}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <PageBreadcrumb
        items={[{ label: "Blog", href: "/blog" }, { label: post.cluster }]}
      />

      <main id="main" className="bg-brand-dark">
        <article>
          {/* HEAD */}
          <header className="pt-28 lg:pt-36 pb-10">
            <div className="container-edge max-w-3xl">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.65rem] uppercase tracking-[0.2em] font-bold text-brand-red">
                <span>{post.cluster}</span>
                <span className="flex items-center gap-1.5 text-brand-light/50">
                  <CalendarDays className="h-3 w-3" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5 text-brand-light/50">
                  <Clock className="h-3 w-3" />
                  {post.readingMinutes} min read
                </span>
              </div>
              <h1
                className="mt-5 font-display text-brand-light tracking-[-0.02em] text-balance"
                style={{ fontSize: "clamp(1.95rem, 4.2vw, 3.2rem)", lineHeight: 1.07 }}
              >
                {post.title}
              </h1>
              <p className="mt-5 text-sm text-brand-light/55">
                By {site.owner} · {site.name}, Woburn MA
              </p>
            </div>
          </header>

          <div className="container-edge max-w-4xl">
            <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-white/10">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* BODY */}
          <div className="container-edge max-w-3xl py-12 lg:py-16">
            <div className="space-y-5 text-lg text-brand-light/80 leading-relaxed">
              {post.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {post.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="font-display text-2xl lg:text-3xl text-brand-light text-balance">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-brand-light/75 leading-relaxed">
                  {section.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {section.list && (
                  <ul className="mt-5 space-y-3">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-brand-red shrink-0" />
                        <span className="text-brand-light/75 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* FAQ */}
            {post.faqs.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-2xl lg:text-3xl text-brand-light">
                  Questions we get asked
                </h2>
                <dl className="mt-6 space-y-4">
                  {post.faqs.map((f) => (
                    <div
                      key={f.q}
                      className="p-5 bg-brand-stone border border-white/10 rounded-sm"
                    >
                      <dt className="font-display text-lg text-brand-light">{f.q}</dt>
                      <dd className="mt-2 text-brand-light/75 leading-relaxed">
                        {f.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {/* RELATED SERVICE */}
            <aside className="mt-14 p-6 lg:p-8 bg-brand-stone border border-brand-red/30 rounded-sm">
              <div className="text-[0.65rem] uppercase tracking-[0.22em] font-bold text-brand-red">
                The service behind this article
              </div>
              <h2 className="mt-3 font-display text-2xl text-brand-light">
                {post.relatedServiceLabel}
              </h2>
              <p className="mt-2 text-brand-light/75 leading-relaxed">
                Free on-site estimate, itemized written quote, no deposit to get on
                the schedule.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/services/${post.relatedService}`} className="btn-primary">
                  See the service <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={site.phoneHref} className="btn-ghost">
                  <Phone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>
            </aside>
          </div>
        </article>

        {/* FORM */}
        <section className="border-t border-white/10 py-14 lg:py-20">
          <div className="container-edge max-w-2xl">
            <h2 className="font-display text-2xl lg:text-3xl text-brand-light text-center text-balance">
              Want us to look at yours?
            </h2>
            <p className="mt-3 text-center text-brand-light/70">
              Send a few details, or a photo, and we will set up a free visit.
            </p>
            <div className="mt-8 bg-brand-light rounded-sm border border-brand-red/30 shadow-2xl p-5 lg:p-6">
              <LeadConnectorForm height={520} title="JL Masonry — Blog" />
            </div>
          </div>
        </section>

        {/* RELATED POSTS */}
        {related.length > 0 && (
          <section className="border-t border-white/10 py-14 lg:py-20">
            <div className="container-edge">
              <h2 className="font-display text-2xl text-brand-light">
                More from the blog
              </h2>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex gap-4 p-4 bg-brand-stone border border-white/10 hover:border-brand-red/50 rounded-sm transition-colors"
                    >
                      <div className="relative h-20 w-28 shrink-0 rounded-sm overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.imageAlt}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[0.6rem] uppercase tracking-[0.2em] font-bold text-brand-red">
                          {p.cluster}
                        </div>
                        <h3 className="mt-1.5 font-display text-base text-brand-light leading-snug group-hover:text-brand-red transition-colors">
                          {p.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <QuoteModal />
    </>
  );
}
