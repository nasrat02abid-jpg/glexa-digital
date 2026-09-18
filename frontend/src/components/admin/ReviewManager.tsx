"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, Star, Trash2 } from "lucide-react";

import {
  CustomerReview,
  deleteCustomerReview,
  getCustomerReviews,
  moderateCustomerReview,
} from "@/lib/admin-api";
import { reviewPhotoUrl } from "@/lib/reviews-api";

type Props = { onCountChange?: (count: number) => void };

export default function ReviewManager({ onCountChange }: Props) {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getCustomerReviews()
      .then((data) => {
        if (!active) return;
        setReviews(data);
        onCountChange?.(data.length);
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "Unable to load reviews.");
      });

    return () => { active = false; };
  }, [onCountChange]);

  const update = async (item: CustomerReview, status: string, featured = item.is_featured) => {
    setBusyId(item.id);
    setError("");
    try {
      const updated = await moderateCustomerReview(item.id, status, featured);
      setReviews((current) => current.map((review) => review.id === item.id ? updated : review));
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update review.");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (item: CustomerReview) => {
    if (!window.confirm(`Delete the review from ${item.customer_name}?`)) return;
    setBusyId(item.id);
    try {
      await deleteCustomerReview(item.id);
      setReviews((current) => current.filter((review) => review.id !== item.id));
      onCountChange?.(reviews.length - 1);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete review.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="adminReviewsManager">
      {error && <div className="adminDashboardError" role="alert">{error}</div>}
      <div className="adminReviewList">
        {reviews.map((item) => (
          <article className="adminReviewCard" key={item.id}>
            <div className="adminReviewTop">
              <div className="adminReviewCustomer">
                {item.photo_url && (
                  <img
                    src={reviewPhotoUrl(item.photo_url) || ""}
                    alt={`${item.customer_name} profile`}
                  />
                )}
                <div>
                <strong>{item.customer_name}</strong>
                <span>{item.company || "Individual customer"} · {item.service}</span>
                </div>
              </div>
              <div className="adminReviewStars" aria-label={`${item.rating} stars`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} size={16} fill={index < item.rating ? "currentColor" : "none"} />
                ))}
              </div>
            </div>
            <p>{item.review}</p>
            <div className="adminReviewControls">
              <select
                value={item.status}
                disabled={busyId === item.id}
                onChange={(event) => void update(item, event.target.value)}
                className={`adminStatusSelect status-${item.status}`}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <label>
                <input
                  type="checkbox"
                  checked={item.is_featured}
                  disabled={item.status !== "approved" || busyId === item.id}
                  onChange={(event) => void update(item, item.status, event.target.checked)}
                />
                Featured on homepage
              </label>
              <button type="button" onClick={() => void remove(item)} disabled={busyId === item.id}>
                {busyId === item.id ? <LoaderCircle size={16} className="loadingSpinner" /> : <Trash2 size={16} />}
                Delete
              </button>
            </div>
          </article>
        ))}
        {!reviews.length && <div className="adminEmptyState">No customer reviews yet.</div>}
      </div>
    </div>
  );
}
