import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "@/lib/utils/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteConfig = config.getConfig("site") as any as any;

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.site.author }],
  creator: siteConfig.site.author,
  publisher: siteConfig.site.author,
  metadataBase: new URL(siteConfig.site.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.site.url,
    siteName: siteConfig.site.name,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.site.name,
      },
    ],
    locale: siteConfig.site.language,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.seo.ogImage],
    creator: siteConfig.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function Header() {
  return (
    <nav className="tp-nav sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <img
                src="/images/techpulsedaily.png"
                alt="TechPulse Daily"
                className="tp-logo"
              />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {/* Admin button removed for cleaner public interface */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.site.language}>
      <head>
        <link rel="icon" href={siteConfig.site.favicon} />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <meta name="theme-color" content="#00D4AA" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.site.name,
              description: siteConfig.site.description,
              url: siteConfig.site.url,
              publisher: {
                "@type": "Organization",
                name: siteConfig.site.author,
                logo: {
                  "@type": "ImageObject",
                  url: `${siteConfig.site.url}${siteConfig.site.logo}`,
                },
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
