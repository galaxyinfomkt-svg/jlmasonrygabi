"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs, site } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="faq"
      className="relative bg-brand-stone py-24 lg:py-32"
      aria-labelledby="faq-h"
    >
      <div className="container-edge">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="eyebrow justify-center">
            <span className="h-px w-9 bg-brand-gold" />
            FAQ
            <span className="h-px w-9 bg-brand-gold" />
          </div>
          <h2
            id="faq-h"
            className="mt-5 font-display text-brand-light tracking-tight text-balance"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.04 }}
          >
            Frequently Asked <span className="italic text-brand-gold">Questions</span>
          </h2>
          <p className="mt-5 text-brand-light/65 text-lg leading-relaxed text-pretty">
            Don't see your question?{" "}
            <a
              href={site.phoneHref}
              className="text-brand-gold font-semibold underline-offset-4 hover:underline"
            >
              Call {site.phone}
            </a>{" "}
            — a real person answers, Mon–Sat.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="max-w-4xl mx-auto divide-y divide-white/10 border-y border-white/10"
        >
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={item.q}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-display text-lg lg:text-2xl text-brand-light group-hover:text-brand-gold transition-colors leading-snug">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 h-10 w-10 rounded-full border grid place-items-center transition-all duration-500 ${
                      isOpen
                        ? "rotate-45 bg-brand-gold text-brand-dark border-brand-gold scale-110"
                        : "border-white/20 text-brand-light/80 group-hover:border-brand-gold group-hover:text-brand-gold"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto", marginBottom: 24 },
                        collapsed: { opacity: 0, height: 0, marginBottom: 0 },
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl text-brand-light/70 leading-[1.75] text-pretty">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
