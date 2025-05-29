import { NextResponse } from "next/server";

export async function middleware(request) {
  // Burada kendi oturum kontrolünü veya çerez işlemlerini yazabilirsin.
  // Örneğin, belirli bir çerez yoksa yönlendirme yapabilirsin:
  const accessToken = request.cookies.get("sb-access-token")?.value;

  if (!accessToken && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!accessToken && request.nextUrl.pathname.startsWith("/blog/create")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (accessToken && request.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
