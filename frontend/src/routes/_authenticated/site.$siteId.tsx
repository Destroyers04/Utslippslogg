import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSiteData, getUnitsData } from "@/api/api";
import { Route as dashboardRoute } from "@/routes/_authenticated/dashboard";
import { SiteHeader } from "@/components/site/site-header";
import { MeasurementTable } from "@/components/site/table/table";
import { TablePagination } from "@/components/site/table/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import type { UnitData } from "@/api/types";
import { TableFilter } from "@/components/site/table/filter";

export const Route = createFileRoute("/_authenticated/site/$siteId")({
  staleTime: 0,
  // Check if user has correct auth, save site to context if valid
  beforeLoad: async ({ params }) => {
    const sites = await getSiteData(localStorage.getItem("token")!);
    const site = sites.find((s) => String(s.site_id) === params.siteId);
    if (!site) throw redirect({ to: dashboardRoute.to });
    return { site };
  },
  loader: async () => {
    return getUnitsData();
  },
  component: SitePage,
});

function SitePage() {
  const site = Route.useRouteContext().site;
  const units = Route.useLoaderData();
  const active = true;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filteredUnits, setFilteredUnits] = useState<UnitData[]>([]);
  console.log(filteredUnits);
  return (
    <div className="max-w-screen-xl mx-auto mt-8 px-8">
      <SiteHeader site={site} active={active} />
      <Card className="my-8">
        <CardContent>
          <TableFilter
            siteId={site.site_id}
            onFilterChange={setFilteredUnits}
          />
          <MeasurementTable
            siteId={site.site_id}
            units={units}
            filteredUnits={filteredUnits}
            page={page}
            limit={limit}
            onHasNextPage={setHasNextPage}
          />
          <TablePagination
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            hasNextPage={hasNextPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
