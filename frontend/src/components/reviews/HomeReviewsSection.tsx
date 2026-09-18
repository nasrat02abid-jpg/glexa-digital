"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { CustomerReview, getPublishedReviews } from "@/lib/reviews-api";

export default function HomeReviewsSection() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);

  useEffect(() => {
    getPublishedReviews(true).then(setReviews).catch(() => setReviews([]));
  }, []);

  if (!reviews.length) return null;

  return (
    <section className="homeReviews">
      <div className="sectionHeading">
        <div>
          <p className="tag">CUSTOMER REVIEWS</p>
          <h2>Real feedback from real businesses.</h2>
        </div>
        <p>Verified experiences shared by customers who worked with Glexa Digital.</p>
      </div>
      <div className="homeReviewsGrid">
        {reviews.slice(0, 3).map((item) => (
          <article key={item.id}>
            <div className="homeReviewStars">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={17} fill={index < item.rating ? "currentColor" : "none"} />
              ))}
            </div>
            <p>“{item.review}”</p>
            <strong>{item.customer_name}</strong>
            <span>{item.company || item.service}</span>
          </article>
        ))}
      </div>
      <div className="buttons">
        <Link href="/reviews" className="secondaryButton">Read or Write a Review</Link>
      </div>
    </section>
  );
}
