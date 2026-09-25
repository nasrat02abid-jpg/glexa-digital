import Image from "next/image";
import Link from "next/link";
import { Globe2, Mail, MapPin, MessageCircle } from "lucide-react";

const serviceLinks = [
  "Media Production", "Content Creation", "Web Development",
  "WhatsApp Automation", "Digital Advertising", "Data & Power BI",
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Customer Reviews", href: "/reviews" },
  { label: "Careers", href: "/careers" },
  { label: "Request a Quote", href: "/quote" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerInner">
        <div className="footerColumns">
          <div className="footerIntro">
            <Link href="/" className="footerBrand" aria-label="Glexa Digital home">
              <Image src="/glexa-logo.png" alt="Glexa Digital" width={145} height={72} className="footerLogo" />
            </Link>
            <p>Ideas that look sharp. Systems that work smart. Creative media and technology for growing businesses.</p>
          </div>

          <nav className="footerGroup" aria-label="Our services">
            <h2>Our Services</h2>
            {serviceLinks.map((label) => <Link key={label} href="/services">{label}</Link>)}
          </nav>

          <nav className="footerGroup" aria-label="Explore Glexa Digital">
            <h2>Explore</h2>
            {companyLinks.map(({ label, href }) => <Link key={label} href={href}>{label}</Link>)}
          </nav>

          <div className="footerGroup footerContact">
            <h2>Get in Touch</h2>
            <a href="https://wa.me/923159516604" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" /> +92 315 9516604</a>
            <a href="mailto:glexadigital@gmail.com"><Mail size={17} aria-hidden="true" /> glexadigital@gmail.com</a>
            <a href="https://glexadigital.com" target="_blank" rel="noopener noreferrer"><Globe2 size={17} aria-hidden="true" /> glexadigital.com</a>
            <span><MapPin size={17} aria-hidden="true" /> Peshawar, Pakistan</span>
          </div>
        </div>

        <div className="footerBottom">
          <span>© {new Date().getFullYear()} Glexa Digital. All rights reserved.</span>
          <Link href="/quote">Let&apos;s work together →</Link>
        </div>
      </div>
    </footer>
  );
}
