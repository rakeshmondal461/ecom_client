import { AuthApis } from "@/services/api/auth.api";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const secretKey = process.env.NEXTAUTH_SECRET;

if (!secretKey) {
  throw new Error("NEXTAUTH_SECRET is not defined in environment variables");
}

interface AuthResponse {
  success: boolean;
  data?: {
    data: {
      id: string;
      email: string;
      name: string;
      phoneNumber: string;
      isActive: boolean;
      jwtToken: string;
    };
  };
  message?: string;
}

const authOptions: NextAuthOptions = {
  secret: secretKey,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        phoneNumber: { label: "Phone number", type: "text" },
        type: { label: "Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        let results: AuthResponse;
        
        try {
          if (credentials.type === "LOGIN") {
            results = await AuthApis.loginUser({
              email: credentials.email,
              password: credentials.password,
            });
          } else if (credentials.type === "SIGN_UP") {
            if (!credentials.name || !credentials.phoneNumber) {
              throw new Error("Name and phone number are required for signup");
            }
            results = await AuthApis.signupUser({
              email: credentials.email,
              password: credentials.password,
              name: credentials.name,
              phoneNumber: credentials.phoneNumber
            });
          } else {
            throw new Error("Invalid authentication type");
          }

          if (!results.success || !results.data?.data) {
            throw new Error(results.message || "Authentication failed");
          }

          const user = results.data.data;
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            isActive: user.isActive,
            access_token: user.jwtToken,
          };
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Initial sign in
        token.id = user.id as string;
        token.access_token = user.access_token as string;
        token.name = user.name as string;
        token.email = user.email as string;
        token.phoneNumber = user.phoneNumber as string;
        token.isActive = user.isActive as boolean;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          access_token: token.access_token as string,
          email: token.email as string,
          name: token.name as string,
          phoneNumber: token.phoneNumber as string,
          isActive: token.isActive as boolean,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

export { authOptions };