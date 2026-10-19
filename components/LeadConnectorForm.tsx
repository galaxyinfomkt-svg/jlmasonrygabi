"use client";

import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

type Props = {
  height?: number | string;
  /** Altura no celular. O form do GHL fica bem mais alto em tela estreita. */
  mobileHeight?: number | string;
  className?: string;
  title?: string;
};

const FORM_ID = "Xsr3o2zQhIeWZNqQqd66";

/**
 * Carrega o iframe do LeadConnector (~2 MB com reCAPTCHA + libphonenumber)
 * só depois da primeira pintura, para não derrubar LCP / TBT.
 *
 * Notas de robustez:
 *   - Não usamos os `data-*` do `form_embed.js`. Sem eles o script não acha
 *     o iframe e não consegue encolher para 0 px, que era o bug antigo.
 *     Em troca, o iframe não se redimensiona sozinho: por isso a altura no
 *     celular é maior, senão o form corta.
 *   - O painel de contato só aparece enquanto o iframe não carregou, ou se
 *     ele falhar de vez. Antes ele ficava pintado atrás para sempre, então
 *     qualquer falha virava uma caixa cinza com "Form taking a while?".
 *   - `isolation: isolate` + `translateZ(0)` no iframe evitam o iframe branco
 *     do Safari do iOS quando existe filtro/transform em algum ancestral.
 *   - NÃO envolva este componente em um elemento com `backdrop-filter`
 *     (`backdrop-blur-*` do Tailwind). No iOS isso faz o iframe não pintar.
 */
export default function LeadConnectorForm({
  height = 600,
  mobileHeight,
  className = "",
  title = "Request a Free Masonry Estimate",
}: Props) {
  const [mount, setMount] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mount) return;

    if (typeof window.matchMedia === "function") {
      setNarrow(window.matchMedia("(max-width: 640px)").matches);
    }

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

  // Se o iframe não avisar que carregou em 12s, assume falha e mostra o contato.
  useEffect(() => {
    if (!mount || loaded) return;
    const t = window.setTimeout(() => setFailed(true), 12000);
    return () => window.clearTimeout(t);
  }, [mount, loaded]);

  const base = typeof height === "number" ? `${height}px` : height;
  const mob = mobileHeight
    ? typeof mobileHeight === "number"
      ? `${mobileHeight}px`
      : mobileHeight
    : typeof height === "number"
      ? `${height + 200}px`
      : height;
  const heightCss = narrow ? mob : base;

  const mostrarPainel = !loaded || failed;

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      style={{ minHeight: heightCss, isolation: "isolate" }}
    >
      {/* Contato direto. Fica visível enquanto o form não carrega e, se ele
          falhar de vez, continua no lugar como saída para o visitante. */}
      {mostrarPainel && (
        <div
          className="absolute inset-0 grid place-items-center p-6 text-center"
          style={{ zIndex: 0 }}
        >
          <div className="flex flex-col items-center gap-3 text-brand-gray">
            {!failed && (
              <div className="h-8 w-8 rounded-full border-2 border-brand-red/30 border-t-brand-red animate-spin" />
            )}
            <span className="text-xs uppercase tracking-[0.18em] font-semibold">
              {failed ? "Form not loading?" : "Loading form…"}
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
      )}

      {mount && (
        <iframe
          src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
          onLoad={() => {
            setLoaded(true);
            setFailed(false);
          }}
          onError={() => setFailed(true)}
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: heightCss,
            minHeight: heightCss,
            border: "none",
            borderRadius: "3px",
            display: "block",
            // Transparente: sem faixa branca abaixo do form quando o iframe
            // reserva mais altura do que o form ocupa.
            background: "transparent",
            colorScheme: "normal",
            // Força camada própria: contorna o iframe em branco do iOS Safari.
            transform: "translateZ(0)",
          }}
          title={title}
        />
      )}
    </div>
  );
}
