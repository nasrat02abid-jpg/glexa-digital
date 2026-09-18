import { API_URL } from "@/lib/admin-api";

export type CustomerReview = {
  id: number;
  customer_name: string;
  company: string | null;
  service: string;
  rating: number;
  review: string;
  photo_url: string | null;
  status: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.detail || "Unable to complete the request.");
  }
  return data as T;
}

export async function getPublishedReviews(featured?: boolean) {
  const query = featured === undefined ? "" : `?featured=${featured}&limit=6`;
  const response = await fetch(`${API_URL}/api/reviews${query}`, {
    cache: "no-store",
  });
  return parseResponse<CustomerReview[]>(response);
}

export function reviewPhotoUrl(path: string | null) {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_URL}${path}`;
}

export async function submitCustomerReview(formData: FormData) {
  const response = await fetch(`${API_URL}/api/reviews`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });
  return parseResponse<CustomerReview>(response);
}
