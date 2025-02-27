"use server";
import { authActionClient } from "@/lib/safe-actions";
import { prisma } from "@/lib/prisma";
import { ActivityCategory } from "@prisma/client";
import { CreateActivitySchema } from "../models/activity";
import { z } from "zod";

export const updateActivity = authActionClient
  .metadata({ name: "update-activity" })
  .schema(CreateActivitySchema.extend({ id: z.string() }))
  .action(
    async ({
      parsedInput: {
        id,
        title,
        subtitle,
        description,
        adress,
        contact,
        // Nouveaux champs
        duration,
        missions,
        isPaid,
        rating,
        imageUrl,
      },
      ctx: { user },
    }) => {
      // Mettre à jour l'activité et son adresse en une seule transaction
      const activity = await prisma.activity.update({
        where: {
          id,
          createdBy: user?.id,
        },
        data: {
          title,
          subtitle,
          description,
          type: ActivityCategory.structure,
          contact,
          // Nouveaux champs
          duration,
          missions: missions || [],
          isPaid: isPaid || false,
          rating,
          imageUrl,
          address: {
            // Utiliser upsert au lieu de create pour gérer à la fois la création et la mise à jour
            upsert: {
              // Créer si n'existe pas
              create: {
                street: adress.street,
                city: adress.city,
                zip: adress.zip,
                latitude: adress.latitude,
                longitude: adress.longitude,
              },
              // Mettre à jour si existe
              update: {
                street: adress.street,
                city: adress.city,
                zip: adress.zip,
                latitude: adress.latitude,
                longitude: adress.longitude,
              },
            },
          },
        },
        // Inclure l'adresse dans la réponse
        include: {
          address: true,
        },
      });

      return activity;
    }
  );
