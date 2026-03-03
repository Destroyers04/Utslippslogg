import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSiteMeasurementsData, getSiteData } from "@/api/api";
import { Route as dashboardRoute } from "@/routes/_authenticated/dashboard";
import { SiteHeader } from "@/components/site/site-header";
import { MeasurementTable } from "@/components/site/site-measurement-table";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/site/$siteId")({
  staleTime: 0,
  // Check if user has correct auth, save site to context if valid
  beforeLoad: async ({ params }) => {
    const sites = await getSiteData(localStorage.getItem("token")!);
    const site = sites.find((s) => String(s.site_id) === params.siteId);
    if (!site) throw redirect({ to: dashboardRoute.to });
    return { site };
  },
  component: SitePage,
});

function SitePage() {
  const site = Route.useRouteContext().site;
  const { isPending, error, data } = useQuery({
    queryKey: ["siteMeasurementData"],
    queryFn: () =>
      getSiteMeasurementsData(localStorage.getItem("token")!, site.site_id),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  //placeholder variable for status site, too lazy atm
  const active = true;
  return (
    <div className="max-w-screen-xl mx-auto mt-8 px-8">
      <SiteHeader site={site} active={active} />
      <MeasurementTable measurements={data} />
    </div>
  );
}
