import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="siteFooter">
      <Link href="/" className="footerBrand">
        <Image
          src="/glexa-logo.png"
          alt="Glexa Digital"
          width={145}
          height={72}
          className="footerLogo"
        />
      </Link>

      <p>Media, technology and growth—connected.</p>

      <a
        href="https://glexadigital.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        glexadigital.com
      </a>
    </footer>
  );
}