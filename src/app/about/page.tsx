import Image from "next/image";
import { ArrowUpRight, UserRound } from "lucide-react";
import { PageIntro, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ContactBanner } from "@/components/contact-banner";
import { members } from "@/data/members";
import { siteConfig } from "@/data/siteConfig";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "Meet Petrichor: an indie / alternative rock band. Our story, our sound, and the people behind the music.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="03 / The people behind it"
        title="Earth. Air. Electricity"
      >
        A name borrowed from nature. A sound that’s entirely our own.
      </PageIntro>
      <div className="container">
        <Reveal className="band-photo">
          <Image
            src={siteConfig.images.band}
            alt={siteConfig.images.bandAlt}
            fill
            sizes="90vw"
            preload
          />
          <div className="image-darken" />
          <span className="band-photo-word">THE SPACE BETWEEN.</span>
          {siteConfig.images.bandIsPlaceholder && (
            <span className="photo-placeholder">
              Full-band photograph placeholder
            </span>
          )}
        </Reveal>
        <Reveal className="band-story">
          <SectionLabel>The story, so far</SectionLabel>
          <div>
            <h2>{siteConfig.intro}</h2>
            <p>{siteConfig.about}</p>
            <div className="story-details">
              <div>
                <h3>Where it began</h3>
                <p>{siteConfig.background}</p>
              </div>
              <div>
                <h3>What moves us</h3>
                <p>{siteConfig.influences}</p>
              </div>
            </div>
            {siteConfig.biographyIsPlaceholder && (
              <p className="placeholder-note">
                Band history and influences are placeholders awaiting your
                story.
              </p>
            )}
          </div>
        </Reveal>
        <section className="members-section">
          <div className="section-heading">
            <div>
              <SectionLabel>The lineup</SectionLabel>
              <h2>
                Different people.
                <br />
                One weather system.
              </h2>
            </div>
            <span className="eyebrow">Meet the band</span>
          </div>
          <div className="member-list">
            {members.map((member, index) => (
              <Reveal
                className={`member-row ${index % 2 ? "member-reversed" : ""}`}
                key={member.id}
              >
                <div className="member-photo">
                  {member.photograph ? (
                    <Image
                      src={member.photograph}
                      alt={member.name}
                      fill
                      sizes="(max-width: 760px) 90vw, 36vw"
                    />
                  ) : (
                    <>
                      <UserRound
                        size={52}
                        strokeWidth={0.7}
                        aria-hidden="true"
                      />
                      <span className="eyebrow">Portrait placeholder</span>
                      <span className="member-photo-number" aria-hidden="true">
                        0{index + 1}
                      </span>
                    </>
                  )}
                </div>
                <div className="member-copy">
                  <SectionLabel>
                    0{index + 1} / {member.role}
                  </SectionLabel>
                  <h3>{member.name}</h3>
                  {member.isPlaceholder && (
                    <p className="placeholder-note">
                      Name, role & biography placeholder
                    </p>
                  )}
                  <p>{member.bio}</p>
                  {member.social && (
                    <a
                      className="text-link"
                      href={member.social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {member.social.label}
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
      <ContactBanner />
    </>
  );
}
