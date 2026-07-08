import { auth } from '@/src/shared/config/auth';
import { ROUTES } from '@/src/shared/routes';

export default auth((req) => {
  // If session is missing/token expired and user accesses a protected route
  if (!req.auth) {
    const signinUrl = new URL(ROUTES.AUTH.PAGE('signin'), req.nextUrl.origin);

    // Save the requested page to redirect the user back after signin
    signinUrl.searchParams.append('callbackUrl', req.nextUrl.pathname);

    return Response.redirect(signinUrl);
  }
});

export const config = {
  matcher: ['/profile/:path*', '/checkout/:path*', '/admin/:path*'], // protected routes
};
