import { getSiteUnitsData } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
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

  if (isPending) return <>Loading</>;
  console.log(value);
  return (
    <Combobox
      multiple
      autoHighlight
      items={units ?? []}
      defaultValue={[...(units ?? [])]}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values: UnitData[]) => (
            <Fragment>
              {values.map((val) => (
                <ComboboxChip key={val.unit_id}>{val.emission}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
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
  );
}

export { TableFilter };
