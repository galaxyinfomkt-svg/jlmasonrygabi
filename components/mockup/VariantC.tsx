"use client";

/**
 * VARIANT C — Split-screen photo studio with bottom toolbar
 *
 * Layout: full-width split top (Original | AI Preview), with a dark
 * sticky toolbar at the bottom containing the stone catalog as a
 * horizontal scroll, brush controls and the big Generate button.
 *
 * Information hierarchy: photo is the hero; tools and stones live in a
 * persistent bottom dock — like a design app (Figma / Photoshop).
 * Primary affordance: a prominent floating "Generate" CTA in the dock.
 *
 * Different from A: no side panel, no stacked cards.
 * Different from B: no steps — everything is visible at once, like a
 * tool.
 */

import { useState } from "react";
import {
  Upload, Sparkles, Loader2, Download, Check,
  Square, Eraser, RotateCcw, AlertCircle, ChevronDown,
} from "lucide-react";
import { openQuoteModal } from "../QuoteModal";
import { useMockupStudio, STONES } from "./useMockupStudio";

export default function VariantC() {
  const s = useMockupStudio();
  const [showDetails, setShowDetails] = useState(false);

  if (!s.photo) {
    // Centered upload zone before we have a photo
    return (
      <div className="max-w-2xl mx-auto">
        <label
          htmlFor="mockup-file-c"
          className="block aspect-[4/3] cursor-pointer rounded-md border-2 border-dashed border-brand-gold/30 hover:border-brand-gold/70 bg-brand-stone/40 hover:bg-brand-gold/5 transition"
        >
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="h-20 w-20 rounded-full bg-brand-gold/15 grid place-items-center text-brand-gold mb-4">
              <Upload className="h-9 w-9" />
            </div>
            <div className="font-display text-2xl text-brand-light mb-2">
              Drop your photo to start
            </div>
            <p className="text-brand-light/60 max-w-md mb-5">
              A clear daytime photo of the area you want to dress in stone.
            </p>
            <span className="btn-primary pointer-events-none">Choose photo</span>
            <input
              id="mockup-file-c"
              ref={s.fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => s.onFile(e.target.files?.[0] ?? null)}
            />
          </div>
        </label>
      </div>
    );
  }

  return (
    <div className="-mx-4 md:-mx-6">
      {/* Top: split before/after (preview placeholder until generated) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 mb-px">
        <Pane title="Original" highlight={false}>
          <div className="relative w-full bg-black" style={{ aspectRatio: `${s.photo.w} / ${s.photo.h}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.photo.src} alt="Original"
              className="block absolute inset-0 w-full h-full object-contain pointer-events-none"
              draggable={false} />
            <canvas ref={s.canvasRef} width={s.photo.w} height={s.photo.h}
              className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
              onPointerDown={s.onPointerDown} onPointerMove={s.onPointerMove}
              onPointerUp={s.onPointerUp} onPointerCancel={s.onPointerUp} />
          </div>
        </Pane>
        <Pane title={`AI Preview${s.gen.kind === "done" ? ` — ${s.selectedStone.name}` : ""}`} highlight>
          <div className="relative w-full bg-brand-dark/60" style={{ aspectRatio: `${s.photo.w} / ${s.photo.h}` }}>
            {s.gen.kind === "done" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.gen.image} alt="AI preview"
                className="block absolute inset-0 w-full h-full object-contain" />
            ) : s.gen.kind === "loading" ? (
              <div className="absolute inset-0 grid place-items-center text-brand-light/80">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-10 w-10 animate-spin text-brand-gold" />
                  <p className="font-display text-lg">Generating…</p>
                  <p className="text-xs text-brand-light/60">15–30 seconds</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 grid place-items-center text-brand-light/40 text-center p-8">
                <div>
                  <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    {s.hasMask
                      ? "Pick a stone below and hit Generate to see the preview here"
                      : "Drag a rectangle on the original, pick a stone, then Generate"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Pane>
      </div>

      {/* Action bar: selection controls + actions */}
      <div className="px-4 md:px-6 py-3 bg-brand-stone border-y border-white/10 flex items-center gap-3 flex-wrap text-sm">
        <div className="inline-flex items-center gap-1.5 text-sm text-brand-light/70 mr-auto">
          <Square className="h-4 w-4 text-brand-gold" />
          <span>
            <strong className="text-brand-light">{s.rects.length}</strong>{" "}
            area{s.rects.length === 1 ? "" : "s"} selected{" "}
            <span className="text-brand-light/40 hidden sm:inline">
              · click & drag on the original to add
            </span>
          </span>
        </div>
        <button type="button" onClick={s.undoLast} disabled={s.rects.length === 0}
          className="text-xs text-brand-light/70 hover:text-brand-gold disabled:opacity-40">
          Undo
        </button>
        <button type="button" onClick={s.clearMask} disabled={s.rects.length === 0}
          className="inline-flex items-center gap-1 text-xs text-brand-light/70 hover:text-brand-red disabled:opacity-40">
          <Eraser className="h-3.5 w-3.5" />Clear
        </button>
        <button type="button" onClick={s.reset}
          className="inline-flex items-center gap-1 text-xs text-brand-light/70 hover:text-brand-red">
          <RotateCcw className="h-3.5 w-3.5" />New photo
        </button>
        <button type="button" onClick={() => setShowDetails((v) => !v)}
          className="inline-flex items-center gap-1 text-xs text-brand-light/70 hover:text-brand-gold ml-auto">
          Wall details<ChevronDown className={`h-3.5 w-3.5 transition ${showDetails ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Optional collapsed details */}
      {showDetails && (
        <div className="px-4 md:px-6 py-4 bg-brand-stone/60 border-b border-white/10 grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <DetailInput label="Wall type">
            <select value={s.wallType} onChange={(e) => s.setWallType(e.target.value)}
              className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-2.5 py-1.5 text-sm text-brand-light outline-none">
              <option value="decorative veneer">Decorative veneer</option>
              <option value="retaining wall">Retaining wall</option>
              <option value="low retaining wall (murinho)">Low retaining (murinho)</option>
              <option value="accent wall">Accent wall</option>
              <option value="chimney cladding">Chimney cladding</option>
              <option value="garden / property wall">Garden / property wall</option>
              <option value="patio / hardscape">Patio / hardscape</option>
            </select>
          </DetailInput>
          <DetailInput label="Side">
            <select value={s.wallSide} onChange={(e) => s.setWallSide(e.target.value as "" | "left" | "right" | "both")}
              className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-2.5 py-1.5 text-sm text-brand-light outline-none">
              <option value="">Auto</option>
              <option value="right">Right only</option>
              <option value="left">Left only</option>
              <option value="both">Both sides</option>
            </select>
          </DetailInput>
          <DetailInput label="Color tones">
            <input type="text" value={s.colorTones} onChange={(e) => s.setColorTones(e.target.value)}
              placeholder="gray and beige" className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-2.5 py-1.5 text-sm text-brand-light placeholder-brand-light/40 outline-none" />
          </DetailInput>
          <DetailInput label="Height">
            <input type="text" value={s.wallHeight} onChange={(e) => s.setWallHeight(e.target.value)}
              placeholder="3 feet" className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-2.5 py-1.5 text-sm text-brand-light placeholder-brand-light/40 outline-none" />
          </DetailInput>
          <DetailInput label="Length">
            <input type="text" value={s.wallLength} onChange={(e) => s.setWallLength(e.target.value)}
              placeholder="25 feet" className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-2.5 py-1.5 text-sm text-brand-light placeholder-brand-light/40 outline-none" />
          </DetailInput>
          <DetailInput label="Notes" className="sm:col-span-2 md:col-span-3">
            <input type="text" value={s.area} onChange={(e) => s.setArea(e.target.value)}
              placeholder="front wall around the entrance" className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-2.5 py-1.5 text-sm text-brand-light placeholder-brand-light/40 outline-none" />
          </DetailInput>
          <div className="sm:col-span-2 md:col-span-4 border-t border-white/5 pt-3 flex flex-wrap gap-x-5 gap-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={s.hasSteps}
                onChange={(e) => s.setHasSteps(e.target.checked)}
                className="h-4 w-4 accent-brand-gold" />
              <span className="text-xs text-brand-light/80 flex items-center gap-1.5">
                Stone steps
                {s.hasSteps && (
                  <input type="text" inputMode="numeric" value={s.stepCount}
                    onChange={(e) => s.setStepCount(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="N"
                    className="w-12 bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-1.5 py-0.5 text-xs text-brand-light placeholder-brand-light/40 outline-none" />
                )}
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={s.hasTopLanding}
                onChange={(e) => s.setHasTopLanding(e.target.checked)}
                className="h-4 w-4 accent-brand-gold" />
              <span className="text-xs text-brand-light/80">Top landing</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={s.connectsToEntrance}
                onChange={(e) => s.setConnectsToEntrance(e.target.checked)}
                className="h-4 w-4 accent-brand-gold" />
              <span className="text-xs text-brand-light/80">Connects to entrance</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={s.hasRailing}
                onChange={(e) => s.setHasRailing(e.target.checked)}
                className="h-4 w-4 accent-brand-gold" />
              <span className="text-xs text-brand-light/80">Railing / handrail</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={s.includeLandscaping}
                onChange={(e) => s.setIncludeLandscaping(e.target.checked)}
                className="h-4 w-4 accent-brand-gold" />
              <span className="text-xs text-brand-light/80">Landscaping</span>
            </label>
          </div>
        </div>
      )}

      {/* Bottom dock: stone catalog horizontal scroll + Generate CTA */}
      <div className="px-4 md:px-6 py-4 bg-brand-dark border-b border-white/5">
        <div className="flex items-center gap-3 mb-2 text-xs uppercase tracking-[0.18em] text-brand-light/50 font-semibold">
          Stone catalog
          <span className="text-brand-gold/80 normal-case tracking-normal font-normal italic">
            — Selected: {s.selectedStone.name}
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 snap-x snap-mandatory">
          {STONES.map((stone) => {
            const selected = stone.id === s.stoneId;
            return (
              <button key={stone.id} type="button" onClick={() => s.setStoneId(stone.id)}
                className={`relative shrink-0 w-32 rounded-md overflow-hidden border-2 transition snap-start ${selected ? "border-brand-gold ring-2 ring-brand-gold/40" : stone.featured ? "border-brand-gold/40" : "border-white/10 hover:border-white/30"}`}>
                {stone.swatchImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={stone.swatchImage} alt={stone.name} className="h-16 w-full object-cover" />
                ) : (
                  <div className="h-16 w-full" style={{ background: stone.swatch }} aria-hidden="true" />
                )}
                <div className="px-2 py-1.5 bg-brand-stone text-left">
                  <div className="text-[0.7rem] font-semibold text-brand-light leading-tight">{stone.name}</div>
                </div>
                {stone.featured && (
                  <span className="absolute top-1 left-1 text-[0.5rem] uppercase tracking-[0.15em] bg-brand-gold text-brand-dark px-1 py-0.5 rounded-sm font-bold">This Job</span>
                )}
                {selected && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-brand-gold text-brand-dark grid place-items-center">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky generate bar */}
      <div className="px-4 md:px-6 py-4 bg-brand-stone border-b border-white/5 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-brand-light/60">
          {!s.hasMask
            ? "Drag a rectangle on the original photo to enable Generate"
            : s.gen.kind === "loading"
              ? "AI is working on your preview…"
              : s.gen.kind === "done"
                ? "Preview ready — try another stone or save the result"
                : "Ready when you are"}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {s.gen.kind === "done" && (
            <>
              <a href={s.gen.image} download="jl-masonry-mockup.png"
                className="inline-flex items-center gap-1.5 text-sm text-brand-light/80 hover:text-brand-gold border border-white/15 hover:border-brand-gold/60 px-3 py-2 rounded-sm transition">
                <Download className="h-4 w-4" />Download
              </a>
              <button type="button"
                onClick={() => { if (typeof window !== "undefined") (window as any).__jlMockupImage = (s.gen as any).image; openQuoteModal(); }}
                className="btn-primary">Get a Real Quote →</button>
            </>
          )}
          <button type="button" onClick={s.generate}
            disabled={!s.hasMask || s.gen.kind === "loading"}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {s.gen.kind === "loading" ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Generating…</>
            ) : s.gen.kind === "done" ? (
              <><Sparkles className="h-4 w-4" />Generate again</>
            ) : (
              <><Sparkles className="h-4 w-4" />Generate mockup</>
            )}
          </button>
        </div>
      </div>

      {s.gen.kind === "error" && (
        <div className="px-4 md:px-6 py-3 bg-red-500/10 border-b border-red-500/30 flex items-start gap-2 text-sm text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0 mt-px" />
          <span>{s.gen.message}</span>
        </div>
      )}
    </div>
  );
}

function Pane({ title, children, highlight }: { title: string; children: React.ReactNode; highlight: boolean }) {
  return (
    <div className={`relative bg-brand-stone ${highlight ? "ring-1 ring-brand-gold/30 ring-inset" : ""}`}>
      <div className={`absolute top-2 left-2 z-10 text-[0.6rem] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-sm ${highlight ? "bg-brand-gold text-brand-dark" : "bg-brand-dark/80 text-brand-light/80"}`}>
        {title}
      </div>
      {children}
    </div>
  );
}

function DetailInput({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[0.6rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1 font-semibold">{label}</label>
      {children}
    </div>
  );
}
