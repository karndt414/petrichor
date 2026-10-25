export type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photograph: string | null;
  isPlaceholder?: boolean;
  social?: { label: string; url: string };
};

// Replace these profiles and roles with your actual lineup; add/remove freely.
export const members: Member[] = [
  {
    id: "member-01",
    name: "Member name",
    role: "Vocals / guitar",
    bio: "Add a short biography: their place in the band, musical background, and what they bring to the sound.",
    photograph: null,
    isPlaceholder: true,
  },
  {
    id: "member-02",
    name: "Member name",
    role: "Bass",
    bio: "Add a short biography: their place in the band, musical background, and what they bring to the sound.",
    photograph: null,
    isPlaceholder: true,
  },
  {
    id: "member-03",
    name: "Member name",
    role: "Drums",
    bio: "Add a short biography: their place in the band, musical background, and what they bring to the sound.",
    photograph: null,
    isPlaceholder: true,
  },
];
