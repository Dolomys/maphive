"use client";
import { Suspense, useState } from "react";
import { ActivitiesTable } from "./components/ActivitiesTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CreateUpdateActivityModal } from "@/app/map/components/CreateUpdateActivityModal";
import { useActivities } from "@/app/map/hooks/useActivities";
import { useAuth } from "@/app/(auth)/hooks/useAuth";
import { UserRole } from "@prisma/client";
import { Loader } from "@/components/ui/loader";

export default function ActivitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActivitiesContent />
    </Suspense>
  );
}

function ActivitiesContent() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { user } = useAuth();
  const { activities, isLoading } = useActivities(user?.role === UserRole.admin ? undefined : user?.id);
  let activitiesToDisplay = activities;

  if (user?.role !== UserRole.admin) {
    activitiesToDisplay = activities?.filter((activity) => activity.creator.id === user?.id);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="py-8" />
      </div>
    );
  }

  if (!activitiesToDisplay) {
    return <div>No activities found</div>;
  }

  return (
    <div className="container py-10 px-4 md:px-0 max-w-7xl mx-auto ">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Mes Stages</h1>
            <p className="text-muted-foreground mt-2">Gérez vos stages créés sur la plateforme</p>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" className="w-fit" onClick={() => setOpenCreateModal(true)}>
              <PlusIcon className="w-6 h-6 mr-2" /> Ajouter un stage
            </Button>

            <div className="bg-muted/50 p-4 rounded-lg space-y-1">
              <p className="text-2xl font-bold">{activitiesToDisplay.length}</p>
              <p className="text-sm text-muted-foreground">Total stages</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <ActivitiesTable activities={activitiesToDisplay} />
      </div>
      <CreateUpdateActivityModal open={openCreateModal} onOpenChange={setOpenCreateModal} />
    </div>
  );
}
