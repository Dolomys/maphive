"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface FeedbackDetailsModalProps {
  feedback: {
    id: string;
    message: string;
    status: "pending" | "inProgress" | "resolved" | "rejected";
    createdAt: string;
    senderEmail: string | null;
    creator?: {
      name: string | null;
      email: string;
    } | null;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-900 border border-yellow-200",
  inProgress: "bg-blue-100 text-blue-900 border border-blue-200",
  resolved: "bg-green-100 text-green-900 border border-green-200",
  rejected: "bg-red-100 text-red-900 border border-red-200",
};

export function FeedbackDetailsModal({ feedback, open, onOpenChange }: FeedbackDetailsModalProps) {
  if (!feedback) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Détails du feedback</DialogTitle>
          <DialogDescription>Envoyé le {dayjs(feedback.createdAt).format("DD/MM/YYYY HH:mm")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Status</h4>
            <Badge variant="secondary" className={cn("px-2 py-1", statusColors[feedback.status])}>
              {feedback.status}
            </Badge>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Utilisateur</h4>
            <p className="text-sm">
              {feedback.creator?.name || "Anonyme"}
              {(feedback.creator?.email || feedback.senderEmail) && (
                <span className="block text-muted-foreground">{feedback.creator?.email || feedback.senderEmail}</span>
              )}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Message</h4>
            <p className="text-sm whitespace-pre-wrap">{feedback.message}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
