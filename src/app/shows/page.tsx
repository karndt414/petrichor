import { PageIntro } from "@/components/ui";
import { ShowSchedule } from "@/components/show-schedule";
import { ContactBanner } from "@/components/contact-banner";
import { shows } from "@/data/shows";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Shows",
  "Upcoming Petrichor shows, venue information, tickets, and past performances.",
  "/shows",
);

export default function ShowsPage() {
  return (
    <>
      <PageIntro label="02 / Out in the world" title="Meet us in the noise">
        Same songs. Different electricity. Find the next room, the next stage,
        the next night to remember.
      </PageIntro>
      <section className="container shows-section" aria-label="Show schedule">
        <ShowSchedule shows={shows} initialNow={Date.now()} />
      </section>
      <ContactBanner />
    </>
  );
}
