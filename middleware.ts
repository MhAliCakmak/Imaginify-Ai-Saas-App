import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoute = createRouteMatcher([
  "/transformations/add/(.*)",
  "/transformations/[id]/update/(.*)",
  "/profile",
  "/credits"
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', 
    '/', 
    '/(api|trpc)(.*)', 
    '/api/webhooks/clerk', 
    '/api/webhooks/stripe'
  ],
};