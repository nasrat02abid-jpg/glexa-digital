import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://glexadigital.com"),
  title: {
    default: "Glexa Digital | Media & Technology Agency",
    template: "%s | Glexa Digital",
  },
  description:
    "Glexa Digital provides media production, content creation, web development, WhatsApp automation, digital advertising and data analytics services.",
  keywords: [
    "Glexa Digital",
    "Digital agency Peshawar",
    "Web development",
    "Videography",
    "Photography",
    "Meta Ads",
    "TikTok Ads",
    "Google Ads",
    "WhatsApp automation",
    "Power BI",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Glexa Digital",
    description: "Media, technology and growth—connected.",
    url: "https://glexadigital.com",
    siteName: "Glexa Digital",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}