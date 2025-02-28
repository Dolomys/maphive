"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeedbackDetailsModal } from "./feedbacks/FeedbackDetailsModal";
import { toast } from "sonner";
import { useState } from "react";

type Feedback = {
  id: string;
  message: string;
  status: "pending" | "inProgress" | "resolved" | "rejected";
  createdAt: string;
  senderEmail: string | null;
  creator?: {
    name: string | null;
    email: string;
  } | null;
};

interface FeedbackTableProps {
  feedbacks: Feedback[];
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-900 border border-yellow-200",
  inProgress: "bg-blue-100 text-blue-900 border border-blue-200",
  resolved: "bg-green-100 text-green-900 border border-green-200",
  rejected: "bg-red-100 text-red-900 border border-red-200",
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function FeedbackTable({ feedbacks: initialFeedbacks }: FeedbackTableProps) {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleStatusUpdate = async (id: string, status: Feedback["status"]) => {
    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update feedback");

      const updatedFeedback = await response.json();
      setFeedbacks((prev) => prev.map((f) => (f.id === id ? updatedFeedback : f)));
      toast.success("Status mis à jour avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce feedback ?")) return;

    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete feedback");

      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      toast.success("Feedback supprimé avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression du feedback");
    }
  };

  const showDetails = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setDetailsModalOpen(true);
  };

  return (
    <>
      <div>
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[180px] font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Utilisateur</TableHead>
                <TableHead className="max-w-[500px] font-semibold">Message</TableHead>
                <TableHead className="w-[150px] font-semibold">Status</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.map((feedback) => (
                <TableRow key={feedback.id} className="group">
                  <TableCell className="font-medium">{formatDate(feedback.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{feedback.creator ? feedback.creator.name || "Anonyme" : "Anonyme"}</span>
                      {feedback.creator?.email ||
                        (feedback.senderEmail && (
                          <span className="text-sm text-muted-foreground">
                            {feedback.creator?.email || feedback.senderEmail}
                          </span>
                        ))}
                    </div>
                  </TableCell>

                  <TableCell className="max-w-[500px]">
                    <p className="line-clamp-2">{feedback.message}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("px-2 py-1 font-medium", statusColors[feedback.status])}>
                      {feedback.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => showDetails(feedback)}>Voir les détails</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(feedback.id, "resolved")}
                          disabled={feedback.status === "resolved"}
                        >
                          Marquer comme résolu
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(feedback.id)} className="text-destructive">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <FeedbackDetailsModal feedback={selectedFeedback} open={detailsModalOpen} onOpenChange={setDetailsModalOpen} />
    </>
  );
}
