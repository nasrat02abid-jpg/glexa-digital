import Link from "next/link";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export default function HomePortfolioSection() {
  return (
    <section className="portfolioSection">
      <div className="sectionIntro">
        <p className="tag">FEATURED PROJECTS</p>
        <h2>Selected work built to perform.</h2>
        <Link href="/portfolio">View all projects</Link>
      </div>
      <PortfolioGrid featured limit={4} />
    </section>
  );
}
