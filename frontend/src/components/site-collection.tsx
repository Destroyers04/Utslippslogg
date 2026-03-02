import { SiteCards } from "@/components/site-cards";
import { useQuery } from "@tanstack/react-query";
import { getSiteData } from "@/api/api";
import type { SiteData } from "@/api/types";

function SiteCollection() {
  const { isPending, error, data } = useQuery({
    queryKey: ["siteData"],
    queryFn: () => getSiteData(localStorage.getItem("token")!),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-8 px-8">
        {data.map((site) => {
          return (
            <SiteCards
              key={site.site_id}
              site_id={site.site_id}
              site_name={site.name}
              site_location={site.location}
              station_count={site.station_count}
              active={true}
            />
          );
        })}
      </div>
    </>
  );
}

export { SiteCollection };
