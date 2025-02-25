import MultiSelect from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { Option } from "@/components/ui/multiselect";
import { FilterIcon } from "lucide-react";

const fakeOptions: Option[] = [
  { value: "hike", label: "Hike" },
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Cafe" },
  { value: "bar", label: "Bar" },
  { value: "shop", label: "Shop" },
  { value: "park", label: "Park" },
];

const MapFilters = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <MultiSelect placeholder="Select categories" options={fakeOptions} />
        <MultiSelect placeholder="Select categories" options={fakeOptions} />
        <MultiSelect placeholder="Select categories" options={fakeOptions} />
      </div>
      <div>
        <Button>
          <FilterIcon />
        </Button>
      </div>
    </div>
  );
};

export default MapFilters;
