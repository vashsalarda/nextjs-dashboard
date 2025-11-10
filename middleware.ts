import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getCookie } from "cookies-next";
import { log } from "console";

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};

export default async function middleware(req: NextRequest) {
  // Try to get a token from next-auth; requires NEXTAUTH_SECRET to be set
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const token = req.cookies.get("token")?.value;
  // If no token, redirect to sign-in and preserve the requested path
  console.log({"token(middleware)": token});
  
  if (!token) {
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = "/login";
    signInUrl.search = `?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`;
    return NextResponse.redirect(signInUrl);
  }

  // Authorized — continue
  return NextResponse.next();
}