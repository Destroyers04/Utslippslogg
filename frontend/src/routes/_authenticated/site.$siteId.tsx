import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_authenticated/site/$siteId")({
  component: SitePage,
});

function SitePage() {
  return <>Hello from site</>;
}
