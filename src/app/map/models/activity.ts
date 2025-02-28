import { ActivityCategory, Prisma } from "@prisma/client";
import { z } from "zod";

export type Activity = Prisma.ActivityGetPayload<{
  include: {
    address: true;
  };
}>;

export const CreateActivitySchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  adress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    zip: z.string().min(1),
    latitude: z.number().min(1),
    longitude: z.number().min(1),
  }),
  contact: z.string().min(1),
  type: z.nativeEnum(ActivityCategory).optional().default(ActivityCategory.structure),
  imageUrl: z.string().optional(),
  duration: z.number().min(1).max(24).optional(),
  missions: z.array(z.string()).optional(),
  isPaid: z.boolean().optional(),
  rating: z.number().min(1).max(5).optional(),
});

export type CreateActivityInput = z.infer<typeof CreateActivitySchema>;
