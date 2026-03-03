import { SiteCards } from "@/components/dashboard/dashboard-cards";
import type { SiteData } from "@/api/types";

function SiteCollection({ sites }: { sites: SiteData[] }) {
  return (
    <div className="max-w-screen-xl mx-auto mt-8 flex flex-wrap md:px-8 justify-center lg:justify-start gap-4 mb-4">
      {sites.map((site) => {
        return (
          <div key={site.site_id} className="flex-none">
            <SiteCards
              site_id={site.site_id}
              site_name={site.name}
              site_location={site.location}
              station_count={site.station_count}
              active={true}
            />
          </div>
        );
      })}
    </div>
  );
}

export { SiteCollection };
