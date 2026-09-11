"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  BriefcaseBusiness,
  Download,
  FileText,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Mail,
  MessageSquareText,
  Images,
  RefreshCw,
  Users,
} from "lucide-react";

import {
  DashboardStats,
  Inquiry,
  JobApplication,
  QuoteRequest,
  downloadApplicationCv,
  getAdminToken,
  getApplications,
  getDashboardStats,
  getInquiries,
  getQuotes,
  removeAdminToken,
  updateRecordStatus,
} from "@/lib/admin-api";
import PortfolioManager from "@/components/admin/PortfolioManager";

type DashboardTab = "inquiries" | "quotes" | "applications" | "portfolio";
type RecordTab = Exclude<DashboardTab, "portfolio">;

const generalStatuses = [
  "new",
  "reviewing",
  "contacted",
  "completed",
  "archived",
];

const applicationStatuses = [
  "new",
  "reviewing",
  "shortlisted",
  "rejected",
  "hired",
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatStatus(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function AdminDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState<DashboardTab>("inquiries");

  const [stats, setStats] = useState<DashboardStats>({
    inquiries: 0,
    quotes: 0,
    applications: 0,
    total: 0,
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [applications, setApplications] =
    useState<JobApplication[]>([]);
  const [portfolioCount, setPortfolioCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [updatingRecord, setUpdatingRecord] = useState("");
  const [downloadingId, setDownloadingId] =
    useState<number | null>(null);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const [
        statsResult,
        inquiriesResult,
        quotesResult,
        applicationsResult,
      ] = await Promise.all([
        getDashboardStats(),
        getInquiries(),
        getQuotes(),
        getApplications(),
      ]);

      setStats(statsResult);
      setInquiries(inquiriesResult);
      setQuotes(quotesResult);
      setApplications(applicationsResult);
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Unable to load the dashboard.";

      setError(message);

      if (message.toLowerCase().includes("expired")) {
        removeAdminToken();
        router.replace("/admin/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }

    void loadDashboard();
  }, [loadDashboard, router]);

  const handleLogout = () => {
    removeAdminToken();
    router.replace("/admin/login");
  };

  const handleStatusChange = async (
    type: RecordTab,
    id: number,
    newStatus: string
  ) => {
    const recordKey = `${type}-${id}`;

    setUpdatingRecord(recordKey);
    setError("");

    try {
      await updateRecordStatus(type, id, newStatus);

      if (type === "inquiries") {
        setInquiries((current) =>
          current.map((item) =>
            item.id === id
              ? { ...item, status: newStatus }
              : item
          )
        );
      }

      if (type === "quotes") {
        setQuotes((current) =>
          current.map((item) =>
            item.id === id
              ? { ...item, status: newStatus }
              : item
          )
        );
      }

      if (type === "applications") {
        setApplications((current) =>
          current.map((item) =>
            item.id === id
              ? { ...item, status: newStatus }
              : item
          )
        );
      }
    } catch (statusError) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : "Unable to update the status."
      );
    } finally {
      setUpdatingRecord("");
    }
  };

  const handleCvDownload = async (
    application: JobApplication
  ) => {
    setDownloadingId(application.id);
    setError("");

    try {
      await downloadApplicationCv(
        application.id,
        application.cv_original_name
      );
    } catch (downloadError) {
      setError(
        downloadError instanceof Error
          ? downloadError.message
          : "Unable to download the CV."
      );
    } finally {
      setDownloadingId(null);
    }
  };

  if (isLoading) {
    return (
      <main className="adminDashboardLoading">
        <LoaderCircle className="loadingSpinner" size={38} />
        <p>Loading Glexa Digital dashboard...</p>
      </main>
    );
  }

  return (
    <main className="adminDashboardPage">
      <aside className="adminSidebar">
        <div className="adminSidebarBrand">
          <div className="adminSidebarLogo">
            <LayoutDashboard size={25} />
          </div>

          <div>
            <strong>Glexa Digital</strong>
            <span>Control Center</span>
          </div>
        </div>

        <nav className="adminNavigation">
          <button
            type="button"
            className={
              activeTab === "inquiries" ? "active" : ""
            }
            onClick={() => setActiveTab("inquiries")}
          >
            <MessageSquareText size={19} />
            Inquiries
            <span>{stats.inquiries}</span>
          </button>

          <button
            type="button"
            className={activeTab === "quotes" ? "active" : ""}
            onClick={() => setActiveTab("quotes")}
          >
            <FileText size={19} />
            Quotations
            <span>{stats.quotes}</span>
          </button>

          <button
            type="button"
            className={
              activeTab === "applications" ? "active" : ""
            }
            onClick={() => setActiveTab("applications")}
          >
            <Users size={19} />
            Applications
            <span>{stats.applications}</span>
          </button>

          <button
            type="button"
            className={activeTab === "portfolio" ? "active" : ""}
            onClick={() => setActiveTab("portfolio")}
          >
            <Images size={19} />
            Portfolio
            <span>{portfolioCount}</span>
          </button>
        </nav>

        <button
          type="button"
          className="adminLogoutButton"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          Sign Out
        </button>
      </aside>

      <section className="adminDashboardContent">
        <header className="adminDashboardHeader">
          <div>
            <p className="tag">ADMIN WORKSPACE</p>
            <h1>Dashboard Overview</h1>
            <p>
              Manage inquiries, quotations, candidates and portfolio projects.
            </p>
          </div>

          <button
            type="button"
            className="adminRefreshButton"
            onClick={() => void loadDashboard()}
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </header>

        {error && (
          <div className="adminDashboardError" role="alert">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div className="adminStatsGrid">
          <article>
            <span className="adminStatIcon total">
              <BriefcaseBusiness size={22} />
            </span>
            <div>
              <p>Total Records</p>
              <strong>{stats.total}</strong>
            </div>
          </article>

          <article>
            <span className="adminStatIcon inquiries">
              <MessageSquareText size={22} />
            </span>
            <div>
              <p>Inquiries</p>
              <strong>{stats.inquiries}</strong>
            </div>
          </article>

          <article>
            <span className="adminStatIcon quotes">
              <FileText size={22} />
            </span>
            <div>
              <p>Quotations</p>
              <strong>{stats.quotes}</strong>
            </div>
          </article>

          <article>
            <span className="adminStatIcon applications">
              <Users size={22} />
            </span>
            <div>
              <p>Applications</p>
              <strong>{stats.applications}</strong>
            </div>
          </article>
        </div>

        <section className="adminDataPanel">
          <div className="adminDataPanelHeader">
            <div>
              <h2>
                {activeTab === "inquiries" &&
                  "Customer Inquiries"}
                {activeTab === "quotes" &&
                  "Quotation Requests"}
                {activeTab === "applications" &&
                  "Job Applications"}
                {activeTab === "portfolio" &&
                  "Portfolio Management"}
              </h2>

              <p>
                {activeTab === "portfolio"
                  ? "Manage the projects shown on your website."
                  : "Newest submissions appear first."}
              </p>
            </div>
          </div>

          <div className="adminTableWrapper">
            {activeTab === "portfolio" && (
              <PortfolioManager onCountChange={setPortfolioCount} />
            )}
            {activeTab === "inquiries" && (
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Received</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td>
                        <strong>{inquiry.full_name}</strong>
                        <a href={`mailto:${inquiry.email}`}>
                          <Mail size={14} />
                          {inquiry.email}
                        </a>
                        <a href={`tel:${inquiry.phone}`}>
                          {inquiry.phone}
                        </a>
                      </td>

                      <td>{inquiry.subject}</td>

                      <td className="adminMessageCell">
                        {inquiry.message}
                      </td>

                      <td>{formatDate(inquiry.created_at)}</td>

                      <td>
                        <select
                          className={`adminStatusSelect status-${inquiry.status}`}
                          value={inquiry.status}
                          disabled={
                            updatingRecord ===
                            `inquiries-${inquiry.id}`
                          }
                          onChange={(event) =>
                            void handleStatusChange(
                              "inquiries",
                              inquiry.id,
                              event.target.value
                            )
                          }
                        >
                          {generalStatuses.map((status) => (
                            <option key={status} value={status}>
                              {formatStatus(status)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}

                  {!inquiries.length && (
                    <tr>
                      <td colSpan={5} className="adminEmptyState">
                        No inquiries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeTab === "quotes" && (
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Project</th>
                    <th>Budget</th>
                    <th>Details</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id}>
                      <td>
                        <strong>{quote.full_name}</strong>
                        <span>
                          {quote.company || "No company"}
                        </span>
                        <a href={`mailto:${quote.email}`}>
                          {quote.email}
                        </a>
                        <a href={`tel:${quote.phone}`}>
                          {quote.phone}
                        </a>
                      </td>

                      <td>
                        <strong>{quote.service}</strong>
                        <span>
                          Deadline: {quote.deadline || "Flexible"}
                        </span>
                      </td>

                      <td>{quote.budget}</td>

                      <td className="adminMessageCell">
                        {quote.details}
                      </td>

                      <td>
                        <select
                          className={`adminStatusSelect status-${quote.status}`}
                          value={quote.status}
                          disabled={
                            updatingRecord === `quotes-${quote.id}`
                          }
                          onChange={(event) =>
                            void handleStatusChange(
                              "quotes",
                              quote.id,
                              event.target.value
                            )
                          }
                        >
                          {generalStatuses.map((status) => (
                            <option key={status} value={status}>
                              {formatStatus(status)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}

                  {!quotes.length && (
                    <tr>
                      <td colSpan={5} className="adminEmptyState">
                        No quotation requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeTab === "applications" && (
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Position</th>
                    <th>Experience</th>
                    <th>Application</th>
                    <th>CV</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id}>
                      <td>
                        <strong>{application.full_name}</strong>
                        <a href={`mailto:${application.email}`}>
                          {application.email}
                        </a>
                        <a href={`tel:${application.phone}`}>
                          {application.phone}
                        </a>
                      </td>

                      <td>
                        <strong>{application.position}</strong>

                        {application.portfolio && (
                          <a
                            href={application.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View portfolio
                          </a>
                        )}
                      </td>

                      <td>{application.experience}</td>

                      <td className="adminMessageCell">
                        {application.message}
                      </td>

                      <td>
                        <button
                          type="button"
                          className="adminDownloadButton"
                          disabled={
                            downloadingId === application.id
                          }
                          onClick={() =>
                            void handleCvDownload(application)
                          }
                        >
                          {downloadingId === application.id ? (
                            <LoaderCircle
                              className="loadingSpinner"
                              size={17}
                            />
                          ) : (
                            <Download size={17} />
                          )}
                          Download
                        </button>
                      </td>

                      <td>
                        <select
                          className={`adminStatusSelect status-${application.status}`}
                          value={application.status}
                          disabled={
                            updatingRecord ===
                            `applications-${application.id}`
                          }
                          onChange={(event) =>
                            void handleStatusChange(
                              "applications",
                              application.id,
                              event.target.value
                            )
                          }
                        >
                          {applicationStatuses.map((status) => (
                            <option key={status} value={status}>
                              {formatStatus(status)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}

                  {!applications.length && (
                    <tr>
                      <td colSpan={6} className="adminEmptyState">
                        No job applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
