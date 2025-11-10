import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string | undefined
    user: {
      id?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    accessToken?: string | undefined
    email?: string | undefined
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string | undefined
  }
}