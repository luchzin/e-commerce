import { auth } from "@/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)"],
};
export default auth((req) => {
  const { pathname, origin } = req.nextUrl;

  if (!req.auth && !pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/auth/signin", origin));
  }

  if (req.auth && pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/", origin));
  }

  return;
});
