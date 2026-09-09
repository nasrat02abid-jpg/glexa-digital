import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Glexa Digital",
  description: "Secure administrator access for Glexa Digital.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <main className="adminLoginPage">
      <section className="adminLoginPanel">
        <Link href="/" className="adminLoginBrand">
          <Image
            src="/glexa-logo.png"
            alt="Glexa Digital"
            width={170}
            height={85}
            priority
          />
        </Link>

        <AdminLoginForm />

        <Link href="/" className="adminBackLink">
          ← Return to website
        </Link>
      </section>

      <section className="adminLoginVisual">
        <p className="tag">GLEXA CONTROL CENTER</p>

        <h2>
          Manage every opportunity from
          <span> one secure workspace.</span>
        </h2>

        <p>
          Review customer inquiries, project quotation requests and job
          applications from the Glexa Digital dashboard.
        </p>
      </section>
    </main>
  );
}