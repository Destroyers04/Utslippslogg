import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";

const RootLayout = () => {
  const { pathname } = useLocation();
  const showNavbar = pathname !== "/login";

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
