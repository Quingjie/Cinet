'use client'; // Pour s'assurer que ce fichier est rendu côté client

import { SidebarProvider } from "@/components/ui/sidebar";
import { ApplicationLayout } from "./design/ApplicationLayout";
import { AppSidebar } from "./design/sidebar";
import { Content } from "./design/content"; // Contiendra la logique de protection
import { Header } from "./design/header";
import "../globals.css";
import { SessionProvider } from "next-auth/react"; // Importation de SessionProvider


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
              <Header/>
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
