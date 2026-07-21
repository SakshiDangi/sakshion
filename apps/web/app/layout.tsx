import "./globals.css";

import type { Metadata } from "next";

import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus",
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

import Providers from "@/providers";

export const metadata: Metadata = {
  title: "Sakshion",
  description: "Adaptive AI Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
      className={`
      ${plusJakarta.variable}
      ${jetBrains.variable}
      antialiased
      `}
      >
        <Providers>

            {children}

        </Providers>
      </body>
    </html>
  );
}