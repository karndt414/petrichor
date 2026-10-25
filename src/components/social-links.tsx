import { ArrowUpRight, Camera, Music2, CirclePlay } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const icons = { Instagram: Camera, Spotify: Music2, YouTube: CirclePlay };
export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`social-links ${compact ? "social-compact" : ""}`}
      aria-label="Social media"
    >
      {siteConfig.socials.map(({ name, url }) => {
        const Icon = icons[name];
        return url ? (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={compact ? `${name} (opens in a new tab)` : undefined}
          >
            <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
            {!compact && (
              <>
                {name}
                <ArrowUpRight size={14} aria-hidden="true" />
              </>
            )}
          </a>
        ) : (
          <span
            key={name}
            className="social-placeholder"
            tabIndex={0}
            title={`${name} — account link coming soon`}
            aria-label={`${name} — account link coming soon`}
          >
            <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
            {!compact && (
              <>
                {name}
                <span className="social-soon">Soon</span>
              </>
            )}
          </span>
        );
      })}
    </div>
  );
}
