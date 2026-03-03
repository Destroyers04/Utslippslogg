import { createFileRoute } from "@tanstack/react-router";
import { SiteCollection } from "@/components/dashboard/dashboard-card-list";
import { Route as authenticatedRoute } from "@/routes/_authenticated/route";
import { getSiteData } from "@/api/api";

export const Route = createFileRoute("/_authenticated/dashboard")({
  staleTime: 0,
  loader: async () => {
    return getSiteData(localStorage.getItem("token")!)
  },
  component: DashboardPage,
});

function DashboardPage() {
  const sites = Route.useLoaderData();
  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-8 px-8">
        <h1 className="font-extrabold text-3xl tracking-tight text-balance">
          Welcome {authenticatedRoute.useRouteContext().userData.name}
        </h1>
      </div>
      <SiteCollection sites={sites} />
    </>
  );
}
