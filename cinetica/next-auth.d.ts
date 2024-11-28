// next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"]; // Ajoute les types par défaut
  }

  interface User {
    id: string;
    email: string;
  }
}
