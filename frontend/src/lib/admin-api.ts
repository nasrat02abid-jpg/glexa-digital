export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const TOKEN_KEY = "glexa_admin_token";

export type AdminLoginResponse = {
  access_token: string;
  token_type: string;
};

export type DashboardStats = {
  inquiries: number;
  quotes: number;
  applications: number;
  total: number;
};

export type Inquiry = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

export type QuoteRequest = {
  id: number;
  full_name: string;
  company: string | null;
  email: string;
  phone: string;
  service: string;
  budget: string;
  deadline: string | null;
  details: string;
  status: string;
  created_at: string;
};

export type JobApplication = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio: string | null;
  message: string;
  cv_original_name: string;
  status: string;
  created_at: string;
};

type RecordType = "inquiries" | "quotes" | "applications";

export async function loginAdmin(
  email: string,
  password: string
): Promise<AdminLoginResponse> {
  const response = await fetch(`${API_URL}/api/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || "Unable to sign in.");
  }

  return data;
}

export function saveAdminToken(token: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}

export function getAdminToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return sessionStorage.getItem(TOKEN_KEY);
}

export function removeAdminToken() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

async function adminRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAdminToken();

  if (!token) {
    throw new Error("Your admin session has expired.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    removeAdminToken();
    throw new Error("Your admin session has expired.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || "Unable to complete the request.");
  }

  return data as T;
}

export function getDashboardStats() {
  return adminRequest<DashboardStats>("/api/admin/dashboard/stats");
}

export function getInquiries() {
  return adminRequest<Inquiry[]>("/api/admin/inquiries?skip=0&limit=100");
}

export function getQuotes() {
  return adminRequest<QuoteRequest[]>("/api/admin/quotes?skip=0&limit=100");
}

export function getApplications() {
  return adminRequest<JobApplication[]>(
    "/api/admin/applications?skip=0&limit=100"
  );
}

export function updateRecordStatus(
  type: RecordType,
  id: number,
  status: string
) {
  return adminRequest(
    `/api/admin/${type}/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );
}

export async function downloadApplicationCv(
  applicationId: number,
  originalName: string
) {
  const token = getAdminToken();

  if (!token) {
    throw new Error("Your admin session has expired.");
  }

  const response = await fetch(
    `${API_URL}/api/admin/applications/${applicationId}/cv`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 401) {
    removeAdminToken();
    throw new Error("Your admin session has expired.");
  }

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.detail || "Unable to download the CV.");
  }

  const fileBlob = await response.blob();
  const downloadUrl = URL.createObjectURL(fileBlob);
  const anchor = document.createElement("a");

  anchor.href = downloadUrl;
  anchor.download = originalName || "candidate-cv";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(downloadUrl);
}