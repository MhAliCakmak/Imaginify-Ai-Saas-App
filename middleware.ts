import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoute = createRouteMatcher([
  // Add your protected routes here
]);

const ignoredRoutes = createRouteMatcher([
  // Add your ignored routes here
  "/api/webhooks/*",
]);

export default clerkMiddleware((auth, req) => {
  if (ignoredRoutes(req)) {
    return; // Skip protection for ignored routes
  }
  if (protectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
