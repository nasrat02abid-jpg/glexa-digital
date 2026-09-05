import type { Metadata } from "next";
import {
  BarChart3,
  Camera,
  Code2,
  Megaphone,
  MessageCircle,
  Video,
} from "lucide-react";
import QuoteForm from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote | Glexa Digital",
  description:
    "Request a customized quotation for media, marketing, web development, automation and data services.",
};

const services = [
  {
    title: "Media Production",
    description: "Videography, photography and professional editing.",
    icon: Camera,
  },
  {
    title: "Content Creation",
    description: "Creative content for social media and campaigns.",
    icon: Video,
  },
  {
    title: "Web Development",
    description: "Modern and responsive business websites.",
    icon: Code2,
  },
  {
    title: "WhatsApp Automation",
    description: "Lead capture and automated customer communication.",
    icon: MessageCircle,
  },
  {
    title: "Digital Advertising",
    description: "Meta, TikTok and Google advertising campaigns.",
    icon: Megaphone,
  },
  {
    title: "Data & Power BI",
    description: "Business analytics and interactive dashboards.",
    icon: BarChart3,
  },
];

export default function QuotePage() {
  return (
    <main>
      <section className="quoteHero">
        <p className="tag">REQUEST A QUOTE</p>

        <h1>
          Let&apos;s turn your next idea into
          <span> measurable growth.</span>
        </h1>

        <p>
          Tell us what you need and our team will prepare a customized project
          proposal for your business.
        </p>
      </section>

      <section className="quoteSection">
        <div className="quoteIntroduction">
          <p className="tag">PROJECT DETAILS</p>
          <h2>Start your project with Glexa Digital.</h2>

          <p>
            Provide your project requirements, preferred service, budget and
            deadline. Your information will be prepared as a WhatsApp message
            for our team.
          </p>

          <div className="quoteServiceList">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article className="quoteServiceItem" key={service.title}>
                  <div>
                    <Icon size={21} />
                  </div>

                  <span>
                    <strong>{service.title}</strong>
                    <small>{service.description}</small>
                  </span>
                </article>
              );
            })}
          </div>
        </div>

        <QuoteForm />
      </section>
    </main>
  );
}