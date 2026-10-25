"use client";

import { useState } from "react";
import { Disc3 } from "lucide-react";
import type { Song } from "@/data/songs";
import { SongCard } from "./song-card";
import { Reveal } from "./motion";

type Filter = "all" | "released" | "coming-soon";
export function MusicCatalog({ songs }: { songs: Song[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = songs.filter(
    (song) => filter === "all" || song.status === filter,
  );
  return (
    <section className="container catalog-section" aria-label="Original songs">
      <div className="catalog-toolbar">
        <div className="filter-buttons" aria-label="Filter music">
          {(
            [
              { id: "all", label: "All music" },
              { id: "released", label: "Released" },
              { id: "coming-soon", label: "Coming soon" },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
            >
              {label}
              <span>
                {songs
                  .filter((s) => id === "all" || s.status === id)
                  .length.toString()
                  .padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
        <span className="eyebrow catalog-note">Made to be felt.</span>
      </div>
      <div aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "song" : "songs"} shown
      </div>
      {visible.length ? (
        <div className="song-grid">
          {visible.map((song) => (
            <Reveal key={song.id}>
              <SongCard song={song} index={songs.indexOf(song)} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Disc3 size={44} strokeWidth={0.8} aria-hidden="true" />
          <h2>The first note is still to come.</h2>
          <p>Our releases will be collected here as soon as they’re ready.</p>
          <button className="text-link" onClick={() => setFilter("all")}>
            Explore what’s coming <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
    </section>
  );
}
