import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Route as loginRoute } from "@/routes/login";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    const token = localStorage.getItem("token");
    if (!token) throw redirect({ to: loginRoute.to });
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}
