import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

import type { Metadata } from "next";

import AuthProvider from "@/providers/auth.provider";

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
  description: "Admin panel for managing Lyceum AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased select-none`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
