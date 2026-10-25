# Petrichor

A complete, responsive indie / alternative rock band website built with Next.js (App Router), TypeScript, Tailwind CSS, Motion, and Lucide. Five routes: Home, Music, Shows, About, and Contact. Content lives in four typed data files; there is no database, authentication, or CMS account to maintain.

The visual theme uses midnight blue, violet, lavender, and cool blue accents. The homepage features layered CSS rainfall and expanding rain ripples; interior page introductions carry lighter rainfall. Rain is decorative, ignores pointer events, and becomes still when reduced motion is requested. Its deterministic placement is defined in `src/components/rain.tsx`; palette and animation styles live in `src/app/globals.css`.

## Run locally

Use Node.js 22.19+ or Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The public site URL is optional locally. To configure it, copy `.env.example` to `.env.local` and enter your actual origin in `NEXT_PUBLIC_SITE_URL`.

```sh
npm run typecheck
npm test
npm run build
npm run start
```

`npm run build` performs the production compilation and type check. `npm test` checks date ordering, overnight shows, empty schedules, and venue timezones across daylight saving time. `npm run start` serves the production build. Source changes require another build for production, while the development server updates automatically.

## Update the content

| File                     | What to edit                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `src/data/siteConfig.ts` | Band name, genre, tagline, introduction, story, influences, booking email, social links, and main photographs |
| `src/data/songs.ts`      | Songs, artwork, release dates, streaming URLs, audio/embedded players, and the featured homepage song         |
| `src/data/shows.ts`      | Confirmed performances, venue, city/state, time, timezone, price, and ticket/event links                      |
| `src/data/members.ts`    | The lineup, roles, biographies, photographs, and optional personal links                                      |

The initial release includes clearly marked placeholders. There are **no invented gigs, releases, band members, or streaming/social URLs**. Draft titles and member roles are illustrative. Replace them with your real information and remove their placeholder flags before a public launch. Delete unused sample entries if needed.

### General band information and contact

In `siteConfig.ts`, update `tagline`, `about`, `background`, and `influences`. Set `taglineIsPlaceholder` and `biographyIsPlaceholder` to `false` when the text is final. Change `email` from `booking@example.com` to the real booking address, then set `emailIsPlaceholder: false`.

Contact links use `mailto:` and open the visitor’s email application. The three inquiry links prefill appropriate subjects. There is no pretend submission form or backend email service. **The example address is not a working band inbox.**

Social links are `null` initially and render as clearly labeled “Soon” items, without dead anchors. Supply full, real HTTPS profile URLs in `socials` to make them active. These links update the homepage, footer, and Contact page together.

### Add original songs

Add an object to `songs`, using the exported `Song` type as a guide:

```ts
{
  id: "your-song-slug",
  title: "Your actual song title",
  description: "A short story behind the song.",
  artwork: "/images/your-artwork.webp",
  artworkAlt: "Describe your actual cover artwork",
  artworkIsPlaceholder: false,
  isPlaceholder: false,
  status: "coming-soon",
  type: "Single",
  featured: true,
  streaming: {},
}
```

- Use `status: "released"` for an available release. “Coming soon” remains visible for unreleased songs.
- Add `releaseDate: "YYYY-MM-DD"` only when a date is confirmed. Dates render in UTC to avoid changing the calendar day across visitor timezones.
- Supported streaming fields are `spotify`, `appleMusic`, `youtube`, and `bandcamp`; each accepts a full URL. Missing links are omitted automatically.
- Set one song’s `featured: true` to choose the homepage feature. If none is featured, the first song is used. An empty array removes the homepage feature and shows a thoughtful empty music catalog.
- The Music page filters all/released/coming-soon songs automatically.

#### Add a real player

Use either an owned/licensed audio file in `public/audio/`:

```ts
audioSrc: "/audio/your-song.mp3",
```

Or a verified platform ID, not a whole embed URL:

```ts
embed: { provider: "spotify", id: "YOUR_REAL_SPOTIFY_TRACK_ID" },
// Or: embed: { provider: "youtube", id: "YOUR_REAL_YOUTUBE_VIDEO_ID" },
```

If both are provided, local audio takes precedence. Embeds load lazily; YouTube uses its privacy-enhanced domain. No player is rendered without real configured media. Lyrics/transcripts can be linked in song descriptions or added alongside the player when you publish audio.

### Add upcoming and past shows

`shows.ts` starts empty. Add only confirmed performances. Each show needs:

- A unique `id`.
- `startsAt`: ISO 8601 date/time **including the correct UTC offset** at the venue, such as the format `YYYY-MM-DDTHH:mm:ss-04:00`.
- `timeZone`: the venue’s IANA timezone, such as `America/Indiana/Indianapolis`.
- `venue`, `city`, and `state`.
- Optionally `endsAt`, `price`, `url`, `linkLabel: "Tickets"` or `"Details"`, and `note`.

Show times display in the **venue’s timezone**, with the abbreviation. The UTC offset should match that timezone on that date, including daylight saving time. Add `endsAt` for accurate overnight/festival events. Without an end time, a show moves to the past five hours after its start. Invalid start dates are excluded.

