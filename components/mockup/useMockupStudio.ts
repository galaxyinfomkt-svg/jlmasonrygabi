"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useMockupStudio — shared state + interaction logic for the /mockup
 * variants. The area-selection mechanic is RECTANGLE-based:
 *   - drag a rectangle to mark a region for stone
 *   - click inside an existing rectangle to remove it
 *   - undo/clear via dedicated buttons
 *
 * Rectangles fit the masonry use-case (walls, chimneys, patios,
 * retaining walls — all rectangular by nature) far better than a
 * paint-brush mask, which is hard to control with mouse/finger and
 * produces noisy edges that make the AI hallucinate.
 */

export type Stone = {
  id: string;
  name: string;
  description: string;
  prompt: string;
  swatch: string;
  swatchImage?: string;
  featured?: boolean;
};

export const STONES: Stone[] = [
  {
    id: "project-stone",
    name: "Project Stone — JL",
    description:
      "The actual stone JL Masonry will install on this project — rounded, warm grey & beige fieldstone with recessed mortar joints.",
    prompt:
      "natural rounded weathered fieldstone veneer wall, mixed warm grey, tan and beige irregular stones of varied sizes, recessed mortar joints, rustic New England dry-stack style, hand-laid masonry, sun-warmed natural stone, photorealistic exterior",
    swatch: "linear-gradient(135deg,#7a6f5e 0%,#5a5045 100%)",
    swatchImage: "/assets/project-stone.jpg",
    featured: true,
  },
  {
    id: "fieldstone",
    name: "Natural Fieldstone",
    description: "Rough, irregular New England stones — the classic look.",
    prompt:
      "natural New England fieldstone veneer, irregular grey-brown stones, varied sizes, rugged mortar joints, hand-laid dry-stack",
    swatch:
      "linear-gradient(135deg,#6b6256 0%,#8a7f6e 35%,#4f4a40 70%,#7a6f5e 100%)",
  },
  {
    id: "stacked-veneer",
    name: "Stacked Stone Veneer",
    description: "Tight horizontal courses — modern, clean.",
    prompt:
      "modern stacked stone veneer, tight horizontal courses, slim ledgestone, mixed grey and charcoal, minimal mortar",
    swatch:
      "linear-gradient(180deg,#5a5a5a 0%,#7d7d7d 25%,#4a4a4a 50%,#6f6f6f 75%,#3e3e3e 100%)",
  },
  {
    id: "bluestone",
    name: "Bluestone",
    description: "Flat blue-grey stone — patios and walkways.",
    prompt:
      "bluestone paving, flat blue-grey rectangular stones, natural cleft surface, thin mortar joints",
    swatch:
      "linear-gradient(135deg,#4a5a6b 0%,#6b7d8f 40%,#3d4a5a 80%,#5a6c7e 100%)",
  },
  {
    id: "red-brick",
    name: "Red Brick",
    description: "Classic running-bond red brick.",
    prompt:
      "classic red brick veneer, running bond pattern, warm red-brown bricks, neat grey mortar",
    swatch:
      "linear-gradient(180deg,#8c3a2a 0%,#a64a35 33%,#7a3225 66%,#9a4232 100%)",
  },
  {
    id: "cobblestone",
    name: "Cobblestone",
    description: "Rounded antique pavers — driveways and borders.",
    prompt:
      "antique cobblestone paving, rounded granite cobbles, varied grey tones, sand-swept joints",
    swatch:
      "radial-gradient(circle at 30% 30%,#7a7a7a 0%,#555 30%,#3e3e3e 60%,#666 90%)",
  },
  {
    id: "granite-block",
    name: "Granite Block",
    description: "Solid cut granite blocks — bold and permanent.",
    prompt:
      "cut granite block veneer, large rectangular charcoal-grey stones, subtle speckled texture, precise mortar joints",
    swatch:
      "linear-gradient(135deg,#3a3a3a 0%,#5a5a5a 50%,#2e2e2e 100%)",
  },
  {
    id: "limestone",
    name: "Limestone",
    description: "Soft cream tones — elegant and warm.",
    prompt:
      "limestone veneer, soft cream and beige tones, ashlar pattern, smooth honed finish, fine mortar joints",
    swatch:
      "linear-gradient(135deg,#d6c9a8 0%,#b8a883 40%,#e2d6b8 75%,#c0b08a 100%)",
  },
  {
    id: "slate",
    name: "Slate",
    description: "Deep charcoal layered slate.",
    prompt:
      "natural slate veneer, deep charcoal and dark grey layered stones, thin courses, riven surface texture",
    swatch:
      "linear-gradient(180deg,#2a2f33 0%,#4a5258 30%,#1f2428 60%,#3a4248 100%)",
  },
];

