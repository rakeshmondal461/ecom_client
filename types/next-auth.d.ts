import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: number | any;
      name?: string | unknown;
      email?:string | unknown;
      phoneNumber?:string | unknown;
      authtoken?: string | unknown;
      access_token?: string | unknown;
      google_token?: string | unknown;
      isActive?: boolean | unknown;
      resend_token?: string | unknown;
    } & DefaultSession["user"];
  }

  interface User {
    _id?: string;
    name?: string | unknown;
    email?:string | unknown;
    phoneNumber?:string | unknown;
    authtoken?: string | unknown;
    access_token?: string | unknown;
    google_token?: string | unknown;
    isActive?: boolean;
    resend_token?: string | unknown;
    // add other properties as needed
  }

  interface JWT {
    id?: number;
    email?:string | unknown;
    phoneNumber?:string | unknown;
    name?: string | unknown;
    authtoken?: string | unknown;
    access_token?: string | unknown;
    google_token?: string | unknown;
    isActive?: boolean;
    resend_token?: string | unknown;
    // add other properties as needed
  }
}
