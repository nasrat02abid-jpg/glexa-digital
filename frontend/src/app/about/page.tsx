import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Clapperboard,
  Code2,
  Megaphone,
  MessageCircle,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Glexa Digital, a modern media and technology agency helping businesses grow through creativity, technology, advertising and data.",
};

const capabilities = [
  {
    icon: Clapperboard,
    title: "Creative Media",
    description:
      "Professional videography, photography, video editing and visual storytelling.",
  },
  {
    icon: Code2,
    title: "Modern Technology",
    description:
      "Fast websites and practical digital solutions built for modern businesses.",
  },
  {
    icon: Megaphone,
    title: "Digital Growth",
    description:
      "Strategic Meta, TikTok and Google advertising focused on measurable results.",
  },
  {
    icon: MessageCircle,
    title: "Smart Automation",
    description:
      "WhatsApp automation that improves communication and lead management.",
  },
  {
    icon: BarChart3,
    title: "Data Intelligence",
    description:
      "Clear analysis and Power BI dashboards for smarter business decisions.",
  },
  {
    icon: Target,
    title: "Result Focused",
    description:
      "Every creative and technical decision is connected to a real business goal.",
  },
];

export default function AboutPage() {
  return (
    <main className="aboutPage">
      <section className="pageHero">
        <div className="pageHeroContent">
          <p className="tag">ABOUT GLEXA DIGITAL</p>

          <h1>
            Where creative ideas meet
            <span> intelligent technology.</span>
          </h1>

          <p>
            We combine media, technology, automation, advertising and data to
            help ambitious businesses build stronger brands and achieve
            sustainable growth.
          </p>
        </div>

        <div className="aboutLogoPanel">
          <Image
            src="/glexa-logo.png"
            alt="Glexa Digital"
            width={420}
            height={420}
            priority
          />
        </div>
      </section>

      <section className="aboutStory">
        <div>
          <p className="tag">OUR STORY</p>

          <h2>A connected approach to digital growth.</h2>
        </div>

        <div className="storyContent">
          <p>
            Glexa Digital is a media and technology agency based in Peshawar,
            Pakistan. We were created to give businesses one reliable partner
            for creative production, digital platforms, advertising,
            automation and analytics.
          </p>

          <p>
            Instead of treating media, technology and data as separate
            services, we connect them into one clear strategy. This helps our
            clients communicate better, generate stronger leads and make
            smarter decisions.
          </p>
        </div>
      </section>

      <section className="missionSection">
        <article className="missionCard">
          <span>01</span>
          <p className="tag">OUR MISSION</p>
          <h2>Make modern digital growth accessible and practical.</h2>
          <p>
            Our mission is to help businesses use creativity and technology
            with purpose—not simply follow trends.
          </p>
        </article>

        <article className="missionCard visionCard">
          <span>02</span>
          <p className="tag">OUR VISION</p>
          <h2>Become a trusted media and technology partner.</h2>
          <p>
            We aim to build long-term partnerships with businesses in Pakistan
            and international markets.
          </p>
        </article>
      </section>

      <section className="capabilitiesSection">
        <div className="sectionHeading">
          <div>
            <p className="tag">WHAT DEFINES US</p>
            <h2>Creative execution backed by technical thinking.</h2>
          </div>

          <p>
            Our multidisciplinary approach connects every customer touchpoint
            with a clear business objective.
          </p>
        </div>

        <div className="capabilitiesGrid">
          {capabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <article className="capabilityCard" key={capability.title}>
                <div className="capabilityIcon">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="aboutCta">
        <p className="tag">WORK WITH GLEXA</p>
        <h2>Let&apos;s build something valuable together.</h2>
        <p>
          Tell us about your business, challenge or next digital project.
        </p>

        <div className="buttons contactButtons">
          <Link href="/quote" className="primaryButton">
            Request a Quote
          </Link>

          <a
            href="https://wa.me/923159516604"
            target="_blank"
            rel="noopener noreferrer"
            className="secondaryButton"
          >
            Talk on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}