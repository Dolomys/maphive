import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const activities = await prisma.activity.findMany({
    include: {
      address: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(activities);
}
