import NextAuth, { AuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { users } from "@/repository/user";

interface ExtendedUser extends NextAuthUser {
  id: string;
  email: string;
  name: string;
  apiKey: string;
}

type Credentials = {
  email: string;
  password: string;
} | undefined;

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
      async authorize(credentials: Credentials): Promise<ExtendedUser | null> {
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
          };
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
        token.apiKey = (user as ExtendedUser).apiKey;
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        
        // Type assertion for adding apiKey to session
        const extendedSessionUser = session.user as ExtendedUser;
        extendedSessionUser.apiKey = token.apiKey as string;
      }
      console.log("Session:", session); 
      return session;
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      if (token?.provider === "google") {
        const logoutUrl = `https://accounts.google.com/o/oauth2/revoke?token=${token.accessToken as string}`;
        await fetch(logoutUrl);
      }
    },
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };