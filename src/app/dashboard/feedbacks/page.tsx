import { FeedbackTable } from "@/components/FeedbackTable";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export default async function FeedbacksPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const feedbacks = await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      creator: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  // Transformer les dates en strings pour la sérialisation
  const serializedFeedbacks = feedbacks.map((feedback) => ({
    ...feedback,
    createdAt: feedback.createdAt.toISOString(),
    updatedAt: feedback.updatedAt.toISOString(),
  }));

  return (
    <div className="container py-10 max-w-7xl mx-auto">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Feedbacks</h1>
            <p className="text-muted-foreground mt-2">Gérez et suivez les retours des utilisateurs de la plateforme</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-1">
              <p className="text-2xl font-bold">{feedbacks.length}</p>
              <p className="text-sm text-muted-foreground">Total feedbacks</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card shadow-sm">
        <FeedbackTable feedbacks={serializedFeedbacks} />
      </div>
    </div>
  );
}
