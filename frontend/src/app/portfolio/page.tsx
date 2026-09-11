import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import styles from "./page.module.css";

export const metadata = {
  title: "Portfolio | Glexa Digital",
  description: "Explore selected media, technology, advertising and data projects by Glexa Digital.",
};

export default function PortfolioPage() {
  return (
    <main>
      <section className={styles.hero}>
        <p>OUR WORK</p>
        <h1>Ideas brought to life through <span>creative technology.</span></h1>
        <div>Explore selected work across media production, web development, digital advertising, automation and data.</div>
      </section>
      <section className={styles.projects}>
        <div className={styles.heading}>
          <div><p>SELECTED PROJECTS</p><h2>Work that creates real value.</h2></div>
          <span>Each project combines clear strategy, polished execution and measurable business purpose.</span>
        </div>
        <PortfolioGrid />
      </section>
    </main>
  );
}
