import {
  ArrowUpRight,
  Mail,
  MicVocal,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { PageIntro, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/data/siteConfig";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact & Booking",
  "Get in touch with Petrichor for booking, press, collaborations, and general questions.",
  "/contact",
);
const inquiries = [
  {
    title: "Booking & live shows",
    text: "A room, a festival, a night worth making noise for. Let’s talk dates.",
    subject: "Booking inquiry — Petrichor",
    icon: MicVocal,
  },
  {
    title: "Press & collaborations",
    text: "Interviews, creative projects, and ideas that could become something.",
    subject: "Press / collaboration — Petrichor",
    icon: Newspaper,
  },
  {
    title: "Everything else",
    text: "A question, a thought, or a simple hello. There’s room for that too.",
    subject: "Hello, Petrichor",
    icon: Sparkles,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="04 / A line is all it takes"
        title="Let’s make some noise"
      >
        For the next show, the next collaboration, or just a hello. We’d love to
        hear from you.
      </PageIntro>
      <section className="container contact-section">
        <Reveal className="contact-email-panel">
          <SectionLabel>Say hello</SectionLabel>
          <Mail size={35} strokeWidth={0.9} aria-hidden="true" />
          <a href={`mailto:${siteConfig.email}`} className="email-address">
            {siteConfig.email}
            <ArrowUpRight size={27} strokeWidth={1} aria-hidden="true" />
          </a>
          {siteConfig.emailIsPlaceholder && (
            <p className="placeholder-note">
              Placeholder address · Replace with your band’s booking email
              before launch.
            </p>
          )}
          <p className="email-caption">
            Straight to the band. A conversation starts here.
          </p>
          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Hello, Petrichor")}`}
            className="button button-primary"
          >
            Write to us
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
        <div className="inquiry-list">
          {inquiries.map(({ title, text, subject, icon: Icon }) => (
            <Reveal key={title}>
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`}
                className="inquiry-item"
              >
                <Icon size={23} strokeWidth={1.2} aria-hidden="true" />
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
                <ArrowUpRight size={21} strokeWidth={1} aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="container contact-social">
        <div>
          <SectionLabel>Elsewhere</SectionLabel>
          <h2>Keep us in your orbit.</h2>
          <p>Follow along for new sounds and the next announcement.</p>
        </div>
        <div>
          <SocialLinks />
          <p className="placeholder-note">
            Accounts will be linked when confirmed.
          </p>
        </div>
      </section>
    </>
  );
}
