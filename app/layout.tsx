import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import Header from "@/components/Header/Header";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://rental-car-project-orcin.vercel.app";
const DEFAULT_IMAGE = "/img/rental-car.webp";

// Базові метатеги для всіх сторінок
export const metadata: Metadata = {
  title: "Rental Car - Premium Car Rental Service",
  description:
    "Find and rent the perfect car for your needs. Wide selection of premium vehicles at affordable prices.",
  keywords: "car rental, rent a car, premium cars, affordable rental",
  authors: [{ name: "Rental Car Team" }],
  openGraph: {
    type: "website",
    siteName: "Rental Car",
    title: "Rental Car - Premium Car Rental Service",
    description:
      "Find and rent the perfect car for your needs. Wide selection of premium vehicles at affordable prices.",
    url: SITE_URL,
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: "Rental Car - Premium Car Rental Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rental Car - Premium Car Rental Service",
    description:
      "Find and rent the perfect car for your needs. Wide selection of premium vehicles at affordable prices.",
    images: [DEFAULT_IMAGE],
    creator: "@rentalcar",
  },
  other: {
    "telegram:channel": SITE_URL,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/webp",
  },
};

export function generatePageMetadata(
  pageType: "home" | "catalog" | "details",
  additionalData?: {
    carTitle?: string;
    carDescription?: string;
    carImage?: string;
  }
): Metadata {
  const baseUrl = SITE_URL;

  const metadataMap = {
    home: {
      title: "Rental Car - Premium Car Rental Service",
      description:
        "Find and rent the perfect car for your needs. Wide selection of premium vehicles at affordable prices.",
      url: baseUrl,
      image: DEFAULT_IMAGE,
    },
    catalog: {
      title: "Car Catalog - Rental Car",
      description:
        "Browse our extensive catalog of rental cars. Find the perfect vehicle for your trip or business needs.",
      url: `${baseUrl}/catalog`,
      image: DEFAULT_IMAGE,
    },
    details: {
      title: additionalData?.carTitle
        ? `${additionalData.carTitle} - Rental Car`
        : "Car Details - Rental Car",
      description:
        additionalData?.carDescription ||
        "View detailed information about this rental car. Specifications, features, and rental options.",
      url: `${baseUrl}/catalog/${
        additionalData?.carTitle?.toLowerCase().replace(/\s+/g, "-") ||
        "details"
      }`,
      image: additionalData?.carImage || DEFAULT_IMAGE,
    },
  };

  const pageMeta = metadataMap[pageType];

  return {
    title: pageMeta.title,
    description: pageMeta.description,
    openGraph: {
      type: pageType === "home" ? "website" : "article",
      siteName: "Rental Car",
      title: pageMeta.title,
      description: pageMeta.description,
      url: pageMeta.url,
      images: [
        {
          url: pageMeta.image,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageMeta.title,
      description: pageMeta.description,
      images: [pageMeta.image],
    },
    other: {
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:type": "image/webp",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={manrope.variable}>
        <Header />
        <main className="mainContent">{children}</main>
      </body>
    </html>
  );
}
