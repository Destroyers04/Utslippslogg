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
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

interface Props {
  siteId: number;
  stationId?: number;
}

function TableFilter({ siteId, stationId }: Props) {
  const [value, setValue] = useState<UnitData[]>([]);
  const anchor = useComboboxAnchor();
  const { data: units, isPending } = useQuery({
    queryKey: ["siteUnits", siteId, stationId],
    queryFn: () =>
      getSiteUnitsData(localStorage.getItem("token")!, siteId, stationId),
  });

  useEffect(() => {
    if (units) setValue(units);
  }, [units]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  if (isPending) return <>Loading</>;

  const toggle = (unit: UnitData) => {
    setValue((prev) =>
      prev.some((u) => u.unit_id === unit.unit_id)
        ? prev.filter((u) => u.unit_id !== unit.unit_id)
        : [...prev, unit],
    );
  };

  return (
    <div className="flex gap-4 items-center">
      <Combobox
        multiple
        autoHighlight
        items={units ?? []}
        value={value}
        onValueChange={setValue}
      >
        <ComboboxChips ref={anchor} className="max-w-xs">
          <ComboboxValue>
            {(values: UnitData[]) => (
              <Fragment>
                {values.map((val) => (
                  <ComboboxChip key={val.unit_id}>{val.emission}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="Search..." />
              </Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No units found.</ComboboxEmpty>
          <ComboboxList>
            {(unit) => (
              <ComboboxItem key={unit.unit_id} value={unit}>
                {unit.emission}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-1 self-center">
            <Filter className="size-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {(units ?? []).map((unit) => (
            <DropdownMenuCheckboxItem
              key={unit.unit_id}
              checked={value.some((u) => u.unit_id === unit.unit_id)}
              onCheckedChange={() => toggle(unit)}
            >
              {unit.emission}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { TableFilter };
