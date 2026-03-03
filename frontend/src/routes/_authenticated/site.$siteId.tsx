import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSiteMeasurementsData, getSiteData } from "@/api/api";
import { Route as dashboardRoute } from "@/routes/_authenticated/dashboard";
import { SiteHeader } from "@/components/site/siteheader";
import { act } from "react";

export const Route = createFileRoute("/_authenticated/site/$siteId")({
  staleTime: 0,
  // Check if user has correct auth, save site to context if valid
  beforeLoad: async ({ params }) => {
    const sites = await getSiteData(localStorage.getItem("token")!);
    const site = sites.find((s) => String(s.site_id) === params.siteId);
    if (!site) throw redirect({ to: dashboardRoute.to });
    return { site };
  },
  loader: async ({ context }) => {
    const siteMeasurements = await getSiteMeasurementsData(
      localStorage.getItem("token")!,
      context.site.site_id,
    );
    const site = context.site;
    return { siteMeasurements, site };
  },
  component: SitePage,
});

function SitePage() {
  const { siteMeasurements, site } = Route.useLoaderData();

  //placeholder variable for status site, too lazy atm
  const active = true;
  return (
    <div className="max-w-screen-xl mx-auto mt-8 px-8">
      <SiteHeader site={site} active={active} />
    </div>
  );
}
