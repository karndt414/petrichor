export type Show = {
  id: string;
  startsAt: string; // ISO 8601 with UTC offset, e.g. 2027-06-12T20:00:00-04:00
  endsAt?: string;
  timeZone: string; // IANA venue timezone, e.g. America/Indiana/Indianapolis
  venue: string;
  city: string;
  state: string;
  price?: string;
  url?: string;
  linkLabel?: "Tickets" | "Details";
  note?: string;
};

// Add confirmed performances here. No fictitious dates or venues are published.
export const shows: Show[] = [];
