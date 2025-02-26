"use server";
import { authActionClient } from "@/lib/safe-actions";
import { prisma } from "@/lib/prisma";
import { ActivityCategory } from "@prisma/client";
import { CreateActivitySchema } from "../models/activity";

export const createActivity = authActionClient
  .metadata({ name: "create-activity" })
  .schema(CreateActivitySchema)
  .action(async ({ parsedInput: { title, subtitle, description, adress, contact }, ctx: { user } }) => {
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
    });
    console.log("ACTIVITY", activity);

    return activity;
  });
