import type { StationData } from "@/api/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Route as siteRoute } from "@/routes/_authenticated/site.$siteId";
import { Route as stationRoute } from "@/routes/_authenticated/site.$siteId.$stationId";

function StationCards({ station }: { station: StationData }) {
  const navigate = useNavigate({ from: siteRoute.fullPath });
  const handleClick = async () => {
    await navigate({
      to: stationRoute.to,
      params: { stationId: String(station.station_id) },
    });
  };

  return (
    <Card
      size="sm"
      className="h-full border-orange-500 bg-orange-500 cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="text-white">{station.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-1 text-white/80">
            <MapPin className="h-4 w-4" />
            {station.location_description}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export { StationCards };
