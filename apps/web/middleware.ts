import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(
  request: NextRequest
) {

  const path =
    request.nextUrl.pathname;


  // placeholder authentication check

  const isAuthenticated = true;


  if (
    !isAuthenticated &&
    (
      path.startsWith("/student") ||
      path.startsWith("/teacher")
    )
  ) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );

  }


  return NextResponse.next();
}


export const config = {
  matcher:[
    "/student/:path*",
    "/teacher/:path*",
  ],
};