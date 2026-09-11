import Link from "next/link";

import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export default function HomePortfolioSection() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="sectionHeading">
        <div>
          <p className="tag">OUR PORTFOLIO</p>
          <h2>Selected work that creates real impact.</h2>
        </div>

        <p>
          Explore featured creative, technology and growth projects
          delivered by Glexa Digital.
        </p>
      </div>

      <PortfolioGrid featured limit={4} />

      <div className="buttons">
        <Link href="/portfolio" className="secondaryButton">
          View Full Portfolio
        </Link>
      </div>
    </section>
  );
}