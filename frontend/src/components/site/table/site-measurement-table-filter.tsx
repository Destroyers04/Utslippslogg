import { getSiteUnitsData } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

interface Props {
  siteId: number;
  stationId?: number;
}

function TableFilter({ siteId, stationId }: Props) {
  const { isPending, error, data } = useQuery({
    queryKey: ["siteMeasurementData", siteId, stationId],
    queryFn: async () => {
      getSiteUnitsData(localStorage.getItem("token")!, siteId, stationId),
    },
  });
  console.log(data)

  return;
}

export { TableFilter };
