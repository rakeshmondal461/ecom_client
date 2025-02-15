import { AuthApis } from "@/services/api/auth.api";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const secretKey = process.env.NEXTAUTH_SECRET; // Store securely in .env

const authOptions: NextAuthOptions = {
  secret: secretKey, // Required for JWT encryption
  session: {
    strategy: "jwt", // Enable JWT-based session
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
      async authorize(credentials, req) {
        let results: any = {};
        if (credentials?.type === "LOGIN") {
          const result = await AuthApis.loginUser({
            email: credentials?.email,
            password: credentials?.password,
          });
          results = result;
        }
        if (credentials?.type === "SIGN_UP") {
          const result = await AuthApis.signupUser({
            email: credentials?.email,
            password: credentials?.password,
            name: credentials?.name,
            phoneNumber:credentials?.phoneNumber
          });
          results = result;
        }

        if (!results.success) {
          throw new Error("Something went wrong");
        }
        return { ...results.data, apiToken: results.data.access_token };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
        if (token) {
            session.user = {
              id: token.id,
              access_token: token.access_token,
              email: token.email,
              isActive: token.isActive,
              resend_token: token.resend_token,
              image: token.picture,
              name: token.name,
            };
          }
          return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
            token.id = user.id;
            token.access_token = user?.access_token;
            token.name = user?.name as string;
            token.email = user.email;
            token.isActive = user.isActive;
            token.image = user.image;
          }
          return token;
    },
  },
  pages: {
    signIn: "/auth/SignIn",
  },
};



export {authOptions}