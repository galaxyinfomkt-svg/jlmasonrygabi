import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import MockupStudio from "@/components/MockupStudio";

export const metadata: Metadata = {
  title: "Visualize Stone on Your Home — AI Mockup | JL Masonry",
  description:
    "Upload a photo of your home, point to where you want stone, and see an instant AI mockup. Free preview before you book a free estimate.",
  robots: { index: true, follow: true },
};

export default function MockupPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-dark min-h-screen pt-28 lg:pt-32 pb-20">
        <div className="container-edge">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="eyebrow justify-center">
              <span className="h-px w-9 bg-brand-gold" />
              AI Visualizer
              <span className="h-px w-9 bg-brand-gold" />
            </div>
            <h1
              className="mt-5 font-display text-brand-light tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05 }}
            >
              See the stone on{" "}
              <span className="italic text-brand-gold">your home</span> — before
              we build it
            </h1>
            <p className="mt-5 text-brand-light/70 text-lg leading-relaxed">
              Upload a photo of your house, tap the spots where you want stone,
              pick a style — our AI generates a preview in seconds. It's a
              concept render, not the final result, but it helps us nail the
              look on the real job.
            </p>
          </div>

          <MockupStudio />
        </div>
      </main>
      <Footer />
      <QuoteModal />
    </>
  );
}
