// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { RequestInternal } from "next-auth";
import { users } from "@/repository/user";  // Assure-toi que ce chemin est correct

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "method" | "headers" | "query">
      ): Promise<{ id: string; email: string; name: string; apiKey:string } | null> {
        // Vérifier si les informations sont présentes
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Recherche de l'utilisateur correspondant à l'email
        const user = users.find((user) => user.username === credentials.email);

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Retourner les informations utilisateur uniquement si la connexion est réussie
          return {
            id: user.id,
            email: user.username,
            name: user.name,
            apiKey: user.apiKey,
          };
        }

        return null;  // Si l'authentification échoue
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // Ajouter les informations utilisateur au token JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
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
