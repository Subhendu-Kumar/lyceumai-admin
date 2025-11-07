import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

import type { Metadata } from "next";

import AuthProvider from "@/providers/auth.provider";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lyceum AI Admin",
  manifest: "/manifest.json",
  description: "Admin panel for managing Lyceum AI",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "lyceumai admin",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased select-none`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
