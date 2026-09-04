import About from "@/components/About";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import QuoteModal from "@/components/QuoteModal";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <CtaBand
          heading="Ready for your free estimate?"
          sub="Tell us about the job — we come measure at no cost."
        />
        <Gallery />
        <CtaBand
          tone="dark"
          heading="Want work like this on your property?"
          sub="Licensed masonry crew serving Greater Boston."
        />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <QuoteModal />
    </>
  );
}
