export { auth as proxy } from '@/src/shared/config/auth';

export const config = {
  matcher: ['/profile/:path*", "/checkout/:path*", "/admin/:path*'], // protected routes
};
