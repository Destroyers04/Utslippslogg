import { Route } from "@/routes/_authenticated/site.$siteId";
import { StationCards } from "@/components/site/station-cards";

function StationCardList() {
  const site = Route.useRouteContext().site;

  return (
    <div className="flex flex-wrap gap-4">
      {site.stations.map((station) => (
        <div key={station.station_id} className="flex-1 min-w-64">
          <StationCards station={station} />
        </div>
      ))}
    </div>
  );
}

export { StationCardList };
