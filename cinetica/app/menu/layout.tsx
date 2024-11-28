'use client'; // Pour s'assurer que ce fichier est rendu côté client

import { SidebarProvider } from "@/components/ui/sidebar";
import { ApplicationLayout } from "./design/ApplicationLayout";
import { AppSidebar } from "./design/sidebar";
import { Content } from "./design/content"; // Contiendra la logique de protection
import { Header } from "./design/header";
import "../globals.css";
import { SessionProvider } from "next-auth/react"; // Importation de SessionProvider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export default function MenuLayout({
  children,
}: PropsWithChildren<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased"
        style={{
          margin: 0,
          padding: 0,
          width: "100vw", 
          height: "100vh",        }}>
        <SessionProvider>
          <SidebarProvider>
            <ApplicationLayout>
              <Header/>
              <AppSidebar />
              <main>
                <Content>
                  <QueryClientProvider client={queryClient}>
                    {children}
                  </QueryClientProvider>
                </Content>
              </main>
            </ApplicationLayout>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
