import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { logger } from "./logger";
import { createClient } from "./supabase/server";
import { prisma } from "./prisma";

export const actionClient = createSafeActionClient();

export const actionClientWithMeta = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
      track: z
        .object({
          event: z.string(),
          channel: z.string(),
        })
        .optional(),
    });
  },
});

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: {} });

    if (process.env.NODE_ENV === "development") {
      logger.info(`Input -> ${JSON.stringify(clientInput)}`);
      logger.info(`Result -> ${JSON.stringify(result.data)}`);
      logger.info(`Metadata -> ${JSON.stringify(metadata)}`);

      return result;
    }

    return result;
  })
  .use(async ({ next }) => {
    const supabase = await createClient();
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();

    const user = await prisma.user
      .findUnique({
        where: {
          id: supabaseUser?.id,
        },
      })
      .catch((error) => {
        console.error("Error fetching user", error);
        return null;
      });

    if (!user && !supabaseUser) {
      throw new Error("Unauthorized");
    }
    return next({
      ctx: {
        user,
      },
    });
  });