The schedule sorts upcoming shows chronologically and past performances newest first. The browser refreshes the split on load and every minute, so dates age correctly between deployments. The homepage shows the next upcoming event. A show without a ticket URL offers the Contact link; no fake ticket buttons are generated.

### Update members

Replace each member’s `name`, `role`, and `bio`, set `isPlaceholder: false`, and point `photograph` to an image under `public/images/`. If the photograph is `null`, a labeled portrait placeholder appears. Add or remove objects to match your lineup. An optional `social: { label: "Instagram", url: "YOUR_REAL_PROFILE_URL" }` creates a personal link.

### Replace photographs and cover artwork

Put new files in `public/images/` and update paths in the data files. Paths begin with `/images/`, **not** `/public/images/`. Use your own or licensed photography.

| Current asset                        | Recommended replacement                         |
| ------------------------------------ | ----------------------------------------------- |
| `forest.webp`                        | Atmospheric hero photograph, about 2200 px wide |
| `band-placeholder.webp`              | Full-band photograph, at least 1400 px wide     |
| `artwork-01.webp`, `artwork-02.webp` | Square cover artwork, around 1000 × 1000 px     |
| `social-card.jpg`                    | Sharing image, exactly 1200 × 630 px            |

Set `siteConfig.images.bandAlt` to describe the actual band photo and `bandIsPlaceholder: false`. Set each song’s `artworkAlt` and `artworkIsPlaceholder: false`. The hero is decorative and intentionally has empty alternative text. Member photographs use the member’s name.

Photographs are local WebP assets; there are no external image requests at runtime. Next.js provides responsive image optimization on its normal server/Vercel build. Fonts are bundled locally through Fontsource, with no runtime Google Fonts request. The initial photographic stand-ins come from Unsplash:

- [Forest image source](https://images.unsplash.com/photo-1448375240586-882707db888b)
- [Mountain image source](https://images.unsplash.com/photo-1519681393784-d120267933ba)
- [Unsplash license](https://unsplash.com/license)

These landscapes are placeholders, not photographs of the band or actual release artwork. The wave favicon is an original SVG at `src/app/icon.svg`.

## Deploy to Vercel

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. In Vercel, choose **Add New → Project**, import the repository, and use the **Next.js** framework preset.
3. Use the repository root as the root directory. Keep the default build (`npm run build`) and output settings. Choose Node.js 24 LTS (or a supported Node.js 22 runtime).
4. Add `NEXT_PUBLIC_SITE_URL` in the project’s environment settings, with the actual production HTTPS origin and no trailing slash. This is public configuration, not a secret. If the domain isn’t known yet, deploy first, then set the variable and redeploy.
5. Deploy. Subsequent pushes to the connected production branch will rebuild the site, including content-file updates.

No API keys or third-party services are required. Leave `STATIC_EXPORT` unset on Vercel to retain Next.js image optimization.

### Connect a custom domain

1. Open the Vercel project’s **Settings → Domains** and add the domain you own, plus its `www` form if wanted.
2. At your domain registrar/DNS provider, apply the **exact DNS records Vercel shows for your project**. Avoid copying hard-coded DNS values from older guides.
3. Wait for Vercel to verify DNS and issue HTTPS, then choose the primary domain and redirect the alternate domain to it.
4. Set `NEXT_PUBLIC_SITE_URL` to the primary HTTPS origin and redeploy. This updates canonical links, Open Graph URLs, robots, and the sitemap. Without a configured origin, preview metadata uses localhost and the sitemap remains empty.

References: [Vercel Git deployments](https://vercel.com/docs/deployments/git), [adding a domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [Next.js metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

### Optional static hosting

```sh
STATIC_EXPORT=1 npm run build
```

This exports the entire site to `out/`, suitable for a static host. The normal `npm run start` command is for the default Next.js build; use a static file server for `out/`. Static mode uses the supplied optimized WebP files directly. Third-party embeds and local audio still work. There is no server-dependent functionality.

## Accessibility and behavior

- Semantic headings, landmarks, a skip link, visible keyboard focus, current-page navigation, and accessible filter buttons.
- The native mobile dialog traps keyboard focus, supports Escape, restores trigger focus on close, and locks background scrolling.
- Motion respects `prefers-reduced-motion`; important content remains visible without JavaScript.
- All supplied media has reserved dimensions to prevent layout shifts; below-the-fold images and embeds load lazily.
- No analytics, cookies, database, or authentication is added.

## Before public launch

- Replace the example email, member profiles, draft song text, and sample photographs.
- Set real social/streaming URLs where available; remove any unused sample songs or members.
- Turn off the relevant placeholder flags once their content is final.
- Set the production site URL, update the social sharing artwork, and rebuild.
- Check the five pages on a phone and desktop, the mobile menu, email links, and any real embedded players/ticket links you have added.

The build and HTTP checks can run without a browser. Screenshot-based visual QA and live mail delivery require a connected browser and your actual inbox respectively.
