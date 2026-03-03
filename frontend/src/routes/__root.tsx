import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
};
interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});
