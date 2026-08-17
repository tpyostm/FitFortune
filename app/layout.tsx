import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

// A static export has no request to read the host from, so the Pages build
// pins the canonical origin instead. Server builds keep deriving it per
// request, which is what makes preview and production URLs self-describing.
const staticSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function resolveBaseUrl(): Promise<URL> {
  if (staticSiteUrl) return new URL(staticSiteUrl);

  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "localhost:3000";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return new URL(`${protocol}://${host}`);
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await resolveBaseUrl();
  const title = "FITFORTUNE — เปิดดวง ฟิตสุขภาพ";
  const description = "เปิดไพ่สุขภาพประจำวัน แล้วขยับร่างกายไปกับ FITFORTUNE";
  const socialImage = new URL("/og-v3.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title,
    description,
    icons: { icon: "/favicon.svg" },
    openGraph: { title, description, type: "website", images: [{ url: socialImage, width: 1734, height: 907, alt: "FITFORTUNE เปิดดวง ฟิตสุขภาพ" }] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
