import Image from "next/image";
import Link from "next/link";

const services = [
  {
    icon: "▶",
    title: "Media Production",
    description:
      "Videography, photography and professional video editing for brands, products and campaigns.",
  },
  {
    icon: "✦",
    title: "Content Creation",
    description:
      "Creative ideas, scripts and platform-ready content designed to attract attention.",
  },
  {
    icon: "</>",
    title: "Web Development",
    description:
      "Modern, fast and responsive websites that convert visitors into customers.",
  },
  {
    icon: "◎",
    title: "WhatsApp Automation",
    description:
      "Automated customer conversations, lead capture and follow-up workflows.",
  },
  {
    icon: "↗",
    title: "Digital Advertising",
    description:
      "Meta, TikTok and Google advertising campaigns focused on measurable growth.",
  },
  {
    icon: "▥",
    title: "Data & Power BI",
    description:
      "Professional data analysis and interactive Power BI business dashboards.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="navbar">
        <Link href="/" className="brand" aria-label="Glexa Digital home">
          <Image
            src="/glexa-logo.png"
            alt="Glexa Digital"
            width={150}
            height={76}
            className="navbarLogo"
            priority
          />
        </Link>

        <nav>
          <Link href="#services">Services</Link>
          <Link href="#portfolio">Portfolio</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>

          <Link href="#contact" className="navButton">
            Start a Project
          </Link>
        </nav>
       </header>

       <section className="hero">
        <div className="heroContent">
          <p className="tag">MEDIA • TECHNOLOGY • GROWTH</p>

          <h1>
            Ideas that look sharp.
            <span>Systems that work smart.</span>
          </h1>

          <p className="heroText">
            Glexa Digital combines creative media, modern technology,
            automation, advertising and data to help businesses grow.
          </p>

          <div className="buttons">
            <Link href="#contact" className="primaryButton">
              Get a Free Proposal
            </Link>

            <Link href="#services" className="secondaryButton">
              Explore Services
            </Link>
          </div>
         </div>

         <div className="heroVisual">
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />

          <div className="logoCore">
            <Image
              src="/glexa-logo.png"
              alt="Glexa Digital"
              width={390}
              height={390}
              className="heroLogo"
              priority
            />
          </div>
        </div>
        </section>

        <section className="services" id="services">
        <div className="sectionHeading">
          <div>
            <p className="tag">OUR SERVICES</p>
            <h2>One partner for every digital move.</h2>
          </div>

          <p>
            Creative execution and technical thinking connected from the
            first idea to the final result.
          </p>
          </div>

          <div className="serviceGrid">
          {services.map((service, index) => (
            <article className="serviceCard" key={service.title}>
              <span className="serviceNumber">0{index + 1}</span>

              <div className="serviceIcon">{service.icon}</div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
        </section>

      <section className="portfolio" id="portfolio">
      <div className="sectionHeading">
      <div>
      <p className="tag">OUR PORTFOLIO</p>
      <h2>Selected work that creates real impact.</h2>
      </div>

    <p>
      A selection of creative, technology and growth projects developed
      for modern businesses.
    </p>
    </div>

    <div className="portfolioGrid">
    <article className="portfolioCard portfolioOne">
      <div className="projectVisual">
        <span>MEDIA PRODUCTION</span>
        <strong>Brand Storytelling</strong>
      </div>

      <div className="projectDetails">
        <p>Videography • Photography • Editing</p>
        <h3>Creative Media Campaign</h3>
      </div>
      </article>

      <article className="portfolioCard portfolioTwo">
      <div className="projectVisual">
        <span>WEB DEVELOPMENT</span>
        <strong>Digital Experience</strong>
      </div>

      <div className="projectDetails">
        <p>Strategy • UI Design • Development</p>
        <h3>Modern Business Website</h3>
      </div>
      </article>

      <article className="portfolioCard portfolioThree">
      <div className="projectVisual">
        <span>PERFORMANCE MARKETING</span>
        <strong>Business Growth</strong>
      </div>

      <div className="projectDetails">
        <p>Meta Ads • TikTok Ads • Google Ads</p>
        <h3>Digital Advertising Campaign</h3>
      </div>
      </article>

      <article className="portfolioCard portfolioFour">
      <div className="projectVisual">
        <span>DATA & AUTOMATION</span>
        <strong>Smarter Decisions</strong>
      </div>

      <div className="projectDetails">
        <p>WhatsApp • Analytics • Power BI</p>
        <h3>Automation & Analytics System</h3>
      </div>
      </article>
      </div>
      </section>

      <section className="about" id="about">
        <p className="tag">ABOUT GLEXA</p>

        <h2>
          Creative thinking meets
          <span> modern technology.</span>
        </h2>

        <p>
          Glexa Digital is a modern media and technology agency based in
          Peshawar. We help businesses build stronger brands, reach the right
          audience and make smarter decisions.
        </p>
      </section>

      <section className="contact" id="contact">
        <p className="tag">START A PROJECT</p>
        <h2>Ready to grow your business?</h2>

        <p>
          Discuss your next project directly with the Glexa Digital team.
        </p>

        <div className="buttons contactButtons">
          <a
            href="https://wa.me/923159516604"
            target="_blank"
            rel="noopener noreferrer"
            className="primaryButton"
          >
            WhatsApp: +92 315 9516604
          </a>

          <a
            href="https://wa.me/923259134916"
            target="_blank"
            rel="noopener noreferrer"
            className="secondaryButton"
          >
            +92 325 9134916
          </a>
        </div>
      </section>

      <footer>
        <Image
          src="/glexa-logo.png"
          alt="Glexa Digital"
          width={145}
          height={72}
          className="footerLogo"
        />

        <p>Media, technology and growth—connected.</p>

        <a
          href="https://glexadigital.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          glexadigital.com
        </a>
      </footer>
    </main>
  );
}