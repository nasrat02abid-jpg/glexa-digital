import type { Metadata } from "next";
import {
  BarChart3,
  Bot,
  Code2,
  Film,
  MapPin,
  Megaphone,
  Palette,
} from "lucide-react";
import JobApplicationForm from "@/components/careers/JobApplicationForm";

export const metadata: Metadata = {
  title: "Careers | Glexa Digital",
  description:
    "Explore career and internship opportunities at Glexa Digital.",
};

const positions = [
  {
    title: "Content Creator",
    type: "Contract",
    location: "Peshawar",
    icon: Palette,
  },
  {
    title: "Videographer & Editor",
    type: "Contract",
    location: "Peshawar",
    icon: Film,
  },
  {
  title: "AI & Automation Developer",
  type: "Project Based",
  location: "Hybrid",
  icon: Bot,
  },
  {
    title: "Web Developer",
    type: "Project Based",
    location: "Hybrid",
    icon: Code2,
  },
  {
    title: "Digital Marketing Intern",
    type: "Internship",
    location: "Peshawar",
    icon: Megaphone,
  },
  {
    title: "Data Analyst Intern",
    type: "Internship",
    location: "Hybrid",
    icon: BarChart3,
  },
];

export default function CareersPage() {
  return (
    <main>
      <section className="careersHero">
        <p className="tag">CAREERS AT GLEXA</p>

        <h1>
          Build your skills while creating
          <span> meaningful digital work.</span>
        </h1>

        <p>
          Join a multidisciplinary environment where creativity, technology,
          advertising and data work together.
        </p>
      </section>

      <section className="openPositions">
        <div className="sectionHeading">
          <div>
            <p className="tag">OPEN OPPORTUNITIES</p>
            <h2>Find your place at Glexa Digital.</h2>
          </div>

          <p>
            We welcome creative thinkers, developers, marketers and analysts
            who are ready to learn and contribute.
          </p>
        </div>

        <div className="positionsList">
          {positions.map((position) => {
            const Icon = position.icon;

            return (
              <article className="positionCard" key={position.title}>
                <div className="positionIcon">
                  <Icon size={25} />
                </div>

                <div className="positionTitle">
                  <h3>{position.title}</h3>
                  <span>{position.type}</span>
                </div>

                <div className="positionLocation">
                  <MapPin size={17} />
                  <span>{position.location}</span>
                </div>

                <a href="#application">Apply Now →</a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="applicationSection" id="application">
        <div className="applicationIntroduction">
          <p className="tag">SUBMIT YOUR APPLICATION</p>
          <h2>Tell us what you can bring to the team.</h2>

          <p>
            Complete the application form and attach your latest CV. Our team
            will review suitable applications when opportunities are available.
          </p>
        </div>

        <JobApplicationForm />
      </section>
    </main>
  );
}