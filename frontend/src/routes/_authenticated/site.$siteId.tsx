import { createFileRoute } from "@tanstack/react-router";
import { getSiteData } from "@/api/api";

export const Route = createFileRoute("/_authenticated/site/$siteId")({
  loader: ({ params }) =>
    getSiteData(localStorage.getItem("token")!).then((sites) =>
      sites.find((s) => String(s.site_id) === params.siteId),
    ),
  component: SitePage,
});

function SitePage() {
  const data = Route.useLoaderData();
  return <>Hello from site {data?.site_id}</>;
}
