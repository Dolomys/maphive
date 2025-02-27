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
    latitude: z.number(),
    longitude: z.number(),
  }),
  contact: z.string().optional(),
  type: z.nativeEnum(ActivityCategory).optional().default(ActivityCategory.structure),
  imageUrl: z.string().optional(),
  duration: z.number().min(1).max(24).optional(),
  missions: z.array(z.string()).optional(),
  isPaid: z.boolean().optional(),
  rating: z.number().min(1).max(5).optional(),
});

export type CreateActivityInput = z.infer<typeof CreateActivitySchema>;
