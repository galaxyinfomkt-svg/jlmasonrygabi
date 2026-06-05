"use client";

/**
 * VARIANT B — Single-column wizard
 *
 * Layout: one focused step at a time, full width. Progress dots at top.
 * Information hierarchy: only the current step is visible — no choice
 * paralysis. Stones are a horizontal carousel; controls are inline.
 * Primary affordance: a single big bottom button that contextually
 * changes ("Upload" → "Continue" → "Generate" → "Save").
 *
 * Different from A: no side panel, no stacked cards, no scrolling.
 * Different from C: no split-screen, no live preview during paint.
 */

import { useState } from "react";
import {
  Upload, Sparkles, Loader2, Download, Check, ArrowRight,
  Eraser, ChevronLeft, AlertCircle, Square,
} from "lucide-react";
import { openQuoteModal } from "../QuoteModal";
import { useMockupStudio, STONES } from "./useMockupStudio";

type Step = "upload" | "paint" | "stone" | "details" | "result";

export default function VariantB() {
  const s = useMockupStudio();
  const [step, setStep] = useState<Step>("upload");

  // Auto-advance when key transitions happen
  if (step === "upload" && s.photo) setStep("paint");
  if (step !== "result" && s.gen.kind === "done") setStep("result");

  const steps: { id: Step; label: string }[] = [
    { id: "upload", label: "Photo" },
    { id: "paint", label: "Select area" },
    { id: "stone", label: "Stone" },
    { id: "details", label: "Details" },
    { id: "result", label: "Result" },
  ];
  const currentIdx = steps.findIndex((x) => x.id === step);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress dots */}
      <ol className="flex items-center justify-between gap-2 mb-10">
        {steps.map((sx, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <li key={sx.id} className="flex-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (i <= currentIdx || (i === 1 && s.photo)) setStep(sx.id);
                }}
                className={`h-9 w-9 shrink-0 rounded-full grid place-items-center text-sm font-bold transition ${
                  done
                    ? "bg-brand-gold text-brand-dark"
                    : active
                      ? "bg-brand-gold/20 text-brand-gold ring-2 ring-brand-gold"
                      : "bg-brand-stone text-brand-light/40 border border-white/10"
                }`}
                aria-label={`Step ${i + 1}: ${sx.label}`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </button>
              <span className={`text-xs uppercase tracking-[0.15em] hidden md:inline ${active ? "text-brand-gold font-bold" : "text-brand-light/40"}`}>
                {sx.label}
              </span>
              {i < steps.length - 1 && <span className="flex-1 h-px bg-white/10" />}
            </li>
          );
        })}
      </ol>

      {/* Step body */}
      <div className="bg-brand-stone border border-white/10 rounded-md p-6 lg:p-10 min-h-[480px]">
        {step === "upload" && <UploadStep s={s} />}
        {step === "paint" && <PaintStep s={s} onBack={() => { s.reset(); setStep("upload"); }} onNext={() => setStep("stone")} />}
        {step === "stone" && <StoneStep s={s} onBack={() => setStep("paint")} onNext={() => setStep("details")} />}
        {step === "details" && <DetailsStep s={s} onBack={() => setStep("stone")} onGenerate={() => s.generate()} />}
        {step === "result" && s.gen.kind === "done" && s.photo && (
          <ResultStep
            beforeSrc={s.photo.src}
            afterSrc={s.gen.image}
            stoneName={s.selectedStone.name}
            onRestart={() => { s.reset(); setStep("upload"); }}
          />
        )}
        {step === "details" && s.gen.kind === "loading" && (
          <div className="absolute inset-0 bg-brand-dark/85 grid place-items-center rounded-md backdrop-blur">
            <div className="flex flex-col items-center gap-3 text-brand-light">
              <Loader2 className="h-10 w-10 animate-spin text-brand-gold" />
              <p className="font-display text-lg">Generating your preview…</p>
              <p className="text-sm text-brand-light/60">15–30 seconds</p>
            </div>
          </div>
        )}
        {s.gen.kind === "error" && step !== "result" && (
          <div className="mt-4 flex items-start gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-sm p-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-px" />
            <span>{s.gen.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadStep({ s }: { s: ReturnType<typeof useMockupStudio> }) {
  return (
    <label htmlFor="mockup-file-b" className="block cursor-pointer">
      <div className="aspect-[16/10] border-2 border-dashed border-brand-gold/30 hover:border-brand-gold/70 hover:bg-brand-gold/5 rounded-md flex flex-col items-center justify-center text-center p-8 transition">
        <div className="h-20 w-20 rounded-full bg-brand-gold/15 grid place-items-center text-brand-gold mb-4">
          <Upload className="h-9 w-9" />
        </div>
        <div className="font-display text-3xl text-brand-light mb-2">Start with a photo</div>
        <p className="text-brand-light/60 max-w-md mb-6">
          Snap or upload a clear daytime shot of the wall, façade or area you want to dress in stone.
        </p>
        <span className="btn-primary pointer-events-none text-base">Choose photo</span>
        <input id="mockup-file-b" ref={s.fileRef} type="file" accept="image/*" className="sr-only"
          onChange={(e) => s.onFile(e.target.files?.[0] ?? null)} />
      </div>
    </label>
  );
}

function PaintStep({ s, onBack, onNext }: { s: ReturnType<typeof useMockupStudio>; onBack: () => void; onNext: () => void }) {
  if (!s.photo) return null;
  return (
    <div>
      <div className="text-center mb-5">
        <h2 className="font-display text-2xl text-brand-light">Select where you want the stone</h2>
        <p className="text-sm text-brand-light/60 mt-1">Click & drag a rectangle over the wall, chimney or surface. Add as many rectangles as you need. Click a rectangle to remove it.</p>
      </div>
      <div className="relative w-full select-none rounded-sm overflow-hidden bg-black mb-4"
        style={{ aspectRatio: `${s.photo.w} / ${s.photo.h}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.photo.src} alt="Your home"
          className="block absolute inset-0 w-full h-full object-contain pointer-events-none"
          draggable={false} />
        <canvas ref={s.canvasRef} width={s.photo.w} height={s.photo.h}
          className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
          onPointerDown={s.onPointerDown} onPointerMove={s.onPointerMove}
          onPointerUp={s.onPointerUp} onPointerCancel={s.onPointerUp} />
      </div>
      <div className="flex items-center gap-3 flex-wrap mb-6">
        <div className="inline-flex items-center gap-1.5 text-sm text-brand-light/70 mr-auto">
          <Square className="h-4 w-4 text-brand-gold" />
          <span>
            <strong className="text-brand-light">{s.rects.length}</strong>{" "}
            area{s.rects.length === 1 ? "" : "s"} selected
          </span>
        </div>
        <button type="button" onClick={s.undoLast} disabled={s.rects.length === 0}
          className="inline-flex items-center gap-1.5 text-xs text-brand-light/70 hover:text-brand-gold border border-white/10 hover:border-brand-gold/60 px-3 py-1.5 rounded-sm transition disabled:opacity-40">
          Undo
        </button>
        <button type="button" onClick={s.clearMask} disabled={s.rects.length === 0}
          className="inline-flex items-center gap-1.5 text-xs text-brand-light/70 hover:text-brand-red border border-white/10 hover:border-brand-red/60 px-3 py-1.5 rounded-sm transition disabled:opacity-40">
          <Eraser className="h-3.5 w-3.5" />Clear
        </button>
      </div>
      <StepNav onBack={onBack} backLabel="New photo" onNext={onNext} nextDisabled={!s.hasMask} nextLabel="Continue" />
    </div>
  );
}

function StoneStep({ s, onBack, onNext }: { s: ReturnType<typeof useMockupStudio>; onBack: () => void; onNext: () => void }) {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl text-brand-light">Which stone?</h2>
        <p className="text-sm text-brand-light/60 mt-1">Tap a stone to see how it'll look. The first one is the actual stone for this job.</p>
      </div>
      {/* Big horizontal carousel-like grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {STONES.map((stone) => {
          const selected = stone.id === s.stoneId;
          return (
            <button key={stone.id} type="button" onClick={() => s.setStoneId(stone.id)}
              className={`relative rounded-md overflow-hidden border-2 transition ${selected ? "border-brand-gold ring-2 ring-brand-gold/40" : stone.featured ? "border-brand-gold/40" : "border-white/10 hover:border-white/30"}`}>
              {stone.swatchImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={stone.swatchImage} alt={stone.name} className="h-28 w-full object-cover" />
              ) : (
                <div className="h-28 w-full" style={{ background: stone.swatch }} aria-hidden="true" />
              )}
              <div className="p-2 bg-brand-dark/60 text-left">
                <div className="text-sm font-semibold text-brand-light leading-tight">{stone.name}</div>
              </div>
              {stone.featured && (
                <span className="absolute top-2 left-2 text-[0.55rem] uppercase tracking-[0.18em] bg-brand-gold text-brand-dark px-1.5 py-0.5 rounded-sm font-bold">This Job</span>
              )}
              {selected && (
                <span className="absolute top-2 right-2 h-6 w-6 rounded-full bg-brand-gold text-brand-dark grid place-items-center">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-brand-light/65 text-center mb-6 italic">{s.selectedStone.description}</p>
      <StepNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
  );
}

function DetailsStep({ s, onBack, onGenerate }: { s: ReturnType<typeof useMockupStudio>; onBack: () => void; onGenerate: () => void }) {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl text-brand-light">A few details (optional)</h2>
        <p className="text-sm text-brand-light/60 mt-1">Skip if you don't know — the AI will figure it out from the photo.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-6 max-w-2xl mx-auto">
        <div>
          <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Wall type</label>
          <select value={s.wallType} onChange={(e) => s.setWallType(e.target.value)}
            className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light outline-none">
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
            className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light outline-none">
            <option value="">Auto</option>
            <option value="right">Right side only</option>
            <option value="left">Left side only</option>
            <option value="both">Both sides</option>
          </select>
        </div>
        <div>
          <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Color tones</label>
          <input type="text" value={s.colorTones} onChange={(e) => s.setColorTones(e.target.value)}
            placeholder="gray and beige"
            className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light placeholder-brand-light/40 outline-none" />
        </div>
        <div>
          <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Height</label>
          <input type="text" value={s.wallHeight} onChange={(e) => s.setWallHeight(e.target.value)}
            placeholder="3 feet"
            className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light placeholder-brand-light/40 outline-none" />
        </div>
        <div>
          <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Length</label>
          <input type="text" value={s.wallLength} onChange={(e) => s.setWallLength(e.target.value)}
            placeholder="25 feet"
            className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light placeholder-brand-light/40 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 mb-1.5 font-semibold">Notes about the area</label>
          <textarea value={s.area} onChange={(e) => s.setArea(e.target.value)}
            placeholder="front wall around the entrance" rows={2}
            className="w-full bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-3 py-2 text-sm text-brand-light placeholder-brand-light/40 outline-none" />
        </div>
        <div className="md:col-span-2 border-t border-white/5 pt-3 mt-1 space-y-2.5">
          <div className="text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/50 font-semibold">
            Project features
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={s.hasSteps}
              onChange={(e) => s.setHasSteps(e.target.checked)}
              className="h-4 w-4 accent-brand-gold" />
            <span className="text-sm text-brand-light/80 flex items-center gap-2 flex-wrap">
              Stone steps up to the house
              {s.hasSteps && (
                <input type="text" inputMode="numeric" value={s.stepCount}
                  onChange={(e) => s.setStepCount(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="how many?"
                  className="w-24 bg-brand-dark/60 border border-white/10 focus:border-brand-gold/60 rounded-sm px-2 py-0.5 text-xs text-brand-light placeholder-brand-light/40 outline-none" />
              )}
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={s.hasTopLanding}
              onChange={(e) => s.setHasTopLanding(e.target.checked)}
              className="h-4 w-4 accent-brand-gold" />
            <span className="text-sm text-brand-light/80">Small landing / porch at the top of the steps</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={s.connectsToEntrance}
              onChange={(e) => s.setConnectsToEntrance(e.target.checked)}
              className="h-4 w-4 accent-brand-gold" />
            <span className="text-sm text-brand-light/80">Connects to existing front-door staircase</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={s.hasRailing}
              onChange={(e) => s.setHasRailing(e.target.checked)}
              className="h-4 w-4 accent-brand-gold" />
            <span className="text-sm text-brand-light/80">Stone railing / handrail post</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={s.includeLandscaping}
              onChange={(e) => s.setIncludeLandscaping(e.target.checked)}
              className="h-4 w-4 accent-brand-gold" />
            <span className="text-sm text-brand-light/80">Landscaping (mulch, plants, lighting)</span>
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
        <button type="button" onClick={onBack}
          className="text-sm text-brand-light/70 hover:text-brand-gold inline-flex items-center gap-1.5">
          <ChevronLeft className="h-4 w-4" />Back
        </button>
        <button type="button" onClick={onGenerate} disabled={s.gen.kind === "loading"}
          className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 disabled:opacity-50">
          <Sparkles className="h-5 w-5" />Generate my mockup
        </button>
      </div>
    </div>
  );
}

function StepNav({ onBack, backLabel = "Back", onNext, nextLabel = "Continue", nextDisabled = false }: { onBack: () => void; backLabel?: string; onNext: () => void; nextLabel?: string; nextDisabled?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button type="button" onClick={onBack}
        className="text-sm text-brand-light/70 hover:text-brand-gold inline-flex items-center gap-1.5">
        <ChevronLeft className="h-4 w-4" />{backLabel}
      </button>
      <button type="button" onClick={onNext} disabled={nextDisabled}
        className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
        {nextLabel}<ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ResultStep({ beforeSrc, afterSrc, stoneName, onRestart }: { beforeSrc: string; afterSrc: string; stoneName: string; onRestart: () => void }) {
  return (
    <div>
      <div className="text-center mb-6">
        <div className="eyebrow justify-center"><span className="h-px w-9 bg-brand-gold" />AI Preview<span className="h-px w-9 bg-brand-gold" /></div>
        <h2 className="font-display text-2xl text-brand-light mt-3">{stoneName} on your home</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-3 mb-6">
        <figure>
          <div className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-light/55 font-semibold mb-1.5">Before</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={beforeSrc} alt="Original" className="w-full h-auto rounded-sm border border-white/5" />
        </figure>
        <figure>
          <div className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-gold font-semibold mb-1.5">After</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={afterSrc} alt={`${stoneName} preview`} className="w-full h-auto rounded-sm border border-brand-gold/40" />
        </figure>
      </div>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <a href={afterSrc} download="jl-masonry-mockup.png"
          className="inline-flex items-center gap-1.5 text-sm text-brand-light/80 hover:text-brand-gold border border-white/15 hover:border-brand-gold/60 px-4 py-2.5 rounded-sm transition">
          <Download className="h-4 w-4" />Download
        </a>
        <button type="button" onClick={onRestart}
          className="text-sm text-brand-light/70 hover:text-brand-gold border border-white/10 hover:border-brand-gold/60 px-4 py-2.5 rounded-sm transition">
          Try another
        </button>
        <button type="button"
          onClick={() => { if (typeof window !== "undefined") (window as any).__jlMockupImage = afterSrc; openQuoteModal(); }}
          className="btn-primary">Get a Real Quote →</button>
      </div>
      <p className="text-xs text-brand-light/55 mt-4 italic text-center">
        AI-generated concept render — final installation will differ in real-world detail.
      </p>
    </div>
  );
}