export type GenState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; image: string }
  | { kind: "error"; message: string };

export type Rect = { x: number; y: number; w: number; h: number };

const MAX_INPUT_BYTES = 12 * 1024 * 1024;
const MAX_LONG_SIDE = 768;
const MIN_SIDE = 256;
const MIN_RECT_PX = 12; // ignore accidental clicks smaller than this

async function resizeImage(
  src: string,
): Promise<{ dataUrl: string; w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const ow = img.naturalWidth;
      const oh = img.naturalHeight;
      const longest = Math.max(ow, oh);
      let scale = longest > MAX_LONG_SIDE ? MAX_LONG_SIDE / longest : 1;
      const shortest = Math.min(ow, oh);
      if (shortest * scale < MIN_SIDE) scale = MIN_SIDE / shortest;
      const roundTo = (v: number) =>
        Math.max(MIN_SIDE, Math.round(v / 64) * 64);
      let w = roundTo(ow * scale);
      let h = roundTo(oh * scale);
      w = Math.min(w, MAX_LONG_SIDE);
      h = Math.min(h, MAX_LONG_SIDE);
      const targetAspect = w / h;
      const sourceAspect = ow / oh;
      let sx = 0, sy = 0, sw = ow, sh = oh;
      if (sourceAspect > targetAspect) {
        sw = oh * targetAspect;
        sx = (ow - sw) / 2;
      } else if (sourceAspect < targetAspect) {
        sh = ow / targetAspect;
        sy = (oh - sh) / 2;
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D not supported"));
        return;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      resolve({ dataUrl: canvas.toDataURL("image/png"), w, h });
    };
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = src;
  });
}

function rectContains(r: Rect, x: number, y: number): boolean {
  return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
}

