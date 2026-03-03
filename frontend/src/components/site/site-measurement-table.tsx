import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MeasurementData, UnitData } from "@/api/types";

interface Props {
  measurements: MeasurementData[];
  units: UnitData[];
}

function MeasurementTable({ measurements, units }: Props) {
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
    <Table className="mt-12">
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
        {measurements.map((measurement) => (
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
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export { MeasurementTable };
