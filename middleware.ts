import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};

export default async function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("isLoggedIn")?.value;
  
  if (!isLoggedIn) {
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = "/login";
    signInUrl.search = `?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`;
    return NextResponse.redirect(signInUrl);
  }

  // Authorized — continue
  return NextResponse.next();
}