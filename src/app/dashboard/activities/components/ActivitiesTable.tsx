"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Eye, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useActivities } from "@/app/map/hooks/useActivities";
import { Activity } from "@/app/map/models/activity";
import { ActivityDetailsModal } from "./ActivityDetailsModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { CreateUpdateActivityModal } from "@/app/map/components/CreateUpdateActivityModal";
import { UserRole } from "@prisma/client";
import { useAuth } from "@/app/(auth)/hooks/useAuth";
interface ActivitiesTableProps {
  activities: Activity[];
}

const statusColors = {
  draft: "bg-yellow-100 text-yellow-900 border border-yellow-200",
  published: "bg-green-100 text-green-900 border border-green-200",
  archived: "bg-gray-100 text-gray-900 border border-gray-200",
};

const formatDate = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function ActivitiesTable({ activities: activities }: ActivitiesTableProps) {
  const [modalState, setModalState] = useState<{
    type: "details" | "update" | "none";
    activity: Activity | null;
  }>({
    type: "none",
    activity: null,
  });
  const { user } = useAuth();

  const { updateActivity } = useActivities();

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setModalState({ type: "none", activity: null });
    }
  };

  const showDetails = (activity: Activity) => {
    setModalState({ type: "details", activity });
  };

  const showUpdate = (activity: Activity) => {
    setModalState({ type: "update", activity });
  };

  const { deleteActivity } = useActivities();

  return (
    <>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[180px] font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Titre</TableHead>
              <TableHead className="max-w-[500px] font-semibold">Description</TableHead>
              <TableHead className="w-[150px] font-semibold">Status</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucune activité trouvée
                </TableCell>
              </TableRow>
            ) : (
              activities.map((activity: Activity) => (
                <TableRow key={activity.id} className="group">
                  <TableCell className="font-medium">{formatDate(activity.createdAt)}</TableCell>
                  <TableCell>{activity.title}</TableCell>
                  <TableCell className="max-w-[500px]">
                    <p className="line-clamp-2">{activity.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("px-2 py-1 font-medium", statusColors[activity.status])}>
                      {activity.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => showDetails(activity)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => showUpdate(activity)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        {activity.status !== "published" && user?.role === UserRole.admin && (
                          <DropdownMenuItem
                            onClick={async () => {
                              updateActivity({ id: activity.id, status: "published" });
                            }}
                          >
                            <Check className="h-4 w-4 mr-2 text-green-600" />
                            Publier
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteActivity(activity.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <ActivityDetailsModal
        activity={modalState.activity}
        open={modalState.type === "details"}
        onOpenChange={onOpenChange}
      />
      <CreateUpdateActivityModal
        open={modalState.type === "update"}
        onOpenChange={onOpenChange}
        activity={modalState.activity}
      />
    </>
  );
}
