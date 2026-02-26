import { createFileRoute } from "@tanstack/react-router";
import { getUserData } from "@/api/api";
import { SiteCollection } from "@/components/site-collection";

export const Route = createFileRoute("/_authenticated/dashboard")({
  loader: () => getUserData(localStorage.getItem("token")!),
  component: DashboardPage,
});

function DashboardPage() {
  const userData = Route.useLoaderData();
  return <SiteCollection userData={userData} />;
}
