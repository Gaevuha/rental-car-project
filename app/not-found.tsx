// app/not-found.tsx
import styles from "@/app/Page.module.css";
import type { Metadata } from "next";
import NotFoundRedirect from "./NotFoundRedirect";

export const metadata: Metadata = {
  title: "404 | Car Rental — Page Not Found",
  description:
    "The page you are looking for does not exist or has been moved. Find your perfect rental car today.",
  metadataBase: new URL("https://your-domain.com"),

  openGraph: {
    title: "404 | Page Not Found — Car Rental",
    description:
      "This page could not be found. Browse our catalog of rental cars instead.",
    url: "/not-found",
    images: [
      {
        url: "/img/not-found.webp",
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
    type: "website",
    siteName: "Car Rental",
  },

  twitter: {
    card: "summary_large_image",
    title: "404 | Page Not Found — Car Rental",
    description: "This page does not exist. Choose your perfect rental car.",
    images: ["/img/not-found.webp"],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={styles.title}>404 - Page not found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <NotFoundRedirect />
    </div>
  );
}
