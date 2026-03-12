import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MeasurementData, UnitData } from "@/api/types";

interface Props {
  measurements: MeasurementData[];
  units: UnitData[];
}

function MeasurementChart({ measurements, units }: Props) {
  const availableUnits = units.filter((u) =>
    measurements.some((m) => m.unit_id === u.unit_id),
  );

  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  useEffect(() => {
    if (availableUnits.length > 0 && selectedUnitId === null) {
      setSelectedUnitId(availableUnits[0].unit_id);
    }
  }, [availableUnits]);

  const selectedUnit = availableUnits.find((u) => u.unit_id === selectedUnitId);

  const chartConfig: ChartConfig = selectedUnit
    ? { [selectedUnit.emission]: { label: selectedUnit.emission, color: "var(--chart-1)" } }
    : {};

  const chartData = measurements
    .filter((m) => m.unit_id === selectedUnitId)
    .map((m) => ({ time: m.time, [selectedUnit?.emission ?? ""]: m.value }));

  const formatTime = (value: string) =>
    new Date(value).toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <div className="flex flex-col gap-4">
      <Select
        value={String(selectedUnitId ?? "")}
        onValueChange={(v) => setSelectedUnitId(Number(v))}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select emission" />
        </SelectTrigger>
        <SelectContent>
          {availableUnits.map((unit) => (
            <SelectItem key={unit.unit_id} value={String(unit.unit_id)}>
              {unit.emission}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ChartContainer config={chartConfig} className="min-h-48 w-full">
        <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatTime}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          {selectedUnit && (
            <Area
              dataKey={selectedUnit.emission}
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--chart-1)"
            />
          )}
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

export { MeasurementChart };
