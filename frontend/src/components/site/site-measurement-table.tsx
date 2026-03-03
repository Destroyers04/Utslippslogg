import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UnitData } from "@/api/types";
import { useQuery } from "@tanstack/react-query";
import { getSiteMeasurementsData } from "@/api/api";
import { useEffect } from "react";

interface Props {
  siteId: number;
  units: UnitData[];
  page: number;
  limit: number;
  onHasNextPage: (hasNext: boolean) => void;
}

function MeasurementTable({
  siteId,
  units,
  page,
  limit,
  onHasNextPage,
}: Props) {
  const { isPending, error, data } = useQuery({
    queryKey: ["siteMeasurementData", siteId, page, limit],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return getSiteMeasurementsData(
        localStorage.getItem("token")!,
        siteId,
        page,
        // Fetch one extra to check if next page exists
        limit + 1,
      );
    },
  });

  const hasNextPage = (data?.length ?? 0) > limit;
  const measurements = data?.slice(0, limit) ?? [];

  useEffect(() => {
    if (data) onHasNextPage(hasNextPage);
  }, [data]);

  if (error) return "An error has occurred: " + error.message;

  // Display correct measurement unit
  const find_unit = (measurement_unit_id: number) => {
    return units.find((unit) => unit.unit_id === measurement_unit_id)?.unit;
  };
  // Parse string from ISO format to locale time
  const parse_time = (measurement_time: string) => {
    const date = new Date(measurement_time);
    return {
      short: date.toLocaleString(undefined, {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      full: date.toLocaleString(undefined, {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    };
  };
  return (
    <Table className="mt-4 mb-4">
      <TableCaption>A list of the sites recent measurements.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">ID</TableHead>
          <TableHead className="w-24 md:w-36">Time</TableHead>
          <TableHead className="w-12 md:w-24">Station id</TableHead>
          <TableHead className="w-24 hidden md:table-cell">Type</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending ? (
          <TableRow>
            <TableCell colSpan={5} className="h-32 text-center">
              <div className="flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
              </div>
            </TableCell>
          </TableRow>
        ) : (
          measurements.map((measurement) => (
            <TableRow key={measurement.measurement_id}>
              <TableCell className="font-medium w-12">
                {measurement.measurement_id}
              </TableCell>
              <TableCell className="w-24 md:w-36">
                <span className="md:hidden">
                  {parse_time(measurement.time).short}
                </span>
                <span className="hidden md:inline">
                  {parse_time(measurement.time).full}
                </span>
              </TableCell>
              <TableCell className="w-12 text-center md:w-24 md:text-left">
                {measurement.station_id}
              </TableCell>
              <TableCell className="w-24 hidden md:table-cell">
                {measurement.type}
              </TableCell>
              <TableCell className="text-right">
                {measurement.value} {find_unit(measurement.unit_id)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export { MeasurementTable };
