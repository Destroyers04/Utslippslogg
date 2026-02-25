import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/_app")({
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
