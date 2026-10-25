"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Radio, Waves } from "lucide-react";
import type { Show } from "@/data/shows";
import { splitShows, showDate } from "@/lib/shows";

export function ShowRow({
  show,
  past = false,
}: {
  show: Show;
  past?: boolean;
}) {
  return (
    <article className={`show-row ${past ? "past-show" : ""}`}>
      <time dateTime={show.startsAt} className="show-date">
        <span>{showDate(show, { month: "short" })}</span>
        <strong>{showDate(show, { day: "2-digit" })}</strong>
        <span>{showDate(show, { year: "numeric" })}</span>
      </time>
      <div className="show-venue">
        <h3>{show.venue}</h3>
        <p>
          <MapPin size={13} aria-hidden="true" />
          {show.city}, {show.state}
        </p>
        {show.note && <p>{show.note}</p>}
      </div>
      <div className="show-time">
        <span>
          {showDate(show, {
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short",
          })}
        </span>
        {show.price && <span>{show.price}</span>}
      </div>
      {past ? (
        <span className="eyebrow">That was a good night.</span>
      ) : show.url ? (
        <a
          className="button button-secondary"
          href={show.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {show.linkLabel || "Details"}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      ) : (
        <Link className="text-link" href="/contact">
          Ask about this show
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}

export function ShowSchedule({
  shows,
  initialNow,
  preview = false,
}: {
  shows: Show[];
  initialNow: number;
  preview?: boolean;
}) {
  const [now, setNow] = useState(initialNow);
  const [view, setView] = useState<"upcoming" | "past">("upcoming");
  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);
  const { upcoming, past } = splitShows(shows, now);
  const visible = preview
    ? upcoming.slice(0, 1)
    : view === "upcoming"
      ? upcoming
      : past;
  return (
    <div className={preview ? "shows-preview" : "show-schedule"}>
      {!preview && (
        <div className="catalog-toolbar">
          <div className="filter-buttons" aria-label="Filter shows">
            <button
              aria-pressed={view === "upcoming"}
              onClick={() => setView("upcoming")}
            >
              Upcoming<span>{upcoming.length.toString().padStart(2, "0")}</span>
            </button>
            <button
              aria-pressed={view === "past"}
              onClick={() => setView("past")}
            >
              Past shows<span>{past.length.toString().padStart(2, "0")}</span>
            </button>
          </div>
          <span className="eyebrow catalog-note">See you out there.</span>
        </div>
      )}
      <div aria-live="polite">
        {visible.length ? (
          visible.map((show) => (
            <ShowRow
              key={show.id}
              show={show}
              past={!preview && view === "past"}
            />
          ))
        ) : (
          <div
            className={`empty-shows ${preview ? "empty-shows-preview" : ""}`}
          >
            <div className="empty-shows-icon">
              <span />
              <Waves size={35} strokeWidth={0.9} aria-hidden="true" />
              <span />
            </div>
            <div>
              <p className="eyebrow">
                {view === "past"
                  ? "The story so far"
                  : "A little quiet. For now."}
              </p>
              <h3>
                {view === "past"
                  ? "Every story has a first show."
                  : "Something’s brewing."}
              </h3>
              <p>
                {view === "past"
                  ? "Past performances will appear here once the first dates are added."
                  : "New shows coming soon. We’ll meet you in the noise."}
              </p>
            </div>
            {preview ? (
              <Link className="text-link" href="/shows">
                All shows
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ) : (
              <Link className="button button-secondary" href="/contact">
                {view === "past"
                  ? "Get in touch"
                  : "Bring Petrichor to your stage"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </div>
      {!preview && (
        <p className="show-footnote">
          <Radio size={14} aria-hidden="true" />
          Confirmed dates only. Check back for the next announcement.
        </p>
      )}
    </div>
  );
}
