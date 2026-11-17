import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | JL Masonry",
  description:
    "How JL Masonry & Construction collects, uses and protects the information you share with us.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <SimplePage title="Privacy Policy" updated="November 17, 2026">
      <p>
        {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains
        what we collect when you use jlmasonryma.com or contact us, and how we use it.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          Details you give us in our forms, by phone, text or email: name, phone number, email,
          address or town, and a description or photos of your project.
        </li>
        <li>
          Basic technical data your browser sends automatically, such as device type, pages visited
          and approximate location, which may be collected through cookies or analytics tools.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your request, schedule an estimate and send you a quote.</li>
        <li>To communicate about your project by phone, text message or email.</li>
        <li>To improve our website and understand which pages are useful.</li>
      </ul>

      <h2>Text messages (SMS)</h2>
      <p>
        If you give us your mobile number and agree to receive texts, we may send messages about
        your request, appointments and project. Message frequency varies. Message and data rates may
        apply. Reply <strong>STOP</strong> to opt out at any time, or <strong>HELP</strong> for help.
      </p>
      <p>
        <strong>
          No mobile information will be shared with third parties or affiliates for marketing or
          promotional purposes.
        </strong>{" "}
        Text messaging opt-in data and consent are not shared with any third party, except the
        service providers that deliver the messages for us.
      </p>

      <h2>Sharing</h2>
      <p>
        We do not sell your personal information. We share it only with service providers that help
        us run our business (for example, our CRM, form and messaging platforms and website
        hosting), and only as needed to provide those services, or when required by law.
      </p>

      <h2>Retention and security</h2>
      <p>
        We keep your information only as long as needed for the purposes above or as required by
        law, and we use reasonable safeguards to protect it.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete your information, or to stop contacting you, by
        emailing <a href={site.emailHref}>{site.email}</a> or calling{" "}
        <a href={site.phoneHref}>{site.phone}</a>.
      </p>

      <h2>Contact</h2>
      <p>
        {site.name} · {site.address.city}, {site.address.region} {site.address.postalCode} ·{" "}
        <a href={site.phoneHref}>{site.phone}</a> · <a href={site.emailHref}>{site.email}</a>
      </p>
    </SimplePage>
  );
}
