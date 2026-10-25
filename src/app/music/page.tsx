import { PageIntro, SectionLabel } from "@/components/ui";
import { MusicCatalog } from "@/components/music-catalog";
import { ContactBanner } from "@/components/contact-banner";
import { songs } from "@/data/songs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Music",
  "Original music from Petrichor. Explore releases, upcoming songs, and the sounds taking shape.",
  "/music",
);

export default function MusicPage() {
  return (
    <>
      <PageIntro label="01 / The discography" title="Made to be felt">
        Songs for the space between the stillness and the storm. Our original
        music, all in one place.
      </PageIntro>
      <MusicCatalog songs={songs} />
      <div className="music-note container">
        <SectionLabel>A note from the band</SectionLabel>
        <p>
          Good songs take their own time.
          <br />
          <span>Thanks for being here at the beginning.</span>
        </p>
      </div>
      <ContactBanner />
    </>
  );
}
