"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Mark } from "./ui";

const links = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/shows", label: "Shows" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function close() {
    dialog.current?.close();
    setOpen(false);
  }
  return (
    <>
      <header className="site-header">
        <div className="header-inner container">
          <Link href="/" className="wordmark" aria-label="Petrichor home">
            <Mark />
            <span>PETRICHOR</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/music" className="header-listen">
            Find our sound <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            className="menu-toggle"
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => {
              dialog.current?.showModal();
              setOpen(true);
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-menu"
        aria-label="Navigation menu"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="mobile-menu-top">
          <Link className="wordmark" href="/" onClick={close}>
            <Mark />
            <span>PETRICHOR</span>
          </Link>
          <button
            autoFocus
            className="menu-close"
            aria-label="Close navigation"
            onClick={close}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={close}
            >
              <span className="eyebrow">0{i + 1}</span>
              {link.label}
              <ArrowUpRight size={25} />
            </Link>
          ))}
        </nav>
        <p className="eyebrow">Indie / Alternative rock</p>
      </dialog>
    </>
  );
}
