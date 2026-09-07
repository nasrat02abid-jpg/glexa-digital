import Image from "next/image";
import styles from "./TeamSection.module.css";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const teamMembers = [
  {
    name: "Nasrat Abid",
    role: "Founder & Technology Lead",
    image: "/team/nasrat-abid.png",
    description:
      "Leading AI solutions, web development, data analytics, Power BI and digital advertising.",
    skills: [
      "AI Solutions",
      "Web Development",
      "Data & Power BI",
      "Digital Advertising",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/nasrat02abid-jpg",
        icon: FaGithub,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/nasrat-abid-105812364/",
        icon: FaLinkedinIn,
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/ab.id.3285/",
        icon: FaFacebookF,
      },
    ],
  },
  {
    name: "Syed Muzammil Raza",
    role: "Creative & Social Media Lead",
    image: "/team/syed-muzammil-raza.png",
    description:
      "Managing social media, content planning, creative campaigns and brand communication.",
    skills: [
      "Social Media",
      "Content Planning",
      "Creative Campaigns",
      "Brand Communication",
    ],
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/syed.muzii",
        icon: FaInstagram,
      },
    ],
  },
];

export default function TeamSection() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p className="tag">OUR TEAM</p>

        <h2>Meet the people behind Glexa Digital.</h2>

        <p>
          Creative and technical expertise working together to build better
          brands, systems and digital experiences.
        </p>
      </div>

      <div className={styles.grid}>
        {teamMembers.map((member, index) => (
          <article className={styles.card} key={member.name}>
            <div className={styles.photo}>
              <Image
                src={member.image}
                alt={`${member.name} — ${member.role}`}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>

            <div className={styles.content}>
              <span className={styles.role}>{member.role}</span>

              <h3>{member.name}</h3>

              <p className={styles.description}>{member.description}</p>

              <div className={styles.skills}>
                {member.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <div className={styles.socials}>
                {member.links.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      href={link.href}
                      key={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on ${link.label}`}
                      title={link.label}
                    >
                      <Icon size={19} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}