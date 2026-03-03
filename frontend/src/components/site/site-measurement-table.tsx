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
import type { MeasurementData } from "@/api/types";

function MeasurementTable({
  measurements,
}: {
  measurements: MeasurementData[];
}) {
  const measurement_unit = measurements?.[0].unit_id;

  return (
    <Table className="mt-12">
      <TableCaption>A list of the sites recent measurements.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">ID</TableHead>
          <TableHead className="w-48">Time</TableHead>
          <TableHead className="w-24">Station id</TableHead>
          <TableHead className="w-32">Type</TableHead>
          <TableHead className="text-right">Value {measurement_unit}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {measurements.map((measurement) => (
          <TableRow key={measurement.measurement_id}>
            <TableCell className="font-medium w-12">
              {measurement.measurement_id}
            </TableCell>
            <TableCell className="w-48">{measurement.time}</TableCell>
            <TableCell className="w-24">{measurement.station_id}</TableCell>
            <TableCell className="w-32">{measurement.type}</TableCell>
            <TableCell className="text-right">
              {measurement.value} {measurement.unit_id}
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
