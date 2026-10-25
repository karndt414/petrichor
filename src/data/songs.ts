export type StreamingLinks = {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  bandcamp?: string;
};

export type Song = {
  id: string;
  title: string;
  description: string;
  artwork: string;
  artworkAlt: string;
  artworkIsPlaceholder?: boolean;
  isPlaceholder?: boolean;
  status: "released" | "coming-soon";
  releaseDate?: string; // YYYY-MM-DD; omit until confirmed.
  type: string;
  featured?: boolean;
  streaming: StreamingLinks;
  audioSrc?: string; // An owned/licensed local audio file, e.g. /audio/song.mp3.
  embed?: { provider: "spotify" | "youtube"; id: string };
};

// These are explicitly labeled content placeholders, not actual releases.
export const songs: Song[] = [
  {
    id: "first-original",
    title: "A sound taking shape.",
    description:
      "Our original music will live here. The first chapter is still unwritten — stay close.",
    artwork: "/images/artwork-01.webp",
    artworkAlt:
      "Placeholder artwork: a misty forest under violet and blue light",
    artworkIsPlaceholder: true,
    isPlaceholder: true,
    status: "coming-soon",
    type: "Original music",
    featured: true,
    streaming: {},
  },
  {
    id: "original-02",
    title: "Original song 02",
    description:
      "A space for your next original. Add the song title, its story, and the finished artwork when you’re ready.",
    artwork: "/images/artwork-02.webp",
    artworkAlt: "Placeholder artwork: a mountain beneath an open night sky",
    artworkIsPlaceholder: true,
    isPlaceholder: true,
    status: "coming-soon",
    type: "Original music",
    streaming: {},
  },
];
