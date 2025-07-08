import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const { pathname } = req.nextUrl;

  console.log("⏩ Middleware triggered at:", pathname);
  console.log("✅ Token found in middleware:", token);

  const PUBLIC_PATHS = ["/", "/login", "/register"];

  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  // Jika belum login dan akses halaman private
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Jika sudah login dan akses halaman public (hanya root, login, register)
  if (token && isPublicPath) {
    console.log("REDIRECT KE DASHBOARD");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"], // atau gunakan wildcard
};
