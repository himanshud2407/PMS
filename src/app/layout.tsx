import type { Metadata, Viewport } from "next";
import "../index.css";

export const viewport: Viewport = {
  themeColor: "#59AFB5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Dr. Baviskar Pathology Lab | Best Pathology Lab in Pune",
    template: "%s | Dr. Baviskar Pathology Lab",
  },
  description: "Dr. Baviskar Pathology Lab - The best pathology lab in Pune. Offering accurate blood tests, full body checkups, and specialized diagnostics with 24/7 care.",
  keywords: ["Pathology lab near Pune", "Blood test Pune", "Diagnostic center Pune", "Dr. Baviskar Lab", "Full body checkup Pune", "Lab tests Pune", "Home blood collection Pune"],
  authors: [{ name: "Dr. Baviskar Pathology Lab" }],
  creator: "Dr. Baviskar Pathology Lab",
  publisher: "Dr. Baviskar Pathology Lab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://drbaviskarlab.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dr. Baviskar Pathology Lab | Best Diagnostic Center in Pune",
    description: "Accurate, reliable, and fast diagnostic services in Pune. Book your health tests today.",
    url: "https://drbaviskarlab.com",
    siteName: "Dr. Baviskar Pathology Lab",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Baviskar Pathology Lab | Best Diagnostic Center in Pune",
    description: "Accurate, reliable, and fast diagnostic services in Pune.",
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

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Dr. Baviskar Pathology Lab",
    "image": "https://drbaviskarlab.com/nav-logo.png",
    "@id": "https://drbaviskarlab.com",
    "url": "https://drbaviskarlab.com",
    "telephone": "+91-86052 92626",
    "email": "info@drbaviskar.com",
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
      "https://facebook.com/drbaviskarlab",
      "https://twitter.com/drbaviskarlab",
      "https://instagram.com/drbaviskarlab"
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div id="root">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
