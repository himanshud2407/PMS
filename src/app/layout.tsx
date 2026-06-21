import type { Metadata, Viewport } from "next";
import "../index.css";

export const viewport: Viewport = {
  themeColor: "#59AFB5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Dr Baviskar Pathology lab | Best Pathology Lab in Pune",
    template: "%s | Dr Baviskar Pathology lab",
  },
  description:
    "Dr Baviskar Pathology lab - The best pathology lab in Pune. Offering accurate blood tests, full body checkups, and specialized diagnostics with 24/7 care.",
  keywords: [
    "Pathology lab near Pune",
    "Blood test Pune",
    "Diagnostic center Pune",
    "Dr Baviskar Pathology lab",
    "Full body checkup Pune",
    "Lab tests Pune",
    "Home blood collection Pune",
  ],
  authors: [{ name: "Dr Baviskar Pathology lab" }],
  creator: "Dr Baviskar Pathology lab",
  publisher: "Dr Baviskar Pathology lab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://drbaviskarpathlabs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dr Baviskar Pathology lab | Best Diagnostic Center in Pune",
    description:
      "Accurate, reliable, and fast diagnostic services in Pune. Book your health tests today.",
    url: "https://drbaviskarpathlabs.com",
    siteName: "Dr Baviskar Pathology lab",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://drbaviskarpathlabs.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Dr Baviskar Pathology lab Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Baviskar Pathology lab | Best Diagnostic Center in Pune",
    description: "Accurate, reliable, and fast diagnostic services in Pune.",
    images: ["https://drbaviskarpathlabs.com/logo.png"],
  },
  other: {
    "fb:app_id": "1024358177243492",
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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Dr Baviskar Pathology lab",
      "url": "https://drbaviskarpathlabs.com",
      "logo": "https://drbaviskarpathlabs.com/logo.png"
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Dr Baviskar Pathology lab",
      "logo": "https://drbaviskarpathlabs.com/logo.png",
      "image": "https://drbaviskarpathlabs.com/nav-logo.png",
      "@id": "https://drbaviskarpathlabs.com",
      "url": "https://drbaviskarpathlabs.com",
      "telephone": "+91-86052 92626",
      "email": "info@drbaviskarpathlabs.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No 1, Bhalerao Corner, Near Vijay Sales, Rahatani Road, Pimple Saudagar",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411027",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 18.5911,
        "longitude": 73.7915
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "08:00",
          "closes": "16:00"
        }
      ],
      "sameAs": [
        "https://facebook.com/drbaviskarpathlabs",
        "https://twitter.com/drbaviskarpathlabs",
        "https://instagram.com/drbaviskarpathlabs"
      ]
    }
  ];

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden">
        <div id="root">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
