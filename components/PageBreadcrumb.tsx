import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; href?: string };

export default function PageBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="container-edge pt-28 lg:pt-32"
    >
      <ol className="flex items-center flex-wrap gap-2 text-xs lg:text-sm text-brand-light/55">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-brand-gold transition"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 text-brand-light/30" />
            {c.href ? (
              <Link href={c.href} className="hover:text-brand-gold transition">
                {c.label}
              </Link>
            ) : (
              <span className="text-brand-light/85 font-medium">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
