import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/login", "/about", "/api/public"];
  const isPublic = publicPaths.some(path => pathname.startsWith(path));

  // Proteksi semua API kecuali yang public
  const isApiProtected = pathname.startsWith("/api") && !isPublic;

  if (isApiProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}