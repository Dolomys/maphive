"use client";

import { StudyInfoModal } from "@/components/modals/StudyInfoModal";
import { useAuth } from "@/app/(auth)/hooks/useAuth";

export function StudyInfoProvider() {
  const { showStudyModal, setShowStudyModal } = useAuth();

  return <StudyInfoModal open={showStudyModal} onOpenChange={setShowStudyModal} />;
}
