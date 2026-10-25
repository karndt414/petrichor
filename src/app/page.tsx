import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { songs } from "@/data/songs";
import { shows } from "@/data/shows";
import { ButtonLink, Mark, SectionLabel, TextLink } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { SocialLinks } from "@/components/social-links";
import {
  SongArtwork,
  SongPlayer,
  StreamingButtons,
} from "@/components/song-card";
import { ShowSchedule } from "@/components/show-schedule";
import { ContactBanner } from "@/components/contact-banner";
import { Rain } from "@/components/rain";

export default function Home() {
  const featured = songs.find((song) => song.featured) || songs[0];
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src={siteConfig.images.hero}
          alt=""
          fill
          preload
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <Rain />
        <div className="rain-ripples" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-content container">
          <div className="hero-kicker">
            <span className="eyebrow">
              <span className="live-dot" />
              Independent sound. Heavy weather.
            </span>
            <span className="eyebrow hero-genre">INDIE / ALTERNATIVE ROCK</span>
          </div>
          <h1 id="hero-title">PETRICHOR</h1>
          <div className="hero-lower">
            <div>
              <p className="hero-tagline">{siteConfig.tagline}</p>
              {siteConfig.taglineIsPlaceholder && (
                <span className="hero-placeholder">
                  A placeholder for our next chapter.
                </span>
              )}
              <div className="hero-buttons">
                <Link href="/music" className="button button-primary">
                  <Play size={13} fill="currentColor" aria-hidden="true" />
                  Explore our music
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/shows" className="hero-shows">
                  Upcoming shows
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <a className="hero-scroll" href="#latest">
              <span>LET IT SINK IN</span>
              <ArrowDown size={20} strokeWidth={1} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-bottom container">
          <span className="eyebrow">The air after the rain.</span>
          <SocialLinks compact />
        </div>
      </section>

      <div className="definition-strip">
        <div className="container definition-inner">
          <p>
            <span>pet·ri·chor</span>
            <span className="definition-pronunciation">/ˈpeˌtrīkôr/</span>
            <span className="definition-type">noun</span>
          </p>
          <p>
            The familiar scent of earth after rain.
            <span className="definition-extra">
              {" "}
              A feeling, before it’s a sound.
            </span>
          </p>
          <Mark />
        </div>
      </div>

      {featured && (
        <section id="latest" className="section container latest-section">
          <Reveal className="section-heading">
            <SectionLabel number="01">From the quiet, a sound</SectionLabel>
            <TextLink href="/music">All music</TextLink>
          </Reveal>
          <div className="featured-grid">
            <Reveal className="featured-art-wrap">
              <SongArtwork song={featured} featured />
              <div className="artwork-corner" aria-hidden="true">
                ↗
              </div>
            </Reveal>
            <Reveal className="featured-copy" delay={0.08}>
              <span className="status-label">
                <span />
                {featured.status === "released"
                  ? "Latest release"
                  : "Something on the horizon"}
              </span>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              {featured.isPlaceholder && (
                <p className="placeholder-note">
                  Original song details coming soon · Placeholder content
                </p>
              )}
              <div className="featured-cta">
                <ButtonLink href="/music">Step into our sound</ButtonLink>
                <StreamingButtons song={featured} />
              </div>
              <SongPlayer song={featured} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section container home-shows">
        <Reveal className="section-heading">
          <div>
            <SectionLabel number="02">Better in a room together</SectionLabel>
            <h2>
              The next noise<span className="accent">.</span>
            </h2>
          </div>
          <TextLink href="/shows">All shows</TextLink>
        </Reveal>
        <Reveal>
          <ShowSchedule shows={shows} initialNow={Date.now()} preview />
        </Reveal>
      </section>

      <section className="home-about">
        <div className="home-about-image">
          <Image
            src={siteConfig.images.band}
            alt={siteConfig.images.bandAlt}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="image-darken" />
          {siteConfig.images.bandIsPlaceholder && (
            <span className="photo-placeholder">
              Band photograph placeholder
            </span>
          )}
          <span className="image-coordinate">A PLACE FOR THE FEELING.</span>
        </div>
        <Reveal className="home-about-copy">
          <SectionLabel number="03">The people behind the sound</SectionLabel>
          <h2>
            A little earth.
            <br />A little electricity.
          </h2>
          <p>{siteConfig.about}</p>
          <p className="home-about-small">{siteConfig.intro}</p>
          <TextLink href="/about">Meet Petrichor</TextLink>
        </Reveal>
      </section>
      <ContactBanner />
    </>
  );
}
