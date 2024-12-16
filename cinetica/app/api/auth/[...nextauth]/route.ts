//app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions, User as NextAuthUser  } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { users } from "@/repository/user";

interface ExtendedUser extends NextAuthUser {
  id: string;
  email: string;
  name: string;
  apiKey: string;
}

export const authOptions: AuthOptions = {
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
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<{ id: string; email: string; name: string; apiKey:string } | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((user) => user.username === credentials.email);
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            email: user.username,
            name: user.name,
            apiKey: user.apiKey || '',
          } as ExtendedUser;
        }

        return null;
      },
    }),    
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.apiKey = user.apiKey;
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        if (token.apiKey) {
          (session.user as any).apiKey = token.apiKey;
        }
      }
      console.log("Session:", session); 
      return session;
    },
  },
  events: {
    async signOut({ token }: { token: any }) {
      if (token?.provider === "google") {
        const logoutUrl = `https://accounts.google.com/o/oauth2/revoke?token=${token.accessToken}`;
        await fetch(logoutUrl);
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };