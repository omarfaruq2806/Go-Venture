import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/tickets") {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });


  if (!session) {
    return NextResponse.redirect(
      new URL("/authentication/signin", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tickets/:id*"],
};
