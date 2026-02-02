import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/locations/regionalSteelWorks")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/locations/regionalSteelWorks"!</div>;
}
