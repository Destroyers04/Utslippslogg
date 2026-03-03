import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Cctv } from "lucide-react";
import { Route as dashboardRoute } from "@/routes/_authenticated/dashboard";
import { Route as siteRoute } from "@/routes/_authenticated/site.$siteId";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface Props {
  site_id: number;
  site_name: string;
  site_location: string;
  station_count: number;
  active: boolean;
}

function SiteCards({
  site_id,
  site_name,
  site_location,
  station_count,
  active,
}: Props) {
  const navigate = useNavigate({ from: dashboardRoute.to });
  const handleClick = async () => {
    await navigate({ to: siteRoute.to, params: { siteId: String(site_id) } });
  };
  return (
    <Card className="relative mx-auto w-full max-w-xs lg:max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={`https://picsum.photos/seed/${site_id}/400/200`}
        alt="Image of site"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge
            variant={active ? "secondary" : "destructive"}
            className={cn(
              "font-bold text-sm tracking-tight px-3 py-1 rounded-full",
              active
                ? "text-green-800 bg-green-100"
                : "text-red-800 bg-red-100",
            )}
          >
            {active ? "Operating" : "Inactive"}
          </Badge>
        </CardAction>
        <CardTitle className="truncate pb-2">{site_name}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {site_location}
          </div>
        </CardDescription>
        <CardDescription>
          <div className="flex items-center gap-1">
            <Cctv className="h-4 w-4" />
            {station_count} stations
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleClick} className="w-full">
          View Site
        </Button>
      </CardFooter>
    </Card>
  );
}

export { SiteCards };
