import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = {
  imageDataUrl?: string;
  maskDataUrl?: string;
  width?: number;
  height?: number;
  stone?: { name?: string; prompt?: string };
  wallType?: string;
  wallHeight?: string;
  wallLength?: string;
  colorTones?: string;
  includeLandscaping?: boolean;
  hasSteps?: boolean;
  stepCount?: string;
  hasRailing?: boolean;
  wallSide?: "" | "left" | "right" | "both";
  hasTopLanding?: boolean;
  connectsToEntrance?: boolean;
  area?: string;
};

// Cloudflare Workers AI — Stable Diffusion 1.5 inpainting.
// Docs: https://developers.cloudflare.com/workers-ai/models/stable-diffusion-v1-5-inpainting/
const CF_MODEL = "@cf/runwayml/stable-diffusion-v1-5-inpainting";

function decodeDataUrl(dataUrl: string): Uint8Array | null {
  const m = /^data:[^;]+;base64,(.+)$/.exec(dataUrl);
  if (!m) return null;
  try {
    return new Uint8Array(Buffer.from(m[1], "base64"));
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const accountId = process.env.CF_ACCOUNT_ID;
  const apiToken = process.env.CF_API_TOKEN;
  if (!accountId || !apiToken) {
    return NextResponse.json(
      {
        error:
          "Server is missing CF_ACCOUNT_ID and/or CF_API_TOKEN. Add them to .env.local and restart the dev server.",
      },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!body.imageDataUrl || !body.maskDataUrl) {
    return NextResponse.json(
      { error: "Image and mask are required." },
      { status: 400 },
    );
  }
  if (!body.width || !body.height) {
    return NextResponse.json(
      { error: "Image dimensions are required." },
      { status: 400 },
    );
  }

  const imgBytes = decodeDataUrl(body.imageDataUrl);
  const maskBytes = decodeDataUrl(body.maskDataUrl);
  if (!imgBytes || !maskBytes) {
    return NextResponse.json(
      { error: "Image / mask must be base64 data URLs." },
      { status: 400 },
    );
  }

  const stonePrompt = body.stone?.prompt ?? "natural stone veneer";
  const wallType = (body.wallType || "").trim();
  const wallHeight = (body.wallHeight || "").trim();
  const wallLength = (body.wallLength || "").trim();
  const colorTones = (body.colorTones || "").trim();
  const landscaping = !!body.includeLandscaping;
  const wantSteps = !!body.hasSteps;
  const stepCount = (body.stepCount || "").trim();
  const wantRailing = !!body.hasRailing;
  const wallSide = (body.wallSide || "").trim();
  const wantTopLanding = !!body.hasTopLanding;
  const connectsToEntrance = !!body.connectsToEntrance;
  const userArea = (body.area || "").trim();

  const promptParts: string[] = [];
  promptParts.push(stonePrompt);
  if (wallType) promptParts.push(`${wallType} on a residential home exterior`);
  else promptParts.push("stone cladding on a residential home exterior");
  if (wallSide === "left" || wallSide === "right") {
    promptParts.push(
      `installed only on the ${wallSide} side of the property, no symmetrical wall on the opposite side`,
    );
  } else if (wallSide === "both") {
    promptParts.push("installed symmetrically on both sides of the property");
  }
  if (wallHeight) promptParts.push(`approximately ${wallHeight} tall`);
  if (wallLength) promptParts.push(`extending around ${wallLength}`);
  if (colorTones) promptParts.push(`color palette: ${colorTones}`);
  if (wantSteps) {
    const count = stepCount || "several";
    promptParts.push(
      `with ${count} matching stone steps rising up to the home entrance`,
    );
  }
  if (wantTopLanding) {
    promptParts.push(
      "with a small flat stone landing / porch at the top of the steps",
    );
  }
  if (connectsToEntrance) {
    promptParts.push(
      "the steps tying directly into the existing front-door staircase of the house",
    );
  }
  if (wantRailing) {
    promptParts.push(
      "with a stone-faced railing / handrail post connecting to the front of the house",
    );
  }
  if (userArea) promptParts.push(userArea);
  if (landscaping)
    promptParts.push(
      "with tasteful landscaping at the base — mulch bed, low plants and accent lighting",
    );
  promptParts.push(
    "professional contractor presentation, photorealistic, sharp focus, even daylight, natural shadows, clean edges, realistic mortar joints, matching the building's perspective and scale, architectural photography",
  );
  const prompt = promptParts.join(", ");

  const negativePrompt =
    "blurry, distorted, deformed, warped perspective, low quality, cartoon, painting, illustration, sketch, text, watermark, fake, plastic, oversaturated, floating stones, hovering, repetitive pattern";

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(
    accountId,
  )}/ai/run/${CF_MODEL}`;

  // Cloudflare renamed `mask` → `mask_image` in the SD 1.5 inpainting
  // schema — the old name now silently fails with "missing required
  // input mask_image". We send both for forward-compat in case the
  // schema flips back.
  const requestBody = {
    prompt,
    negative_prompt: negativePrompt,
    image: Array.from(imgBytes),
    image_b64: Buffer.from(imgBytes).toString("base64"),
    mask: Array.from(maskBytes),
    mask_image: Array.from(maskBytes),
    width: body.width,
    height: body.height,
    num_steps: 20,
    guidance: 8.5,
    strength: 1,
  };

  let cfRes: Response;
  try {
    cfRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the AI service. Try again." },
      { status: 502 },
    );
  }

  if (!cfRes.ok) {
    let detail = "";
    try {
      const errJson = await cfRes.json();
      detail =
        errJson?.errors?.[0]?.message ||
        errJson?.error ||
        errJson?.messages?.[0]?.message ||
        JSON.stringify(errJson);
    } catch {
      detail = await cfRes.text().catch(() => "");
    }
    return NextResponse.json(
      {
        error: `AI service returned ${cfRes.status}. ${String(detail).slice(0, 400)}`,
      },
      { status: 502 },
    );
  }

  // Cloudflare returns the raw PNG bytes for image models.
  const contentType = cfRes.headers.get("content-type") || "";
  if (contentType.startsWith("image/")) {
    const buf = Buffer.from(await cfRes.arrayBuffer());
    return NextResponse.json({
      image: `data:${contentType};base64,${buf.toString("base64")}`,
    });
  }

  // Fallback: some accounts get a JSON-wrapped response.
  try {
    const j = await cfRes.json();
    const b64 =
      j?.result?.image ||
      j?.result?.[0]?.image ||
      (Array.isArray(j?.result) ? null : null);
    if (typeof b64 === "string") {
      return NextResponse.json({
        image: b64.startsWith("data:")
          ? b64
          : `data:image/png;base64,${b64}`,
      });
    }
  } catch {}

  return NextResponse.json(
    { error: "AI returned an unexpected response format." },
    { status: 502 },
  );
}
