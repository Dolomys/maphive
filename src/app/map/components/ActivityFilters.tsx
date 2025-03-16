import { ActivityCategory, StudyType } from "@prisma/client";
import { ActivityFilters as ActivityFiltersType } from "../models/filters";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { SheetContent, SheetTrigger, SheetTitle, Sheet } from "@/components/ui/sheet";
import { DEFAULT_FILTERS } from "../models/filters";
import { useFilters } from "../hooks/useFilters";
import { useQuery } from "@tanstack/react-query";
const studyTypes = [
  { type: StudyType.GACO },
  { type: StudyType.MDFS },
  { type: StudyType.MCMO },
  { type: StudyType.MACAST },
  { type: StudyType.CJ },
];

export const ActivityFilters = () => {
  const [filters, setFilters] = useFilters<ActivityFiltersType>("activity-filters", DEFAULT_FILTERS);
  const [durationRange, setDurationRange] = useState<number[]>([filters.minDuration || 1, filters.maxDuration || 24]);
  const [ratingRange, setRatingRange] = useState<number[]>([filters.minRating || 1, filters.maxRating || 5]);

  const { data: types } = useQuery({
    queryKey: ["types"],
    queryFn: () => fetch("/api/study/getTypesAndCount").then((res) => res.json()),
  });

  const studTypeWithCount = studyTypes?.map((type) => ({
    ...type,
    count: types?.find((t: { type: StudyType; count: number }) => t.type === type.type)?.count || 0,
  }));

  const handleClearFilters = () => {
    setFilters({
      search: undefined,
      type: undefined,
      minDuration: undefined,
      maxDuration: undefined,
      isPaid: undefined,
      minRating: undefined,
      maxRating: undefined,
      city: undefined,
    });
    setDurationRange([1, 24]);
    setRatingRange([1, 5]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Filtres
          <Settings2 className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle>Filtres</SheetTitle>
        <div className={"space-y-4"}>
          <div className="flex items-center pt-4">
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Réinitialiser
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Recherche</Label>
              <Input
                placeholder="Rechercher..."
                value={filters.search || ""}
                onChange={(e) => setFilters({ ...filters, search: e.target.value || undefined })}
              />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={filters.type || ""}
                onValueChange={(value) => setFilters({ ...filters, type: (value as ActivityCategory) || undefined })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ActivityCategory.structure}>Structure</SelectItem>
                  <SelectItem value={ActivityCategory.event}>Événement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Type d&apos;études</Label>
              <Select
                value={filters.studyType || ""}
                onValueChange={(value) => setFilters({ ...filters, studyType: (value as StudyType) || undefined })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types d'études" />
                </SelectTrigger>
                <SelectContent>
                  {studTypeWithCount?.map((type: { type: StudyType; count: number }) => (
                    <SelectItem key={type.type} value={type.type}>
                      {type.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Durée (mois)</Label>
              <Slider
                min={1}
                max={24}
                step={1}
                value={durationRange}
                onValueChange={(value) => {
                  setDurationRange(value);
                  setFilters({
                    ...filters,
                    minDuration: value[0],
                    maxDuration: value[1],
                  });
                }}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{durationRange[0]} mois</span>
                <span>{durationRange[1]} mois</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Note</Label>
              <Slider
                min={1}
                max={5}
                step={0.5}
                value={ratingRange}
                onValueChange={(value) => {
                  setRatingRange(value);
                  setFilters({
                    ...filters,
                    minRating: value[0],
                    maxRating: value[1],
                  });
                }}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{ratingRange[0]} étoiles</span>
                <span>{ratingRange[1]} étoiles</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ville</Label>
              <Input
                placeholder="Filtrer par ville..."
                value={filters.city || ""}
                onChange={(e) => setFilters({ ...filters, city: e.target.value || undefined })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Stage gratifié</Label>
              <Switch
                checked={filters.isPaid || false}
                onCheckedChange={(checked) => setFilters({ ...filters, isPaid: checked || undefined })}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
