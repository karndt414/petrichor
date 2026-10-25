import type { Show } from "@/data/shows";

export function splitShows(shows: Show[], now: number) {
  const valid = shows.filter((show) =>
    Number.isFinite(Date.parse(show.startsAt)),
  );
  const isUpcoming = (show: Show) =>
    (show.endsAt
      ? Date.parse(show.endsAt)
      : Date.parse(show.startsAt) + 5 * 60 * 60 * 1000) >= now;
  return {
    upcoming: valid
      .filter(isUpcoming)
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)),
    past: valid
      .filter((show) => !isUpcoming(show))
      .sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt)),
  };
}

export function showDate(show: Show, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: show.timeZone,
  }).format(new Date(show.startsAt));
}
