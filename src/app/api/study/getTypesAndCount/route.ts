import { prisma } from "@/lib/prisma";

export async function GET() {
  const types = await prisma.study.groupBy({
    by: ["type"],
    _count: {
      _all: true,
    },
  });

  return Response.json(types);
}
