import Link from "next/link";
import { ArrowDown, ArrowUpRight, Waves } from "lucide-react";
import type { ReactNode } from "react";
import { Rain } from "./rain";

export function Mark({ className = "" }: { className?: string }) {
  return <Waves aria-hidden="true" className={className} strokeWidth={1.3} />;
}

export function ButtonLink({
  href,
  children,
  secondary = false,
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
  external?: boolean;
}) {
  const classes = `button ${secondary ? "button-secondary" : "button-primary"} ${className}`;
  return external ? (
    <a
      href={href}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}

export function SectionLabel({
  number,
  children,
}: {
  number?: string;
  children: ReactNode;
}) {
  return (
    <p className="eyebrow section-label">
      {number && <span className="section-number">{number}</span>}
      {children}
    </p>
  );
}

export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="page-intro container">
      <Rain soft />
      <SectionLabel>{label}</SectionLabel>
      <h1>
        {title}
        <span className="accent">.</span>
      </h1>
      <div className="intro-bottom">
        <p>{children}</p>
        <ArrowDown size={24} strokeWidth={1} aria-hidden="true" />
      </div>
    </section>
  );
}
