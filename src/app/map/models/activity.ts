import { ActivityCategory, ActivityStatus, Prisma } from "@prisma/client";
import { z } from "zod";

export type Activity = Prisma.ActivityGetPayload<{
  include: {
    address: true;
    creator: {
      select: {
        id: true;
        name: true;
        email: true;
        study: {
          select: {
            type: true;
            name: true;
          };
        };
      };
    };
  };
}>;

export const CreateActivitySchema = z.object({
  title: z.string().min(1).max(55),
  subtitle: z.string().min(1).max(55),
  description: z.string().min(1),
  adress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    zip: z.string().min(1),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  contact: z.string().min(1),
  type: z.nativeEnum(ActivityCategory).optional().default(ActivityCategory.structure),
  imageUrl: z.string().optional(),
  duration: z.number().min(1).max(24).optional(),
  missions: z.array(z.string()).optional(),
  isPaid: z.boolean().optional(),
  rating: z.number().min(1).max(5).optional(),
  status: z.nativeEnum(ActivityStatus).optional().default(ActivityStatus.draft),
});

export const UpdateActivitySchema = CreateActivitySchema.partial();

export type CreateActivityInput = z.infer<typeof CreateActivitySchema>;
export type UpdateActivityInput = z.infer<typeof UpdateActivitySchema>;
