import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Camera,
  Code2,
  Film,
  LineChart,
  Megaphone,
  MessageCircle,
  PenTool,
  Search,
  Video,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Glexa Digital services including media production, content creation, web development, WhatsApp automation, digital advertising and Power BI.",
};

const services = [
  {
    number: "01",
    icon: Video,
    title: "Videography",
    description:
      "Professional video production that communicates your brand story clearly and creatively.",
    features: [
      "Corporate videos",
      "Product commercials",
      "Real estate videos",
      "Social media videos",
    ],
  },
  {
    number: "02",
    icon: Camera,
    title: "Photography",
    description:
      "High-quality photography designed to present your business, products and projects professionally.",
    features: [
      "Product photography",
      "Corporate photography",
      "Event coverage",
      "Real estate photography",
    ],
  },
  {
    number: "03",
    icon: Film,
    title: "Video Editing",
    description:
      "Purposeful editing that turns raw footage into engaging and platform-ready visual stories.",
    features: [
      "Social media editing",
      "Commercial editing",
      "Motion graphics",
      "Color correction",
    ],
  },
  {
    number: "04",
    icon: PenTool,
    title: "Content Creation",
    description:
      "Creative concepts, scripts and visual content developed for consistent audience engagement.",
    features: [
      "Social media content",
      "Content strategy",
      "Script writing",
      "Campaign concepts",
    ],
  },
  {
    number: "05",
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, responsive and modern websites built around your brand and business objectives.",
    features: [
      "Business websites",
      "Landing pages",
      "Portfolio websites",
      "Custom web systems",
    ],
  },
  {
    number: "06",
    icon: MessageCircle,
    title: "WhatsApp Automation",
    description:
      "Automated conversations and lead workflows that improve response time and customer service.",
    features: [
      "Automated responses",
      "Lead collection",
      "Customer follow-ups",
      "CRM integration",
    ],
  },
  {
    number: "07",
    icon: Megaphone,
    title: "Digital Advertising",
    description:
      "Performance campaigns designed to reach relevant audiences and generate measurable growth.",
    features: [
      "Meta Ads",
      "TikTok Ads",
      "Google Ads",
      "Campaign optimization",
    ],
  },
  {
    number: "08",
    icon: BarChart3,
    title: "Data Analysis",
    description:
      "Clean and meaningful analysis that transforms business data into practical insights.",
    features: [
      "Data cleaning",
      "Business reporting",
      "Performance analysis",
      "Sales analysis",
    ],
  },
  {
    number: "09",
    icon: LineChart,
    title: "Power BI Dashboards",
    description:
      "Interactive dashboards that make business performance easier to understand and monitor.",
    features: [
      "Sales dashboards",
      "Marketing dashboards",
      "KPI monitoring",
      "Interactive reports",
    ],
  },
  {
    number: "10",
    icon: Search,
    title: "SEO & Digital Visibility",
    description:
      "Website optimization that improves search visibility, performance and customer discovery.",
    features: [
      "Technical SEO",
      "On-page SEO",
      "Google indexing",
      "Performance optimization",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="servicesPageHero">
        <p className="tag">OUR SERVICES</p>

        <h1>
          Creative and technical solutions
          <span> built for business growth.</span>
        </h1>

        <p>
          From brand storytelling to automation and business intelligence,
          Glexa Digital provides connected services for every stage of your
          digital journey.
        </p>
      </section>

      <section className="allServicesSection">
        <div className="allServicesGrid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="detailedServiceCard" key={service.title}>
                <div className="serviceCardTop">
                  <span>{service.number}</span>

                  <div className="detailedServiceIcon">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>
                </div>

                <h2>{service.title}</h2>
                <p>{service.description}</p>

                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <Link
                  href={`/quote?service=${encodeURIComponent(service.title)}`}
                  className="serviceLink"
                >
                  Request this service →
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="serviceProcess">
        <div className="sectionHeading">
          <div>
            <p className="tag">HOW WE WORK</p>
            <h2>A clear process from idea to impact.</h2>
          </div>

          <p>
            Every project follows a practical process designed for clarity,
            quality and measurable results.
          </p>
        </div>

        <div className="processGrid">
          <article>
            <span>01</span>
            <h3>Discover</h3>
            <p>We understand your business, audience and project objectives.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Plan</h3>
            <p>We create a clear strategy, scope and delivery roadmap.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Create</h3>
            <p>Our team develops and reviews the complete solution.</p>
          </article>

          <article>
            <span>04</span>
            <h3>Deliver</h3>
            <p>We launch, measure and improve the final result.</p>
          </article>
        </div>
      </section>

      <section className="aboutCta">
        <p className="tag">START YOUR PROJECT</p>
        <h2>Need a custom combination of services?</h2>
        <p>Tell us what you want to achieve and we will prepare a solution.</p>

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
            Discuss on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}