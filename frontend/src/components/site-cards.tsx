import { useQuery } from "@tanstack/react-query";
import { getSiteData } from "@/api/api";

function SiteCards() {
  const { isPending, error, siteData } = useQuery({
    queryKey: ["siteData"],
    queryFn: () => getSiteData(localStorage.getItem("token")),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return <div className="max-w-screen-xl mx-auto mt-8 px-8">Hello</div>;
}

export { SiteCards };
