import type { Metadata } from "next";

// import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth/context";

import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome to Med Helper",
  description: "Your intelligent AI health companion for personalized advice, lab test analysis, and health tracking.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProvider>
          <Toaster />
          {/* <SessionProvider>{children}</SessionProvider> */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
