import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Mark } from "./ui";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="wordmark">
              <Mark />
              <span>PETRICHOR</span>
            </Link>
            <p>Something in the air.</p>
          </div>
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Petrichor</span>
          <a href={`mailto:${siteConfig.email}`} className="footer-contact">
            {siteConfig.email}
            {siteConfig.emailIsPlaceholder && " (placeholder)"}{" "}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a href="#top" className="back-top">
            Back to top <ArrowUp size={13} aria-hidden="true" />
          </a>
        </div>
        {siteConfig.emailIsPlaceholder && (
          <p className="footer-placeholder">
            Preview edition · Content and account links marked as placeholders
            await the band’s details.
          </p>
        )}
      </div>
    </footer>
  );
}
