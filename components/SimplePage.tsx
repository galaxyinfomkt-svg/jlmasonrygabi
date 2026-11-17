import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

/** Plain text page (legal, thank-you, 404) with the normal header/footer. */
export default function SimplePage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-brand-dark min-h-[70vh] pt-32 lg:pt-40 pb-20">
        <article className="container-edge max-w-3xl">
          <h1
            className="font-display text-brand-light tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.08 }}
          >
            {title}
          </h1>
          {updated && (
            <p className="mt-3 text-sm text-brand-light/55">Last updated: {updated}</p>
          )}
          <div className="mt-8 space-y-5 text-brand-light/80 leading-relaxed [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-brand-light [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1 [&_p_a:not(.btn-primary):not(.btn-ghost)]:text-brand-red-light [&_p_a:not(.btn-primary):not(.btn-ghost)]:underline [&_li_a]:text-brand-red-light [&_li_a]:underline">
            {children}
          </div>
        </article>
      </main>
      <Footer />
      <QuoteModal />
    </>
  );
}
