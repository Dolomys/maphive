import { ActivityCategory, Prisma } from "@prisma/client";
import { z } from "zod";

export type Activity = Prisma.ActivityGetPayload<{
  include: {
    address: true;
  };
}>;

export const CreateActivitySchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  adress: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),
    state: z.string(),
    country: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  contact: z.string().optional(),
  type: z.nativeEnum(ActivityCategory).optional().default(ActivityCategory.structure),
  imageUrl: z.string().optional(),
});

export type CreateActivityInput = z.infer<typeof CreateActivitySchema>;
