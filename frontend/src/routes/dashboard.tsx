import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl  m-4 ">
      <Table>
        <TableCaption>List of your measurement locations</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            className="cursor-pointer"
            onClick={() =>
              navigate({ to: "/locations/precisionManufacturingLLC" })
            }
          >
            <TableCell>Precision Manufacturing LLC</TableCell>
            <TableCell>Molde, Norway</TableCell>
            <TableCell>
              <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                Active
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow
            className="cursor-pointer"
            onClick={() => navigate({ to: "/locations/regionalSteelWorks" })}
          >
            <TableCell>Regional Steel Works</TableCell>
            <TableCell>Tromsø, Norway</TableCell>
            <TableCell>
              <Badge variant="destructive">Waiting</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
