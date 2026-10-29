import type { Metadata } from "next";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";

export const metadata: Metadata = {
  title: "Just Relax Spa | Ultra-Luxury Men's Spa & Moroccan Hammam in Doha, Qatar",
  description:
    "Experience Doha's premier sanctuary for gentlemen. Authentic Moroccan baths, deep tissue therapy, jacuzzi hydrotherapy, and private VIP suites across West Bay and The Pearl-Qatar.",
  icons: {
    icon: [
      { url: "/assets/images/favicon.ico", sizes: "any" },
      { url: "/assets/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/images/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png" />
        <link
          rel="preload"
          href="/assets/fonts/instrument-sans-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/Cairo-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/tajawal-700-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="stylesheet" href="/assets/css/site.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e && (e.message && (/Loading chunk .* failed/i.test(e.message) || e.message.indexOf('ChunkLoadError') !== -1))) {
                  console.warn('ChunkLoadError detected: Auto-refreshing to sync with new server chunks...');
                  window.location.reload();
                }
              });
            `,
          }}
        />
      </head>
      <body>
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
