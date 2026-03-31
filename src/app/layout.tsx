import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/shared/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://youcefmegoura.online"),
  title: "Youcef Megoura — Backend & DevOps Engineer | Rennes, France",
  description:
    "Backend and DevOps Engineer with 6+ years of experience. Java, Spring Boot, Kotlin, Kubernetes, Docker.",
  openGraph: {
    title: "Youcef Megoura — Backend & DevOps Engineer",
    description:
      "Backend and DevOps Engineer with 6+ years of experience designing distributed systems and cloud infrastructure.",
    url: "https://youcefmegoura.online",
    siteName: "Youcef Megoura",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Youcef Megoura — Backend & DevOps Engineer",
    description:
      "Backend and DevOps Engineer with 6+ years of experience.",
    images: ["/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
