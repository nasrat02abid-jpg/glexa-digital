import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";

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

const projects = [
  {
    category: "MEDIA PRODUCTION",
    headline: "Brand Storytelling",
    services: "Videography • Photography • Editing",
    title: "Creative Media Campaign",
    className: "portfolioOne",
  },
  {
    category: "WEB DEVELOPMENT",
    headline: "Digital Experience",
    services: "Strategy • UI Design • Development",
    title: "Modern Business Website",
    className: "portfolioTwo",
  },
  {
    category: "PERFORMANCE MARKETING",
    headline: "Business Growth",
    services: "Meta Ads • TikTok Ads • Google Ads",
    title: "Digital Advertising Campaign",
    className: "portfolioThree",
  },
  {
    category: "DATA & AUTOMATION",
    headline: "Smarter Decisions",
    services: "WhatsApp • Analytics • Power BI",
    title: "Automation & Analytics System",
    className: "portfolioFour",
  },
];

export default function Home() {
  return (
    <main>
      <Header />

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
          {projects.map((project) => (
            <article
              className={`portfolioCard ${project.className}`}
              key={project.title}
            >
              <div className="projectVisual">
                <span>{project.category}</span>
                <strong>{project.headline}</strong>
              </div>

              <div className="projectDetails">
                <p>{project.services}</p>
                <h3>{project.title}</h3>
              </div>
            </article>
          ))}
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