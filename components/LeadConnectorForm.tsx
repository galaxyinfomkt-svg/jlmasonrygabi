"use client";

import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

type Props = {
  height?: number | string;
  className?: string;
  title?: string;
};

const FORM_ID = "Xsr3o2zQhIeWZNqQqd66";

/**
 * Defer the LeadConnector iframe (~2 MB including reCAPTCHA + libphonenumber)
 * until after the first paint so it doesn't drag LCP / TBT down.
 *
 * Robustness notes:
 *   - The outer wrapper holds an explicit min-height. Even if LeadConnector's
 *     `form_embed.js` script collapses the iframe to 0 px (which has happened
 *     on some networks where the iframe's reCAPTCHA handshake fails), the
 *     surrounding layout stays intact.
 *   - A fallback panel ("Trouble loading? Call us") sits behind the iframe
 *     and becomes visible if the iframe is missing or transparent.
 *   - We intentionally drop the `data-*` attributes that `form_embed.js`
 *     uses to find and resize the iframe, so the script can no longer
 *     shrink it. The iframe keeps its declared height.
 */
export default function LeadConnectorForm({
  height = 600,
  className = "",
  title = "Request a Free Masonry Estimate",
}: Props) {
  const [mount, setMount] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mount) return;

    const trigger = () => setMount(true);

    const events: Array<keyof WindowEventMap> = [
      "scroll",
      "pointermove",
      "keydown",
      "touchstart",
    ];
    events.forEach((e) =>
      window.addEventListener(e, trigger, { once: true, passive: true }),
    );

    let io: IntersectionObserver | null = null;
    if (wrapperRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) trigger();
        },
        { rootMargin: "200px" },
      );
      io.observe(wrapperRef.current);
    }

    const idleTimer = window.setTimeout(trigger, 3500);

    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
      io?.disconnect();
      window.clearTimeout(idleTimer);
    };
  }, [mount]);

  const heightCss = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      style={{ minHeight: heightCss }}
    >
      {/* Fallback panel — sits behind the iframe. Visible whenever the
          iframe is missing, blocked, or collapsed by form_embed.js. */}
      <div
        className="absolute inset-0 grid place-items-center p-6 text-center bg-gradient-to-br from-brand-stone/10 to-transparent border border-brand-dark/5 rounded-sm"
        style={{ zIndex: 0 }}
        aria-hidden={mount ? "true" : "false"}
      >
        <div className="flex flex-col items-center gap-3 text-brand-gray">
          {!mount && (
            <div className="h-8 w-8 rounded-full border-2 border-brand-red/30 border-t-brand-red animate-spin" />
          )}
          <span className="text-xs uppercase tracking-[0.18em] font-semibold">
            {mount ? "Form taking a while?" : "Loading form…"}
          </span>
          <div className="text-xs text-brand-gray/85 leading-relaxed max-w-xs">
            <p>You can also reach us directly:</p>
            <p className="mt-2">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-1.5 text-brand-red font-bold hover:text-brand-red-deep transition"
              >
                <Phone className="h-3.5 w-3.5" />
                {site.phone}
              </a>
            </p>
            <p className="mt-1">
              <a
                href={site.emailHref}
                className="text-brand-red font-bold hover:text-brand-red-deep transition break-all"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      {mount && (
        <iframe
          src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
          loading="lazy"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: heightCss,
            minHeight: heightCss,
            border: "none",
            borderRadius: "3px",
            display: "block",
            background: "white",
          }}
          title={title}
        />
      )}
    </div>
  );
}
