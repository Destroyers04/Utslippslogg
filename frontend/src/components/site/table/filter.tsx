import { getSiteUnitsData } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import type { UnitData } from "@/api/types";
import { useState, Fragment, useEffect } from "react";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft } from "lucide-react";
import { FilterX } from "lucide-react";

interface Props {
  siteId: number;
  stationId?: number;
}

function TableFilter({ siteId, stationId }: Props) {
  const [value, setValue] = useState<UnitData[]>([]);
  const [pending, setPending] = useState<UnitData[]>([]);
  const anchor = useComboboxAnchor();
  const { data: units, isPending } = useQuery({
    queryKey: ["siteUnits", siteId, stationId],
    queryFn: () =>
      getSiteUnitsData(localStorage.getItem("token")!, siteId, stationId),
  });

  useEffect(() => {
    if (units) {
      setValue(units);
    }
  }, [units]);

  if (isPending) return <>Loading</>;

  const toggle = (unit: UnitData) => {
    setPending((prev) =>
      prev.some((u) => u.unit_id === unit.unit_id)
        ? prev.filter((u) => u.unit_id !== unit.unit_id)
        : [...prev, unit],
    );
  };

  return (
    <div className="flex gap-4 pb-2">
      <Combobox
        multiple
        autoHighlight
        items={units ?? []}
        value={value}
        onValueChange={setValue}
      >
        <ComboboxChips ref={anchor} className=" w-full">
          <ComboboxValue>
            {(values: UnitData[]) => (
              <Fragment>
                {values.map((val) => (
                  <ComboboxChip key={val.unit_id}>{val.emission}</ComboboxChip>
                ))}
              </Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
      </Combobox>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-1 self-start shrink-0">
            <Filter className="size-4 color-orange-300" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuGroup>
            <div className="flex justify-between">
              <DropdownMenuLabel>Emissions</DropdownMenuLabel>
              <DropdownMenuItem
                className="text-muted-foreground"
                onSelect={() => {
                  setValue(pending);
                  setPending([]);
                }}
              >
                <FilterX />
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            {(units ?? []).map((unit) => (
              <DropdownMenuCheckboxItem
                className=""
                key={unit.unit_id}
                checked={pending.some((u) => u.unit_id === unit.unit_id)}
                onCheckedChange={() => toggle(unit)}
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <span className="flex flex-col">
                  <span>{unit.emission}</span>
                  <span className="text-muted-foreground text-xs">
                    {unit.unit}
                  </span>
                </span>
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <div className="flex justify-center p-1">
              <Button
                variant="outline"
                onClick={() => {
                  setValue(pending);
                  setPending([]);
                }}
              >
                Apply
              </Button>
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { TableFilter };
