import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import SimplePage from "@/components/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found | JL Masonry",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SimplePage title="We couldn't find that page.">
      <p className="text-lg">
        The link may be old or mistyped. Here&apos;s where to go next:
      </p>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/services">All masonry services</Link>
        </li>
        <li>
          <Link href="/locations">Towns we serve</Link>
        </li>
        <li>
          <Link href="/#contact">Request a free estimate</Link>
        </li>
      </ul>
      <div className="pt-4">
        <a href={site.phoneHref} className="btn-primary">
          <Phone className="h-4 w-4" /> Call {site.phone}
        </a>
      </div>
    </SimplePage>
  );
}
