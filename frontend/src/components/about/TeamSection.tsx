import Image from "next/image";
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
    name: "Awais Khan",
    role: "Chairman",
    image: "/team/awais-khan.png",
    description:
      "Providing strategic leadership, business direction and long-term vision for Glexa Digital.",
    skills: [
      "Strategic Leadership",
      "Business Development",
      "Corporate Relations",
      "Growth Strategy",
    ],
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/awaiskhanlmar/",
        icon: FaLinkedinIn,
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/awais.khan.75839923",
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
    <section className="teamSection">
      <div className="teamHeading">
        <p className="tag">OUR TEAM</p>

        <h2>Meet the people behind Glexa Digital.</h2>

        <p>
          Creative and technical expertise working together to build better
          brands, systems and digital experiences.
        </p>
      </div>

      <div className="teamGrid">
        {teamMembers.map((member, index) => (
          <article className="teamCard" key={member.name}>
            <div className="teamPhoto">
              <Image
                src={member.image}
                alt={`${member.name} — ${member.role}`}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>

            <div className="teamContent">
              <span className="teamRole">{member.role}</span>

              <h3>{member.name}</h3>

              <p>{member.description}</p>

              <div className="teamSkills">
                {member.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <div className="teamSocials">
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