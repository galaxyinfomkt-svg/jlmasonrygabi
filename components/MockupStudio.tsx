"use client";

/**
 * MockupStudio — dispatcher for the /mockup prototype variants.
 *
 * Prototype skill UI branch, sub-shape A: the same route renders one
 * of N radically different layouts based on `?variant=` in the URL.
 * Three variants are draft layouts to pick from before committing.
 *
 * The floating switcher only appears when `?variant=` is present in
 * the URL, so production visitors never see it — only people who
 * receive the share link with the param.
 *
 * Variants:
 *   A — Two-column grid       (current baseline)
 *   B — Single-column wizard  (step-by-step focus)
 *   C — Split-screen studio   (Photoshop-like persistent toolbar)
 *
 * After a winner is picked, delete the other two variants and the
 * switcher, then fold the winning layout into this file directly.
 */

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VariantA from "./mockup/VariantA";
import VariantB from "./mockup/VariantB";
import VariantC from "./mockup/VariantC";
import PrototypeSwitcher from "./mockup/PrototypeSwitcher";

const VARIANTS = [
  { key: "A", name: "Two columns" },
  { key: "B", name: "Wizard" },
  { key: "C", name: "Split studio" },
];

function MockupStudioInner() {
  const params = useSearchParams();
  const raw = params.get("variant");
  const isPrototype = raw !== null;
  const variant = (raw ?? "A").toUpperCase();

  return (
    <>
      {variant === "B" ? (
        <VariantB />
      ) : variant === "C" ? (
        <VariantC />
      ) : (
        <VariantA />
      )}
      {isPrototype && (
        <PrototypeSwitcher variants={VARIANTS} current={variant} />
      )}
    </>
  );
}

export default function MockupStudio() {
  return (
    <Suspense fallback={null}>
      <MockupStudioInner />
    </Suspense>
  );
}
