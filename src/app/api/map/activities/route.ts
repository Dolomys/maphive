import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ActivityFilters } from "@/app/map/models/filters";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const filters = (await request.json()) as ActivityFilters;

    const where: Prisma.ActivityWhereInput = {
      AND: [
        filters.type ? { type: filters.type } : {},
        filters.isPaid !== undefined ? { isPaid: filters.isPaid } : {},
        filters.minDuration ? { duration: { gte: filters.minDuration } } : {},
        filters.maxDuration ? { duration: { lte: filters.maxDuration } } : {},
        filters.minRating ? { rating: { gte: filters.minRating } } : {},
        filters.maxRating ? { rating: { lte: filters.maxRating } } : {},
        filters.city ? { address: { city: { contains: filters.city, mode: "insensitive" } } } : {},
        filters.search
          ? {
              OR: [
                { title: { contains: filters.search, mode: "insensitive" } },
                { subtitle: { contains: filters.search, mode: "insensitive" } },
                { description: { contains: filters.search, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };

    console.log("WHERE IS", where);

    const activities = await prisma.activity.findMany({
      where,
      include: {
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.log("ERROR IS", error);
    console.error("Error fetching activities:", error);
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}
