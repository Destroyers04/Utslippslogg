import { MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SiteData } from "@/api/types";

interface Props {
  site: SiteData;
  active: boolean;
}
function SiteHeader({ site, active }: Props) {
  return (
    <Card className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-[1px] scale-105 brightness-60 grayscale dark:brightness-40"
        style={{
          backgroundImage: `url(https://picsum.photos/seed/${site.site_id}/1920/1080)`,
        }}
      />
      <CardHeader className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="font-extrabold text-3xl tracking-tight text-balance text-white">
            {site.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 md:pb-3 text-white font-bold">
            <MapPin className="h-4 w-4" />
            {site.location}
          </CardDescription>
        </div>
        <div
          className={cn(
            "hidden sm:block font-bold text-sm tracking-tight px-3 py-1 rounded-full",
            active ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100",
          )}
        >
          {active ? "Operating" : "Inactive"}
        </div>
      </CardHeader>
      <CardFooter className="sm:hidden relative bg-card bg-muted/50">
        <div
          className={cn(
            "font-bold text-sm tracking-tight px-3 py-1 rounded-full",
            active ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100",
          )}
        >
          {active ? "Operating" : "Inactive"}
        </div>
      </CardFooter>
    </Card>
  );
}

export { SiteHeader };
