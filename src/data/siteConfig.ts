export type SocialLink = {
  name: "Instagram" | "Spotify" | "YouTube";
  url: string | null;
};

export const siteConfig = {
  name: "Petrichor",
  genre: "Indie / Alternative rock",
  tagline: "For the quiet. For the chaos. For everything in between.",
  taglineIsPlaceholder: true,
  description:
    "The official home of Petrichor. Original music, upcoming shows, and the people behind the sound. Indie and alternative rock, with atmosphere.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, ""),
  email: "booking@example.com",
  emailIsPlaceholder: true,
  intro: "Somewhere between the stillness and the storm.",
  about:
    "Petrichor is an indie / alternative rock band. Named for the earthy scent that follows the rain, we make room for both the quiet and the chaos.",
  background:
    "Add your story here: how the band came together, the places that shaped you, and the sounds you keep coming back to.",
  influences:
    "Add your musical influences and a few words about what makes your sound your own.",
  biographyIsPlaceholder: true,
  images: {
    hero: "/images/forest.webp",
    band: "/images/band-placeholder.webp",
    bandAlt:
      "Atmospheric mountain landscape standing in for the future band photograph",
    bandIsPlaceholder: true,
  },
  socials: [
    { name: "Instagram", url: null },
    { name: "Spotify", url: null },
    { name: "YouTube", url: null },
  ] satisfies SocialLink[],
};
