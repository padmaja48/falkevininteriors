import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { siteConfig } from "@/content/site.config";
import { theme, themeToCssVars } from "@/content/theme.config";
import { getLocalBusinessJsonLd } from "@/lib/jsonld";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: theme.colors.background,
};

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.titleDefault,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.company,
    title: siteConfig.seo.titleDefault,
    description: siteConfig.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.titleDefault,
    description: siteConfig.seo.description,
  },
  alternates: {
    canonical: siteConfig.seo.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getLocalBusinessJsonLd();

  return (
    <html lang="en" className={`${heading.variable} ${body.variable} h-full`}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { ${themeToCssVars()} }`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background font-body text-text antialiased">
        {children}
      </body>
    </html>
  );
}
