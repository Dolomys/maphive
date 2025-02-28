"use client";

import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { useState } from "react";
import { FeedbackModal } from "./FeedbackModal";

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg h-12 w-12"
        size="icon"
      >
        <MessageSquarePlus className="h-12 w-12" />
      </Button>
      <FeedbackModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
