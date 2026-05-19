"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  height?: number | string;
  className?: string;
  title?: string;
};

const FORM_ID = "Xsr3o2zQhIeWZNqQqd66";

/**
 * Defer the LeadConnector iframe (~2 MB including reCAPTCHA + libphonenumber)
 * until **after** the first paint so it doesn't drag LCP / TBT down.
 *
 * Mount the real iframe when ANY of these happen:
 *   1. The user interacts with the page (scroll / pointermove / keydown / touchstart)
 *   2. The form scrolls into the viewport
 *   3. 3.5 s pass without any of the above (idle fallback)
 *
 * Before mount we render a same-sized placeholder so layout doesn't shift.
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

    // Interaction-based trigger (user scrolled / moved / pressed)
    const events: Array<keyof WindowEventMap> = [
      "scroll",
      "pointermove",
      "keydown",
      "touchstart",
    ];
    events.forEach((e) =>
      window.addEventListener(e, trigger, { once: true, passive: true })
    );

    // Visibility-based trigger
    let io: IntersectionObserver | null = null;
    if (wrapperRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) trigger();
        },
        { rootMargin: "200px" }
      );
      io.observe(wrapperRef.current);
    }

    // Idle fallback
    const idleTimer = window.setTimeout(trigger, 3500);

    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
      io?.disconnect();
      window.clearTimeout(idleTimer);
    };
  }, [mount]);

  const sizeStyle = {
    width: "100%",
    height: typeof height === "number" ? `${height}px` : height,
    minHeight: typeof height === "number" ? `${height}px` : height,
    border: "none",
    borderRadius: "3px",
  } as const;

  return (
    <div ref={wrapperRef} className={className}>
      {mount ? (
        <iframe
          src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
          loading="lazy"
          style={sizeStyle}
          id={`inline-${FORM_ID}`}
          data-layout='{"id":"INLINE"}'
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Form 0"
          data-height="488"
          data-layout-iframe-id={`inline-${FORM_ID}`}
          data-form-id={FORM_ID}
          title={title}
        />
      ) : (
        <div
          style={sizeStyle}
          aria-label={title}
          className="grid place-items-center bg-gradient-to-br from-brand-stone/20 to-brand-stone/10 border border-brand-dark/5"
        >
          <div className="flex flex-col items-center gap-3 text-brand-gray">
            <div className="h-8 w-8 rounded-full border-2 border-brand-red/30 border-t-brand-red animate-spin" />
            <span className="text-xs uppercase tracking-[0.18em] font-semibold">
              Loading form…
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
