import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSiteMeasurementsData, getSiteData } from "@/api/api";
import { Route as dashboardRoute } from "@/routes/_authenticated/dashboard";
import { MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/site/$siteId")({
  staleTime: 0,
  // Check if user has correct auth, save site to context if valid
  beforeLoad: async ({ params }) => {
    const sites = await getSiteData(localStorage.getItem("token")!);
    const site = sites.find((s) => String(s.site_id) === params.siteId);
    if (!site) throw redirect({ to: dashboardRoute.to });
    return { site };
  },
  loader: async ({ params, context }) => {
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
  const active = true;
  return (
    <div className="max-w-screen-xl mx-auto mt-8 px-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="font-extrabold text-3xl tracking-tight text-balance">
              {site.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 md:pb-3">
              <MapPin className="h-4 w-4" />
              {site.location}
            </CardDescription>
          </div>
          <div
            className={cn(
              "hidden sm:block font-bold text-sm tracking-tight px-3 py-1 rounded-full",
              active
                ? "text-green-800 bg-green-100"
                : "text-red-800 bg-red-100",
            )}
          >
            {active ? "Operating" : "Inactive"}
          </div>
        </CardHeader>
        <CardFooter className="sm:hidden">
          <div
            className={cn(
              "font-bold text-sm tracking-tight px-3 py-1 rounded-full",
              active
                ? "text-green-800 bg-green-100"
                : "text-red-800 bg-red-100",
            )}
          >
            {active ? "Operating" : "Inactive"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// const measurements = await getSiteMeasurementsData({
// token: localStorage.getItem("token")!,
// site_id: site.site_id,
// });
