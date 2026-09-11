import { API_URL, PortfolioProject } from "@/lib/admin-api";

export function portfolioImageUrl(path: string) {
  return path.startsWith("http") ? path : `${API_URL}${path}`;
}

export async function getPublicPortfolio(options?: {
  featured?: boolean;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (options?.featured !== undefined) {
    params.set("featured", String(options.featured));
  }
  if (options?.limit) params.set("limit", String(options.limit));

  const response = await fetch(
    `${API_URL}/api/portfolio?${params.toString()}`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) return [] as PortfolioProject[];
  return (await response.json()) as PortfolioProject[];
}
