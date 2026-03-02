import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Cctv } from "lucide-react";

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
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
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
            className={active ? "bg-green-300" : "bg-red-300"}
          >
            {active ? "Operating" : "Inactive"}
          </Badge>
        </CardAction>
        <CardTitle>{site_name}</CardTitle>
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
        <Button className="w-full">View Site</Button>
      </CardFooter>
    </Card>
  );
}

export { SiteCards };
