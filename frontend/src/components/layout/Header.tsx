"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("glexa-theme");
    const isDark = savedTheme === "dark";

    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !darkMode;

    setDarkMode(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("glexa-theme", nextTheme ? "dark" : "light");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="siteHeader">
      <div className="headerContainer">
        <Link href="/" className="headerLogo" onClick={closeMenu}>
          <Image
            src="/glexa-logo.png"
            alt="Glexa Digital"
            width={155}
            height={60}
            priority
          />
        </Link>

        <nav className={menuOpen ? "mainNav mainNavOpen" : "mainNav"}>
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>

          <Link href="/about" onClick={closeMenu}>
            About
          </Link>

          <Link href="/services" onClick={closeMenu}>
            Services
          </Link>

          <Link href="/portfolio" onClick={closeMenu}>
            Portfolio
          </Link>

          <Link href="/careers" onClick={closeMenu}>
            Careers
          </Link>

          <Link href="/contact" onClick={closeMenu}>
            Contact
          </Link>

          <Link href="/quote" className="headerCta" onClick={closeMenu}>
            Request a Quote
          </Link>
        </nav>

        <div className="headerActions">
          <button
            type="button"
            className="iconButton"
            onClick={toggleTheme}
            aria-label="Change website theme"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            type="button"
            className="iconButton menuButton"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}