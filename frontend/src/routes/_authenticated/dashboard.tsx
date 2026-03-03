import { createFileRoute } from "@tanstack/react-router";
import { SiteCollection } from "@/components/site-collection";
import { Route as authenticatedRoute } from "@/routes/_authenticated/route";

export const Route = createFileRoute("/_authenticated/dashboard")({
  staleTime: 0,
  loader: ({ context }) => context.userData,
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-8 px-8">
        <h1 className="font-extrabold text-3xl tracking-tight text-balance">
          Welcome {authenticatedRoute.useRouteContext().userData.name}
        </h1>
      </div>
      <SiteCollection />
    </>
  );
}
