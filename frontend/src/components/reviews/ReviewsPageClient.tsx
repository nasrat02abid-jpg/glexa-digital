"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, ImagePlus, LoaderCircle, Quote, Star } from "lucide-react";

import {
  CustomerReview,
  getPublishedReviews,
  reviewPhotoUrl,
  submitCustomerReview,
} from "@/lib/reviews-api";
import styles from "./ReviewsPageClient.module.css";

const services = [
  "Web Development",
  "Digital Advertising",
  "Media Production",
  "Content Creation",
  "WhatsApp Automation",
  "Data Analytics & Power BI",
  "Other",
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={18} fill={index < rating ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

export default function ReviewsPageClient() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let active = true;

    getPublishedReviews()
      .then((data) => {
        if (active) setReviews(data);
      })
      .catch(() => {
        if (active) setError("Published reviews could not be loaded right now.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("rating", String(rating));
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await submitCustomerReview(formData);
      form.reset();
      setRating(5);
      setSuccess(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className="tag">CUSTOMER REVIEWS</p>
        <h1>Honest feedback builds better work.</h1>
        <p>
          Worked with Glexa Digital? Share your genuine experience and help
          other businesses make a confident decision.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.formCard}>
          <div>
            <p className="tag">SHARE YOUR EXPERIENCE</p>
            <h2>Write an honest review</h2>
            <p>Your review will appear publicly after verification.</p>
          </div>

          {success && (
            <div className={styles.success} role="status">
              <CheckCircle2 size={21} />
              Thank you. Your review was submitted for verification.
            </div>
          )}
          {error && <div className={styles.error} role="alert">{error}</div>}

          <form onSubmit={submit}>
            <div className={styles.twoColumns}>
              <label>
                Your name
                <input name="customer_name" minLength={2} maxLength={120} required />
              </label>
              <label>
                Business name <span>(optional)</span>
                <input name="company" maxLength={160} />
              </label>
            </div>

            <label>
              Service used
              <select name="service" required defaultValue="">
                <option value="" disabled>Select a service</option>
                {services.map((service) => <option key={service}>{service}</option>)}
              </select>
            </label>

            <fieldset className={styles.ratingField}>
              <legend>Your rating</legend>
              <div className={styles.ratingButtons}>
                {Array.from({ length: 5 }, (_, index) => index + 1).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`Rate ${value} stars`}
                    aria-pressed={rating === value}
                    onClick={() => setRating(value)}
                  >
                    <Star size={28} fill={value <= rating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </fieldset>

            <label className={styles.photoUpload}>
              <ImagePlus size={22} />
              <span>
                <strong>Your photo</strong>
                JPG, PNG or WebP · Maximum 5 MB
              </span>
              <input
                name="photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                required
              />
            </label>

            <label>
              Your honest review
              <textarea
                name="review"
                rows={6}
                minLength={20}
                maxLength={2000}
                required
                placeholder="Tell us what we did well and what we could improve..."
              />
            </label>

            <label className={styles.honeypot} aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>

            <button className={styles.submitButton} disabled={submitting}>
              {submitting && <LoaderCircle size={18} className={styles.spin} />}
              Submit Review
            </button>
          </form>
        </div>

        <div className={styles.reviewsColumn}>
          <div className={styles.listHeading}>
            <p className="tag">VERIFIED FEEDBACK</p>
            <h2>What our customers say</h2>
          </div>

          {loading && <p className={styles.loading}>Loading reviews...</p>}
          {!loading && !reviews.length && (
            <div className={styles.empty}>Be the first customer to share a review.</div>
          )}

          <div className={styles.reviewList}>
            {reviews.map((item) => (
              <article key={item.id} className={styles.reviewCard}>
                <Quote size={28} className={styles.quoteIcon} />
                <Stars rating={item.rating} />
                <p className={styles.reviewText}>{item.review}</p>
                <div className={styles.customer}>
                  {item.photo_url ? (
                    <img
                      src={reviewPhotoUrl(item.photo_url) || ""}
                      alt={`${item.customer_name} profile`}
                    />
                  ) : (
                    <span>{item.customer_name.charAt(0).toUpperCase()}</span>
                  )}
                  <div>
                    <strong>{item.customer_name}</strong>
                    <small>{item.company || item.service}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
