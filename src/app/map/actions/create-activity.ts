"use server";
import { authActionClient } from "@/lib/safe-actions";
import { prisma } from "@/lib/prisma";
import { ActivityCategory } from "@prisma/client";
import { CreateActivitySchema } from "../models/activity";
import { revalidatePath } from "next/cache";

export const createActivity = authActionClient
  .metadata({ name: "create-activity" })
  .schema(CreateActivitySchema)
  .action(
    async ({
      parsedInput: { title, subtitle, description, adress, contact, duration, missions, isPaid, rating, imageUrl },
      ctx: { user },
    }) => {
      const activity = await prisma.activity.create({
        data: {
          title,
          subtitle,
          description,
          type: ActivityCategory.structure,
          creator: {
            connect: {
              id: user?.id,
            },
          },
          contact,
          duration,
          missions: missions || [],
          isPaid: isPaid || false,
          rating,
          imageUrl,
          address: {
            create: {
              street: adress.street,
              city: adress.city,
              zip: adress.zip,
              latitude: adress.latitude,
              longitude: adress.longitude,
            },
          },
        },
        include: {
          address: true,
        },
      });
      revalidatePath("/dashboard/activities", "page");
      return activity;
    }
  );
