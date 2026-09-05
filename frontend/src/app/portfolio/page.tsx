import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Code2,
  Film,
  Megaphone,
  MessageCircle,
  MoveUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore selected Glexa Digital media, web development, advertising, automation and data analytics projects.",
};

const projects = [
  {
    category: "Media Production",
    title: "Brand Storytelling Campaign",
    description:
      "A complete visual campaign combining videography, photography and professional editing.",
    services: ["Videography", "Photography", "Video Editing"],
    result: "Professional brand presentation",
    icon: Film,
    className: "projectBlue",
  },
  {
    category: "Web Development",
    title: "Modern Business Website",
    description:
      "A responsive, performance-focused website designed to convert visitors into inquiries.",
    services: ["Strategy", "UI Design", "Next.js"],
    result: "Fast digital customer experience",
    icon: Code2,
    className: "projectPurple",
  },
  {
    category: "Digital Advertising",
    title: "Performance Marketing Campaign",
    description:
      "An audience-focused advertising campaign supported by creative testing and optimization.",
    services: ["Meta Ads", "TikTok Ads", "Google Ads"],
    result: "Improved lead generation",
    icon: Megaphone,
    className: "projectPink",
  },
  {
    category: "WhatsApp Automation",
    title: "Automated Lead Management",
    description:
      "A structured WhatsApp workflow for customer responses, lead collection and follow-ups.",
    services: ["Automation", "Lead Capture", "Follow-up"],
    result: "Faster customer communication",
    icon: MessageCircle,
    className: "projectCyan",
  },
  {
    category: "Data Analysis",
    title: "Sales Performance Analysis",
    description:
      "A complete data-cleaning and reporting solution for understanding sales performance.",
    services: ["Data Cleaning", "Analysis", "Reporting"],
    result: "Clear business insights",
    icon: BarChart3,
    className: "projectNavy",
  },
  {
    category: "Power BI",
    title: "Interactive Business Dashboard",
    description:
      "An interactive KPI dashboard created to monitor performance and support decisions.",
    services: ["Power BI", "KPI Tracking", "Visualization"],
    result: "Decision-ready reporting",
    icon: BarChart3,
    className: "projectIndigo",
  },
];

export default function PortfolioPage() {
  return (
    <main>
      <section className="portfolioPageHero">
        <p className="tag">SELECTED PROJECTS</p>

        <h1>
          Work designed to create
          <span> meaningful business impact.</span>
        </h1>

        <p>
          Explore how Glexa Digital combines creative execution, technology,
          automation, advertising and data to solve business challenges.
        </p>
      </section>

      <section className="projectsSection">
        <div className="projectsGrid">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <article className="projectCard" key={project.title}>
                <div className={`projectCover ${project.className}`}>
                  <div className="projectCoverTop">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <Icon size={32} strokeWidth={1.7} />
                  </div>

                  <div>
                    <p>{project.category}</p>
                    <h2>{project.title}</h2>
                  </div>
                </div>

                <div className="projectContent">
                  <p>{project.description}</p>

                  <div className="projectTags">
                    {project.services.map((service) => (
                      <span key={service}>{service}</span>
                    ))}
                  </div>

                  <div className="projectResult">
                    <div>
                      <small>PROJECT OUTCOME</small>
                      <strong>{project.result}</strong>
                    </div>

                    <MoveUpRight size={22} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="portfolioStatement">
        <p className="tag">YOUR PROJECT COULD BE NEXT</p>
        <h2>Have a business challenge you want us to solve?</h2>
        <p>
          Share your goals with our team and receive a practical project
          proposal.
        </p>

        <div className="buttons contactButtons">
          <Link href="/quote" className="primaryButton">
            Start Your Project
          </Link>

          <a
            href="https://wa.me/923159516604"
            target="_blank"
            rel="noopener noreferrer"
            className="secondaryButton"
          >
            Contact on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}