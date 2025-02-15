import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: number | any;
      firstName?: string | unknown;
      lastName?: string | unknown;
      authtoken?: string | unknown;
      access_token?: string | unknown;
      google_token?: string | unknown;
      display_name?: string | any;
      isActive?: boolean | unknown;
      resend_token?: string | unknown;
    } & DefaultSession["user"];
  }

  interface User {
    id?: number;
    firstName?: string | unknown;
    lastName?: string | unknown;
    authtoken?: string | unknown;
    access_token?: string | unknown;
    google_token?: string | unknown;
    display_name?: string;
    isActive?: boolean;
    resend_token?: string | unknown;
    // add other properties as needed
  }

  interface JWT {
    id?: number;
    firstName?: string | unknown;
    lastName?: string | unknown;
    authtoken?: string | unknown;
    access_token?: string | unknown;
    google_token?: string | unknown;
    display_name?: string | unknown;
    isActive?: boolean;
    resend_token?: string | unknown;
    // add other properties as needed
  }
}
