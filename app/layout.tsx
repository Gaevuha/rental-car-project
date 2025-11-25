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

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Car rental service project",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
