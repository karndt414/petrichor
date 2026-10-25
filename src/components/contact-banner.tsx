import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "./motion";
import { SectionLabel } from "./ui";

export function ContactBanner() {
  return (
    <section className="contact-banner">
      <Reveal className="container contact-banner-inner">
        <div>
          <SectionLabel>Make a little noise</SectionLabel>
          <h2>
            Good things start
            <br />
            with a conversation.
          </h2>
        </div>
        <Link
          href="/contact"
          className="contact-circle"
          aria-label="Contact Petrichor"
        >
          <ArrowUpRight size={35} strokeWidth={1} />
        </Link>
      </Reveal>
    </section>
  );
}
