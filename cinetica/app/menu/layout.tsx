'use client'; // Pour s'assurer que ce fichier est rendu côté client

import { SidebarProvider } from "@/components/ui/sidebar";
import { ApplicationLayout } from "./design/ApplicationLayout";
import { AppSidebar } from "./design/sidebar";
import { Content } from "./design/content"; // Contiendra la logique de protection
import { Header } from "./design/header";
import "../globals.css";
import Image from "next/image";
import localFont from "next/font/local";
import Logo from "../logo1.jpg";
import { SessionProvider } from "next-auth/react"; // Importation de SessionProvider

const anton = localFont({
  src: "../fonts/Anton,Antonio/Anton/Anton-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-anton",
});

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <SessionProvider>
          <SidebarProvider>
            <ApplicationLayout>
              <Header>
                <div className="flex items-center space-x-4">
                  <Image
                    src={Logo}
                    alt="Logo"
                    className="w-16 h-16 items-center rounded-full"
                  />
                  <h1 className={`text-2xl ${anton.className}`}>Cinetica</h1>
                </div>
                <div className="ml-auto">
                  <input placeholder="Search" className="p-2 border rounded" />
                </div>
              </Header>
              <AppSidebar />
              <main>
                <Content>{children}</Content>
              </main>
            </ApplicationLayout>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
