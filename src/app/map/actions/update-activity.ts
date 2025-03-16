"use server";
import { authActionClient } from "@/lib/safe-actions";
import { prisma } from "@/lib/prisma";
import { ActivityCategory, ActivityStatus, UserRole } from "@prisma/client";
import { UpdateActivitySchema } from "../models/activity";
import { z } from "zod";

export const updateActivity = authActionClient
  .metadata({ name: "update-activity" })
  .schema(UpdateActivitySchema.extend({ id: z.string() }))
  .action(
    async ({
      parsedInput: {
        id,
        title,
        subtitle,
        description,
        adress,
        contact,
        status,
        duration,
        missions,
        isPaid,
        rating,
        imageUrl,
      },
      ctx: { user, isAdmin },
    }) => {
      const activity = await prisma.activity.update({
        where: {
          id,
          createdBy: isAdmin ? undefined : user?.id,
        },
        data: {
          title,
          subtitle,
          description,
          type: ActivityCategory.structure,
          status: user?.role === UserRole.admin ? status : ActivityStatus.draft,
          contact,
          duration,
          missions: missions || [],
          isPaid: isPaid || false,
          rating,
          imageUrl,
          address: {
            update: {
              street: adress?.street,
              city: adress?.city,
              zip: adress?.zip,
              latitude: adress?.latitude,
              longitude: adress?.longitude,
            },
          },
        },
        include: {
          address: true,
        },
      });
      return activity;
    }
  );
