"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { StudyType } from "@prisma/client";
import { toast } from "sonner";

interface StudyInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const studyTypes = [
  { type: StudyType.GACO, label: "GACO" },
  { type: StudyType.MDFS, label: "MDFS" },
  { type: StudyType.MCMO, label: "MCMO" },
  { type: StudyType.MACAST, label: "MACAST" },
  { type: StudyType.CJ, label: "CJ" },
  { type: StudyType.INFOCOM, label: "INFOCOM" },
];

export function StudyInfoModal({ open, onOpenChange }: StudyInfoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [studyInfo, setStudyInfo] = useState({
    name: "",
    type: "",
    level: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studyInfo),
      });

      if (!response.ok) throw new Error("Failed to save study info");

      toast.success("Informations enregistrées");
      onOpenChange(false);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent noClose className="h-fit">
        <DialogHeader>
          <DialogTitle>Informations sur vos études</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de la formation</Label>
            <Input
              id="name"
              value={studyInfo.name}
              onChange={(e) => setStudyInfo({ ...studyInfo, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type de formation</Label>
            <Select
              value={studyInfo.type}
              onValueChange={(value) => setStudyInfo({ ...studyInfo, type: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre formation" />
              </SelectTrigger>
              <SelectContent>
                {studyTypes.map((type) => (
                  <SelectItem key={type.type} value={type.type}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Niveau</Label>
            <Input
              id="level"
              value={studyInfo.level}
              onChange={(e) => setStudyInfo({ ...studyInfo, level: e.target.value })}
              placeholder="ex: L3, M1, M2"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
