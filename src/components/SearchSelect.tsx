"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useId, useState } from "react";
import citiesJson from "@/data/cities.json";

export default function SearchSelect() {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const cities = (citiesJson as any).cities;

  const filteredCities = cities
    .filter((city: any) => city.label.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 10); // Show max 50 results

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value ? cities.find((city: any) => city.label === value)?.label : "Select city"}
            </span>
            <ChevronDownIcon size={16} className="text-muted-foreground/80 shrink-0" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search city..." value={searchQuery} onValueChange={setSearchQuery} />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {filteredCities.map((city: any) => (
                  <CommandItem
                    key={city.insee_code}
                    value={city.city_code}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {city.label}
                    {value === city.label && <CheckIcon size={16} className="ml-auto" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
