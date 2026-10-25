import Image from "next/image";
import { ArrowUpRight, Headphones, Music2 } from "lucide-react";
import type { Song, StreamingLinks } from "@/data/songs";

const platforms: { key: keyof StreamingLinks; label: string }[] = [
  { key: "spotify", label: "Spotify" },
  { key: "appleMusic", label: "Apple Music" },
  { key: "youtube", label: "YouTube" },
  { key: "bandcamp", label: "Bandcamp" },
];

export function StreamingButtons({ song }: { song: Song }) {
  const configured = platforms.filter(({ key }) => song.streaming[key]);
  return configured.length > 0 ? (
    <div className="streaming-links">
      {configured.map(({ key, label }) => (
        <a
          key={key}
          href={song.streaming[key]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      ))}
    </div>
  ) : (
    <p className="streaming-pending">
      <Headphones size={16} aria-hidden="true" />
      Streaming links coming soon
    </p>
  );
}

export function SongPlayer({ song }: { song: Song }) {
  if (song.audioSrc)
    return (
      <audio
        className="song-audio"
        controls
        preload="none"
        aria-label={`Listen to ${song.title}`}
        src={song.audioSrc}
      >
        Your browser does not support the audio player.
      </audio>
    );
  if (!song.embed) return null;
  const { provider, id } = song.embed;
  if (!/^[A-Za-z0-9_-]+$/.test(id)) return null;
  const src =
    provider === "spotify"
      ? `https://open.spotify.com/embed/track/${id}`
      : `https://www.youtube-nocookie.com/embed/${id}`;
  return (
    <iframe
      className={`song-embed ${provider}`}
      src={src}
      title={`${song.title} on ${provider === "spotify" ? "Spotify" : "YouTube"}`}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

export function SongArtwork({
  song,
  featured = false,
}: {
  song: Song;
  featured?: boolean;
}) {
  return (
    <div className={`song-artwork ${featured ? "featured-artwork" : ""}`}>
      <Image
        src={song.artwork}
        alt={song.artworkAlt}
        fill
        sizes={
          featured
            ? "(max-width: 760px) 90vw, 40vw"
            : "(max-width: 760px) 90vw, 44vw"
        }
      />
      <div className="artwork-scrim" />
      <span className="artwork-wordmark">PETRICHOR</span>
      {song.artworkIsPlaceholder && (
        <span className="artwork-label">Artwork placeholder</span>
      )}
      <div className="artwork-center">
        <span className="artwork-orbit">
          <Music2 size={32} strokeWidth={0.8} aria-hidden="true" />
        </span>
      </div>
      <span className="artwork-caption">THE SOUND OF WHAT COMES NEXT.</span>
    </div>
  );
}

export function SongCard({ song, index }: { song: Song; index: number }) {
  return (
    <article className="song-card">
      <SongArtwork song={song} />
      <div className="song-card-meta">
        <span className="eyebrow">
          0{index + 1} / {song.type}
        </span>
        <span
          className={`status-label ${song.status === "released" ? "released" : ""}`}
        >
          <span />
          {song.status === "released" ? "Out now" : "Coming soon"}
        </span>
      </div>
      <h2>{song.title}</h2>
      {song.isPlaceholder && (
        <p className="placeholder-note">Placeholder song information</p>
      )}
      {song.releaseDate && (
        <p className="release-date">
          {song.status === "released" ? "Released" : "Expected"}{" "}
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
            timeZone: "UTC",
          }).format(new Date(`${song.releaseDate}T12:00:00Z`))}
        </p>
      )}
      <p className="song-description">{song.description}</p>
      <SongPlayer song={song} />
      <StreamingButtons song={song} />
    </article>
  );
}
