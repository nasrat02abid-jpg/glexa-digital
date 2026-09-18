import type { Metadata } from "next";
import ReviewsPageClient from "@/components/reviews/ReviewsPageClient";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Read verified customer feedback or share your honest experience with Glexa Digital.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return <ReviewsPageClient />;
}
