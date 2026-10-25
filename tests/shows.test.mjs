import assert from "node:assert/strict";
import { test } from "node:test";
import { splitShows, showDate } from "../src/lib/shows.ts";

const fixture = (id, startsAt, rest = {}) => ({
  id,
  startsAt,
  timeZone: "America/Indiana/Indianapolis",
  venue: "Test venue",
  city: "Test city",
  state: "IN",
  ...rest,
});

test("upcoming sorts soonest first; past sorts newest first; invalid dates are excluded", () => {
  const now = Date.parse("2026-10-24T12:00:00Z");
  const a = fixture("later", "2026-10-28T20:00:00-04:00");
  const b = fixture("sooner", "2026-10-25T20:00:00-04:00");
  const c = fixture("older", "2026-10-20T20:00:00-04:00");
  const d = fixture("recent", "2026-10-22T20:00:00-04:00");
  const input = [a, c, b, d, fixture("invalid", "not-a-date")];
  const result = splitShows(input, now);
  assert.deepEqual(
    result.upcoming.map((s) => s.id),
    ["sooner", "later"],
  );
  assert.deepEqual(
    result.past.map((s) => s.id),
    ["recent", "older"],
  );
  assert.equal(input[0], a, "the original content order is preserved");
});

test("overnight show remains upcoming until its explicit end", () => {
  const show = fixture("overnight", "2026-10-24T20:00:00-04:00", {
    endsAt: "2026-10-25T03:00:00-04:00",
  });
  assert.equal(
    splitShows([show], Date.parse("2026-10-25T06:00:00Z")).upcoming.length,
    1,
  );
  assert.equal(
    splitShows([show], Date.parse("2026-10-25T07:00:01Z")).past.length,
    1,
  );
});

test("shows without an end move to past after five hours", () => {
  const show = fixture("default-end", "2026-10-24T20:00:00-04:00");
  assert.equal(
    splitShows([show], Date.parse("2026-10-25T04:59:00Z")).upcoming.length,
    1,
  );
  assert.equal(
    splitShows([show], Date.parse("2026-10-25T05:01:00Z")).past.length,
    1,
  );
});

test("venue date and time stay local across midnight and DST", () => {
  const summer = fixture("summer", "2026-06-13T00:30:00Z");
  assert.equal(showDate(summer, { month: "short", day: "numeric" }), "Jun 12");
  assert.equal(
    showDate(summer, {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }),
    "8:30 PM EDT",
  );
  const winter = fixture("winter", "2026-12-13T01:30:00Z");
  assert.equal(
    showDate(winter, {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }),
    "8:30 PM EST",
  );
});

test("empty schedule has two empty groups", () => {
  assert.deepEqual(splitShows([], Date.now()), { upcoming: [], past: [] });
});
