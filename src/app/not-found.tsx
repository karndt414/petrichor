import { ButtonLink, Mark } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container not-found">
      <Mark />
      <p className="eyebrow">404 / A little off the beaten path</p>
      <h1>Lost in the atmosphere.</h1>
      <p>This page has drifted out of reach. Let’s find your way back.</p>
      <ButtonLink href="/">Back to Petrichor</ButtonLink>
    </section>
  );
}
