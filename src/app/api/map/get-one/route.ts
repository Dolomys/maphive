import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const activity = await prisma.activity.findUnique({
    where: { id },
    include: {
      address: true,
    },
  });

  return NextResponse.json(activity);
}
