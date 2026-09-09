import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest } from "next/server";

const ADMIN_EMAILS = [
  "mdshahariarhossen81@gmail.com",
  "sujoyjitu1@gmail.com",
];

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh / validate the Supabase session.
  const { data } = await supabase.auth.getClaims();

  const email =
    typeof data?.claims?.email === "string"
      ? data.claims.email.toLowerCase()
      : null;

  const isAdmin = email
    ? ADMIN_EMAILS.includes(email)
    : false;

  // Protect the private team dashboard.
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!email) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};