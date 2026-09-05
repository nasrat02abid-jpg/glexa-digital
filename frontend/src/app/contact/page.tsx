import type { Metadata } from "next";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Globe2,
} from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Glexa Digital",
  description:
    "Contact Glexa Digital for media production, web development, advertising, automation and data services.",
};

const contactDetails = [
  {
    title: "WhatsApp",
    value: "+92 315 9516604",
    href: "https://wa.me/923159516604",
    icon: MessageCircle,
  },
  {
    title: "Alternate Contact",
    value: "+92 325 9134916",
    href: "https://wa.me/923259134916",
    icon: Phone,
  },
  {
    title: "Email",
    value: "glexadigital@gmail.com",
    href: "mailto:glexadigital@gmail.com",
    icon: Mail,
  },
  {
    title: "Website",
    value: "glexadigital.com",
    href: "https://glexadigital.com",
    icon: Globe2,
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="contactHero">
        <p className="tag">CONTACT GLEXA</p>

        <h1>
          Let&apos;s create something
          <span> valuable together.</span>
        </h1>

        <p>
          Have a question or project in mind? Connect with the Glexa Digital
          team and let&apos;s discuss the right solution for your business.
        </p>
      </section>

      <section className="contactPageSection">
        <div className="contactInformation">
          <p className="tag">GET IN TOUCH</p>
          <h2>Start the conversation.</h2>

          <p>
            Contact us for media production, content creation, websites,
            automation, digital advertising, data analysis and Power BI
            dashboards.
          </p>

          <div className="contactDetailsGrid">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;

              return (
                <a
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contactDetailCard"
                  key={detail.title}
                >
                  <div className="contactDetailIcon">
                    <Icon size={23} />
                  </div>

                  <span>
                    <small>{detail.title}</small>
                    <strong>{detail.value}</strong>
                  </span>
                </a>
              );
            })}
          </div>

          <div className="contactLocation">
            <MapPin size={25} />

            <div>
              <small>Our Location</small>
              <strong>
               Offices 41–43, Second Floor, Liberty Mall, Tehkal Bala,
               University Road, Peshawar, Pakistan
              </strong>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}