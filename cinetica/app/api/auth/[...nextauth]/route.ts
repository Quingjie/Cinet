// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google"
import { RequestInternal } from "next-auth";
import { users } from "@/repository/user";  // Assure-toi que ce chemin est correct

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Ne pas intervenir si Google ou un autre provider est utilisé
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
    
        const user = users.find((user) => user.username === credentials.email);
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            email: user.username,
            name: user.name,
            apiKey: user.apiKey,
          };
        }
        return null;
      },
    }),    
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // Ajouter les informations utilisateur au token JWT
      if (user) {
        token.id = user.id || token.id;
        token.email = user.email || token.email;
        token.name = user.name || token.name;
        token.apiKey = user.apiKey;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Ajouter les informations utilisateur à la session
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.apiKey = token.apiKey as string;
      }
      return session;
    },
    events: {
      async signOut({ token }: { token: any }) {
        // Si un utilisateur se déconnecte via Google, révoquez sa session OAuth
        if (token?.provider === "google") {
          const logoutUrl = `https://accounts.google.com/o/oauth2/revoke?token=${token.accessToken}`;
          await fetch(logoutUrl); // Révoquez l'accès Google
        }
      },
    },
  },
  pages: {
    signIn: "/login", // Rediriger vers la page de connexion
  },
  session: {
    strategy: "jwt" as const, // Utilisation de JWT pour la gestion de la session
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };