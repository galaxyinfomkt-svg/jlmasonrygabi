import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import SimplePage from "@/components/SimplePage";
import { site } from "@/lib/site";

// Destination for the GHL form redirect (GHL → form → On submit → redirect
// to https://jlmasonryma.com/thank-you). One URL = one conversion for GA4 /
// Meta once tracking is installed.
export const metadata: Metadata = {
  title: "Thank You | JL Masonry",
  description: "We got your estimate request.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <SimplePage title="Thanks — we got your request.">
      <p className="text-lg">We&apos;ll get back to you within one business day.</p>
      <p>
        Want to speed things up? Text a photo of the area to{" "}
        <a href="sms:+16179139845">{site.phone}</a>, or call us now.
      </p>
      <div className="pt-4 flex flex-wrap gap-3">
        <a href={site.phoneHref} className="btn-primary">
          <Phone className="h-4 w-4" /> Call {site.phone}
        </a>
        <Link href="/#gallery" className="btn-ghost">
          See our recent work
        </Link>
      </div>
    </SimplePage>
  );
}
