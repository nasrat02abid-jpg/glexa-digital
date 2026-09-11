import { ExternalLink } from "lucide-react";

import { getPublicPortfolio } from "@/lib/portfolio-api";
import { portfolioImageUrl } from "@/lib/portfolio-api";
import styles from "./PortfolioGrid.module.css";

type Props = { featured?: boolean; limit?: number };

export default async function PortfolioGrid({ featured, limit }: Props) {
  const projects = await getPublicPortfolio({ featured, limit });

  if (!projects.length) {
    return <p className={styles.empty}>New projects are coming soon.</p>;
  }

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <article key={project.id} className={styles.card}>
          <div className={styles.imageWrap}>
            <img src={portfolioImageUrl(project.image_url)} alt={project.title} />
            <span>{project.category}</span>
          </div>
          <div className={styles.body}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            {project.services && <small>{project.services}</small>}
            {project.project_url && (
              <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                View Project <ExternalLink size={16} />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
