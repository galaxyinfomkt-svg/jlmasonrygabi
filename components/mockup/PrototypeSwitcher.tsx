"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Variant = { key: string; name: string };

export default function PrototypeSwitcher({
  variants,
  current,
}: {
  variants: Variant[];
  current: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goto = (variantKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", variantKey);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentIdx = Math.max(
    0,
    variants.findIndex((v) => v.key === current),
  );

  const prev = () => {
    const idx = (currentIdx - 1 + variants.length) % variants.length;
    goto(variants[idx].key);
  };
  const next = () => {
    const idx = (currentIdx + 1) % variants.length;
    goto(variants[idx].key);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          (t as HTMLElement).isContentEditable)
      )
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIdx, variants]);

  const cur = variants[currentIdx];

  return (
    <div
      role="region"
      aria-label="Prototype variant switcher"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-brand-dark border-2 border-brand-gold/60 rounded-full shadow-2xl px-2 py-1.5 text-brand-light"
      style={{ pointerEvents: "auto" }}
    >
      <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold bg-brand-gold text-brand-dark px-2 py-1 rounded-full">
        Prototype
      </span>
      <button
        type="button"
        onClick={prev}
        aria-label="Previous variant"
        className="h-9 w-9 grid place-items-center rounded-full hover:bg-white/10 transition"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div className="min-w-[180px] text-center px-2">
        <div className="text-xs text-brand-light/55 uppercase tracking-[0.15em]">
          Variant {cur.key}
        </div>
        <div className="text-sm font-bold leading-tight">{cur.name}</div>
      </div>
      <button
        type="button"
        onClick={next}
        aria-label="Next variant"
        className="h-9 w-9 grid place-items-center rounded-full hover:bg-white/10 transition"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
