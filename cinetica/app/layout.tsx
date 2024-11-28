"use client";

import { SessionProvider } from "next-auth/react"; // Import du SessionProvider
import "./globals.css";
import { PropsWithChildren } from "react";


export default function RootLayout({
  children,
}: PropsWithChildren<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