export function useMockupStudio() {
  const [photo, setPhoto] = useState<{
    src: string;
    w: number;
    h: number;
  } | null>(null);
  const [rects, setRects] = useState<Rect[]>([]);
  const [draftRect, setDraftRect] = useState<Rect | null>(null);
  const draftStartRef = useRef<{ x: number; y: number } | null>(null);

  const [stoneId, setStoneId] = useState<string>(STONES[0].id);
  const [wallType, setWallType] = useState<string>("decorative veneer");
  const [wallHeight, setWallHeight] = useState<string>("");
  const [wallLength, setWallLength] = useState<string>("");
  const [colorTones, setColorTones] = useState<string>("");
  const [includeLandscaping, setIncludeLandscaping] = useState<boolean>(false);
  // Architectural extras commonly requested with stone retaining walls
  const [hasSteps, setHasSteps] = useState<boolean>(false);
  const [stepCount, setStepCount] = useState<string>("");
  const [hasRailing, setHasRailing] = useState<boolean>(false);
  // Extras specific to the current JL Masonry job: wall on one side
  // only, small landing at the top of the steps, and the steps tying
  // into the existing front-door staircase
  const [wallSide, setWallSide] = useState<"" | "left" | "right" | "both">("");
  const [hasTopLanding, setHasTopLanding] = useState<boolean>(false);
  const [connectsToEntrance, setConnectsToEntrance] = useState<boolean>(false);
  const [area, setArea] = useState<string>("");
  const [gen, setGen] = useState<GenState>({ kind: "idle" });

  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedStone = STONES.find((s) => s.id === stoneId) ?? STONES[0];

  const onFile = useCallback(async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setGen({ kind: "error", message: "Please upload an image file." });
      return;
    }
    if (file.size > MAX_INPUT_BYTES) {
      setGen({
        kind: "error",
        message: "Image is too large. Please use one under 12 MB.",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result;
      if (typeof result !== "string") return;
      try {
        const resized = await resizeImage(result);
        setPhoto({ src: resized.dataUrl, w: resized.w, h: resized.h });
        setRects([]);
        setDraftRect(null);
        setGen({ kind: "idle" });
      } catch {
        setGen({
          kind: "error",
          message: "Could not read the image. Try a different file.",
        });
      }
    };
    reader.readAsDataURL(file);
  }, []);

  // Redraw rectangles overlay whenever the selection changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !photo) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawRect = (r: Rect, fillAlpha: number, dashed: boolean) => {
      ctx.fillStyle = `rgba(193, 58, 53, ${fillAlpha})`;
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.lineWidth = Math.max(2, canvas.width / 320);
      if (dashed) {
        const d = Math.max(6, canvas.width / 90);
        ctx.setLineDash([d, d]);
      }
      ctx.strokeRect(r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1);
      ctx.setLineDash([]);
    };

    for (const r of rects) drawRect(r, 0.4, false);
    if (draftRect) drawRect(draftRect, 0.25, true);
  }, [rects, draftRect, photo]);

  const eventToCanvas = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!photo) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pt = eventToCanvas(e);
    if (!pt) return;

    // Click inside an existing rect → remove that rect.
    const hitIdx = rects.findIndex((r) => rectContains(r, pt.x, pt.y));
    if (hitIdx >= 0) {
      setRects((prev) => prev.filter((_, i) => i !== hitIdx));
      draftStartRef.current = null;
      return;
    }

    // Otherwise start drawing a new rect.
    canvas.setPointerCapture(e.pointerId);
    draftStartRef.current = pt;
    setDraftRect({ x: pt.x, y: pt.y, w: 0, h: 0 });
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draftStartRef.current) return;
    const pt = eventToCanvas(e);
    if (!pt) return;
    const start = draftStartRef.current;
    setDraftRect({
      x: Math.min(start.x, pt.x),
      y: Math.min(start.y, pt.y),
      w: Math.abs(pt.x - start.x),
      h: Math.abs(pt.y - start.y),
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      canvasRef.current?.releasePointerCapture(e.pointerId);
    } catch {}
    if (
      draftRect &&
      draftRect.w >= MIN_RECT_PX &&
      draftRect.h >= MIN_RECT_PX
    ) {
      setRects((prev) => [...prev, draftRect]);
    }
    setDraftRect(null);
    draftStartRef.current = null;
  };

  const clearMask = () => setRects([]);
  const undoLast = () => setRects((prev) => prev.slice(0, -1));
  const reset = () => {
    setPhoto(null);
    setRects([]);
    setDraftRect(null);
    setGen({ kind: "idle" });
    if (fileRef.current) fileRef.current.value = "";
  };

  const buildMaskDataUrl = (): string | null => {
    if (!photo || rects.length === 0) return null;
    const c = document.createElement("canvas");
    c.width = photo.w;
    c.height = photo.h;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "white";
    for (const r of rects) ctx.fillRect(r.x, r.y, r.w, r.h);
    return c.toDataURL("image/png");
  };

  const hasMask = rects.length > 0;

  const generate = async () => {
    if (!photo) return;
    if (!hasMask) {
      setGen({
        kind: "error",
        message: "Draw a rectangle over the area where you want the stone first.",
      });
      return;
    }
    const mask = buildMaskDataUrl();
    if (!mask) {
      setGen({ kind: "error", message: "Could not build the mask. Try again." });
      return;
    }
    setGen({ kind: "loading" });
    try {
      const res = await fetch("/api/mockup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageDataUrl: photo.src,
          maskDataUrl: mask,
          width: photo.w,
          height: photo.h,
          stone: { name: selectedStone.name, prompt: selectedStone.prompt },
          wallType: wallType.trim(),
          wallHeight: wallHeight.trim(),
          wallLength: wallLength.trim(),
          colorTones: colorTones.trim(),
          includeLandscaping,
          hasSteps,
          stepCount: stepCount.trim(),
          hasRailing,
          wallSide,
          hasTopLanding,
          connectsToEntrance,
          area: area.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.image) {
        setGen({
          kind: "error",
          message:
            data?.error || "The AI couldn't generate a preview. Try again.",
        });
        return;
      }
      setGen({ kind: "done", image: data.image });
    } catch {
      setGen({
        kind: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        const t = e.target as HTMLElement | null;
        if (
          t &&
          (t.tagName === "INPUT" ||
            t.tagName === "TEXTAREA" ||
            t.tagName === "SELECT")
        )
          return;
        e.preventDefault();
        undoLast();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return {
    photo,
    rects,
    draftRect,
    stoneId,
    setStoneId,
    wallType,
    setWallType,
    wallHeight,
    setWallHeight,
    wallLength,
    setWallLength,
    colorTones,
    setColorTones,
    includeLandscaping,
    setIncludeLandscaping,
    hasSteps,
    setHasSteps,
    stepCount,
    setStepCount,
    hasRailing,
    setHasRailing,
    wallSide,
    setWallSide,
    hasTopLanding,
    setHasTopLanding,
    connectsToEntrance,
    setConnectsToEntrance,
    area,
    setArea,
    gen,
    fileRef,
    canvasRef,
    selectedStone,
    onFile,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    clearMask,
    undoLast,
    reset,
    generate,
    hasMask,
  };
}
