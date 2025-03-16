"use server";
import { authActionClient } from "@/lib/safe-actions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { UserRole } from "@prisma/client";

export const deleteActivity = authActionClient
  .metadata({ name: "delete-activity" })
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    const activity = await prisma.activity.delete({
      where: {
        id,
        createdBy: user?.role === UserRole.admin ? undefined : user?.id,
      },
    });
    if (!activity) {
      console.error("Activity not found");
      throw new Error("Activity not found");
    }
    return activity;
  });
