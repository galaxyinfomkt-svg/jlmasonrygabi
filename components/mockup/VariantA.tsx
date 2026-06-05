"use client";

/**
 * VARIANT A — Two-column grid (current baseline)
 *
 * Layout: canvas on the left, three stacked control cards on the right.
 * Information hierarchy: tools and configuration sit beside the image.
 * Primary affordance: the "Generate" button anchored at the right-side
 * step 3 card.
 */

import { useRef } from "react";
import {
  Upload, Sparkles, Loader2, Download, RotateCcw, Check,
  AlertCircle, Eraser, Square,
} from "lucide-react";
import { openQuoteModal } from "../QuoteModal";
import { useMockupStudio, STONES } from "./useMockupStudio";

export default function VariantA() {
  const s = useMockupStudio();

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
      <div className="bg-brand-stone border border-white/10 rounded-md overflow-hidden">
        {!s.photo ? (
          <label
            htmlFor="mockup-file-a"
            className="aspect-[4/3] flex flex-col items-center justify-center gap-4 p-8 cursor-pointer hover:bg-white/[0.02] transition border-2 border-dashed border-white/15 m-3 rounded-md"
          >
            <div className="h-16 w-16 rounded-full bg-brand-gold/15 grid place-items-center text-brand-gold">
              <Upload className="h-7 w-7" />
            </div>
            <div className="text-center">
              <div className="font-display text-2xl text-brand-light">
                Upload a photo of your home
              </div>
              <div className="text-brand-light/60 text-sm mt-2 max-w-md">
                A clear daytime photo of the wall, façade, patio or area you
                want to dress in stone.
              </div>
            </div>
            <span className="btn-primary pointer-events-none">Choose photo</span>
            <input
              id="mockup-file-a"
              ref={s.fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => s.onFile(e.target.files?.[0] ?? null)}
            />
          </label>
        ) : (
          <div className="p-3 space-y-3">
            <div
              className="relative w-full select-none rounded-sm overflow-hidden bg-black"
              style={{ aspectRatio: `${s.photo.w} / ${s.photo.h}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.photo.src}
                alt="Your home"
                className="block absolute inset-0 w-full h-full object-contain pointer-events-none"
                draggable={false}
              />
              <canvas
                ref={s.canvasRef}
                width={s.photo.w}
                height={s.photo.h}
                className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
                onPointerDown={s.onPointerDown}
                onPointerMove={s.onPointerMove}
                onPointerUp={s.onPointerUp}
                onPointerCancel={s.onPointerUp}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-1.5 text-xs text-brand-light/65 mr-auto">
                <Square className="h-3.5 w-3.5 text-brand-gold" />
                <span>
                  <strong className="text-brand-light">{s.rects.length}</strong>{" "}
                  area{s.rects.length === 1 ? "" : "s"} selected
                </span>
              </div>
              <button type="button" onClick={s.undoLast} disabled={s.rects.length === 0}
                className="inline-flex items-center gap-1.5 text-xs text-brand-light/70 hover:text-brand-gold border border-white/10 hover:border-brand-gold/60 px-3 py-1.5 rounded-sm transition disabled:opacity-40 disabled:cursor-not-allowed">
                Undo
              </button>
              <button type="button" onClick={s.clearMask} disabled={s.rects.length === 0}
                className="inline-flex items-center gap-1.5 text-xs text-brand-light/70 hover:text-brand-red border border-white/10 hover:border-brand-red/60 px-3 py-1.5 rounded-sm transition disabled:opacity-40 disabled:cursor-not-allowed">
                <Eraser className="h-3.5 w-3.5" />
                Clear
              </button>
              <button type="button" onClick={s.reset}
                className="inline-flex items-center gap-1.5 text-xs text-brand-light/70 hover:text-brand-red transition">
                <RotateCcw className="h-3.5 w-3.5" />
                New photo
              </button>
            </div>
            <p className="text-xs text-brand-light/55">
              {s.hasMask
                ? "Click & drag to add more areas. Click an existing red area to remove it."
                : "Click and drag a rectangle over the wall, chimney or surface you want in stone. Add multiple areas if needed."}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <StonePicker s={s} />
        <WallDetails s={s} />
        <GenerateCard s={s} />
      </div>

      {s.gen.kind === "done" && s.photo && (
        <ResultPanel
          beforeSrc={s.photo.src}
          afterSrc={s.gen.image}
          stoneName={s.selectedStone.name}
        />
      )}
    </div>
  );
}

function StonePicker({ s }: { s: ReturnType<typeof useMockupStudio> }) {
  return (
    <div className="bg-brand-stone border border-white/10 rounded-md p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-7 w-7 rounded-full bg-brand-gold text-brand-dark grid place-items-center text-sm font-bold">1</span>
        <h2 className="font-display text-xl text-brand-light">Pick a stone</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {STONES.map((stone) => {
          const selected = stone.id === s.stoneId;
          return (
            <button key={stone.id} type="button" onClick={() => s.setStoneId(stone.id)}
              className={`relative text-left rounded-sm overflow-hidden border transition-all ${selected ? "border-brand-gold ring-2 ring-brand-gold/40" : stone.featured ? "border-brand-gold/40 hover:border-brand-gold/70" : "border-white/10 hover:border-white/30"}`}>
              {stone.swatchImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={stone.swatchImage} alt={stone.name} className="h-20 w-full object-cover" />
              ) : (
                <div className="h-20 w-full" style={{ background: stone.swatch }} aria-hidden="true" />
              )}
              <div className="px-3 py-2 bg-brand-dark/60">
                <div className="text-xs font-semibold text-brand-light leading-tight">{stone.name}</div>
              </div>
              {stone.featured && (
                <span className="absolute top-1.5 left-1.5 text-[0.55rem] uppercase tracking-[0.18em] bg-brand-gold text-brand-dark px-1.5 py-0.5 rounded-sm font-bold">This Job</span>
              )}
              {selected && (
                <span className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-brand-gold text-brand-dark grid place-items-center">
                  <Check className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-brand-light/55 mt-3 leading-relaxed">{s.selectedStone.description}</p>
    </div>
  );
}

function WallDetails({ s }: { s: ReturnType<typeof useMockupStudio> }) {
  return (
    <div className="bg-brand-stone border border-white/10 rounded-md p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-7 w-7 rounded-full bg-brand-gold text-brand-dark grid place-items-center text-sm font-bold">2</span>
        <h2 className="font-display text-xl text-brand-light">
          Wall details <span className="text-brand-light/40 text-sm font-sans">(optional)</span>
        </h2>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Wall type</label>
            <select value={s.wallType} onChange={(e) => s.setWallType(e.target.value)}
              className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light outline-none transition">
              <option value="decorative veneer">Decorative veneer</option>
              <option value="retaining wall">Retaining wall</option>
              <option value="low retaining wall (murinho)">Low retaining wall (murinho)</option>
              <option value="accent wall">Accent wall</option>
              <option value="chimney cladding">Chimney cladding</option>
              <option value="garden / property wall">Garden / property wall</option>
              <option value="patio / hardscape">Patio / hardscape</option>
            </select>
          </div>
          <div>
            <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Side</label>
            <select value={s.wallSide} onChange={(e) => s.setWallSide(e.target.value as "" | "left" | "right" | "both")}
              className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light outline-none transition">
              <option value="">Auto / let AI decide</option>
              <option value="right">Right side only</option>
              <option value="left">Left side only</option>
              <option value="both">Both sides</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Height</label>
            <input type="text" value={s.wallHeight} onChange={(e) => s.setWallHeight(e.target.value)} placeholder="e.g. 3 feet"
              className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light placeholder-brand-light/40 outline-none transition" />
          </div>
          <div>
            <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Length</label>
            <input type="text" value={s.wallLength} onChange={(e) => s.setWallLength(e.target.value)} placeholder="e.g. 25 feet"
              className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light placeholder-brand-light/40 outline-none transition" />
          </div>
        </div>
        <div>
          <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Color tones</label>
          <input type="text" value={s.colorTones} onChange={(e) => s.setColorTones(e.target.value)} placeholder="e.g. gray and beige mix"
            className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light placeholder-brand-light/40 outline-none transition" />
        </div>
        <div>
          <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Notes about the area</label>
          <textarea value={s.area} onChange={(e) => s.setArea(e.target.value)} placeholder="e.g. front wall around the entrance" rows={2}
            className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light placeholder-brand-light/40 outline-none transition" />
        </div>
        <div className="border-t border-white/5 pt-3 mt-1 space-y-2.5">
          <div className="text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 font-semibold">
            Project features
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={s.hasSteps}
              onChange={(e) => s.setHasSteps(e.target.checked)}
              className="h-4 w-4 accent-brand-gold cursor-pointer"
            />
            <span className="text-sm text-brand-light/80 flex items-center gap-2 flex-wrap">
              Stone steps up to the house
              {s.hasSteps && (
                <input
                  type="text"
                  inputMode="numeric"
                  value={s.stepCount}
                  onChange={(e) => s.setStepCount(e.target.value)}
                  placeholder="how many?"
                  className="w-24 bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-2 py-0.5 text-xs text-brand-light placeholder-brand-light/40 outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={s.hasTopLanding}
              onChange={(e) => s.setHasTopLanding(e.target.checked)}
              className="h-4 w-4 accent-brand-gold cursor-pointer"
            />
            <span className="text-sm text-brand-light/80">
              Small landing / porch at the top of the steps
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={s.connectsToEntrance}
              onChange={(e) => s.setConnectsToEntrance(e.target.checked)}
              className="h-4 w-4 accent-brand-gold cursor-pointer"
            />
            <span className="text-sm text-brand-light/80">
              Connects to existing front-door staircase
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={s.hasRailing}
              onChange={(e) => s.setHasRailing(e.target.checked)}
              className="h-4 w-4 accent-brand-gold cursor-pointer"
            />
            <span className="text-sm text-brand-light/80">
              Stone railing / handrail post
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={s.includeLandscaping}
              onChange={(e) => s.setIncludeLandscaping(e.target.checked)}
              className="h-4 w-4 accent-brand-gold cursor-pointer"
            />
            <span className="text-sm text-brand-light/80">
              Landscaping{" "}
              <span className="text-brand-light/40">(mulch, plants, lighting)</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

function GenerateCard({ s }: { s: ReturnType<typeof useMockupStudio> }) {
  return (
    <div className="bg-brand-stone border border-white/10 rounded-md p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-7 w-7 rounded-full bg-brand-gold text-brand-dark grid place-items-center text-sm font-bold">3</span>
        <h2 className="font-display text-xl text-brand-light">Generate preview</h2>
      </div>
      <button type="button" onClick={s.generate}
        disabled={!s.photo || !s.hasMask || s.gen.kind === "loading"}
        className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2">
        {s.gen.kind === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
        ) : (
          <><Sparkles className="h-4 w-4" /> Generate mockup</>
        )}
      </button>
      {!s.photo && <p className="text-xs text-brand-light/50 mt-2 text-center">Upload a photo first.</p>}
      {s.photo && !s.hasMask && <p className="text-xs text-brand-light/50 mt-2 text-center">Paint over the area first.</p>}
      {s.gen.kind === "error" && (
        <div className="mt-3 flex items-start gap-2 text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-sm p-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 mt-px" />
          <span>{s.gen.message}</span>
        </div>
      )}
    </div>
  );
}

function ResultPanel({ beforeSrc, afterSrc, stoneName }: { beforeSrc: string; afterSrc: string; stoneName: string }) {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const downloadComparison = async () => {
    const loadImg = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Could not load image"));
        img.src = src;
      });
    const [before, after] = await Promise.all([loadImg(beforeSrc), loadImg(afterSrc)]);
    const cellW = Math.max(before.naturalWidth, after.naturalWidth);
    const cellH = Math.max(before.naturalHeight, after.naturalHeight);
    const gap = 16, labelH = 56, pad = 24;
    const totalW = cellW * 2 + gap + pad * 2;
    const totalH = cellH + labelH + pad * 2;
    const canvas = document.createElement("canvas");
    canvas.width = totalW; canvas.height = totalH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0F0F0F"; ctx.fillRect(0, 0, totalW, totalH);
    ctx.fillStyle = "#C13A35"; ctx.font = "bold 22px Inter, system-ui, sans-serif"; ctx.textBaseline = "top";
    ctx.fillText("BEFORE", pad + 4, pad + 4);
    ctx.fillText("AFTER", pad + cellW + gap + 4, pad + 4);
    ctx.fillStyle = "#FAFAF7"; ctx.font = "13px Inter, system-ui, sans-serif";
    ctx.fillText("Original photo", pad + 4, pad + 32);
    ctx.fillText(`${stoneName} — AI concept`, pad + cellW + gap + 4, pad + 32);
    ctx.drawImage(before, pad, pad + labelH, cellW, cellH);
    ctx.drawImage(after, pad + cellW + gap, pad + labelH, cellW, cellH);
    ctx.fillStyle = "#FAFAF7"; ctx.globalAlpha = 0.55; ctx.font = "11px Inter, system-ui, sans-serif";
    ctx.fillText("JL Masonry & Construction — AI concept render. Final installation will differ in real-world detail.", pad + 4, totalH - pad + 4);
    ctx.globalAlpha = 1;
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    if (downloadRef.current) {
      downloadRef.current.href = dataUrl;
      downloadRef.current.download = "jl-masonry-before-after.jpg";
      downloadRef.current.click();
    }
  };

  return (
    <div className="lg:col-span-2 bg-brand-stone border border-brand-gold/40 rounded-md p-5 mt-2">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <div className="eyebrow"><span className="h-px w-6 bg-brand-gold" />Before & After</div>
          <h2 className="font-display text-2xl text-brand-light mt-1">{stoneName} on your home</h2>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <a href={afterSrc} download="jl-masonry-mockup.png"
            className="inline-flex items-center gap-1.5 text-sm text-brand-light/80 hover:text-brand-gold border border-white/15 hover:border-brand-gold/60 px-3 py-2 rounded-sm transition">
            <Download className="h-4 w-4" />After only
          </a>
          <button type="button" onClick={downloadComparison}
            className="inline-flex items-center gap-1.5 text-sm text-brand-light/80 hover:text-brand-gold border border-white/15 hover:border-brand-gold/60 px-3 py-2 rounded-sm transition">
            <Download className="h-4 w-4" />Before / After
          </button>
          <a ref={downloadRef} className="hidden" />
          <button type="button" onClick={() => { if (typeof window !== "undefined") (window as any).__jlMockupImage = afterSrc; openQuoteModal(); }}
            className="btn-primary">Get a Real Quote →</button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <figure className="space-y-1.5">
          <figcaption className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-light/55 font-semibold">Before — original</figcaption>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={beforeSrc} alt="Original" className="w-full h-auto rounded-sm border border-white/5" />
        </figure>
        <figure className="space-y-1.5">
          <figcaption className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-gold font-semibold">After — {stoneName}</figcaption>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={afterSrc} alt={`AI preview of ${stoneName}`} className="w-full h-auto rounded-sm border border-brand-gold/30" />
        </figure>
      </div>
      <p className="text-xs text-brand-light/55 mt-4 italic text-center">
        This is an AI-generated concept render — the final installation by our crew will differ in real-world detail and finish.
      </p>
    </div>
  );
}
