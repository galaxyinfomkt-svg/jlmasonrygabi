import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use | JL Masonry",
  description: "Terms for using the JL Masonry & Construction website and our text message program.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <SimplePage title="Terms of Use" updated="November 17, 2026">
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use the
        site.
      </p>

      <h2>Website content</h2>
      <p>
        The information on this site, including price ranges, timelines and project examples, is
        general information and not a quote. Every project is priced after an on-site estimate, and
        only a written proposal from {site.name} sets the scope, price and schedule of your job.
      </p>

      <h2>Estimates and requests</h2>
      <p>
        Sending a form or calling us does not create a contract. We may decline a project or a
        service area at our discretion.
      </p>

      <h2>Text message program</h2>
      <ul>
        <li>
          Program: messages from {site.name} about your estimate request, appointments and project.
        </li>
        <li>Message frequency varies. Message and data rates may apply.</li>
        <li>
          Reply <strong>STOP</strong> to cancel at any time. You will get one message confirming you
          have been unsubscribed.
        </li>
        <li>
          Reply <strong>HELP</strong> for help, or call <a href={site.phoneHref}>{site.phone}</a>.
        </li>
        <li>Carriers are not liable for delayed or undelivered messages.</li>
        <li>
          See our <Link href="/privacy-policy">Privacy Policy</Link> for how we handle your
          information.
        </li>
      </ul>

      <h2>Photos and trademarks</h2>
      <p>
        Photos of our work, our name and logo belong to {site.name} and may not be reused without
        permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo;. To the extent allowed by law, {site.name} is not
        liable for damages arising from the use of this website. Work performed for you is governed
        by your written contract, not by this page.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms; the date above shows the latest version. Questions:{" "}
        <a href={site.emailHref}>{site.email}</a> or <a href={site.phoneHref}>{site.phone}</a>.
      </p>
    </SimplePage>
  );
}
