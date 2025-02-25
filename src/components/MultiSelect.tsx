import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface MultiSelectProps {
  label?: string;
  placeholder: string;
  options: Option[];
}

export default function MultiSelect({ label, placeholder, options }: MultiSelectProps) {
  const [selectedCount, setSelectedCount] = useState(0);

  return (
    <div className="*:not-first:mt-2 w-[350px] relative">
      <div className="flex items-center justify-between">
        {label && <Label>{label}</Label>}
        {selectedCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {selectedCount}
          </Badge>
        )}
      </div>
      <MultipleSelector
        commandProps={{
          label: placeholder,
        }}
        defaultOptions={options}
        placeholder={placeholder}
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
        onChange={(selected) => setSelectedCount(selected.length)}
      />
    </div>
  );
}
