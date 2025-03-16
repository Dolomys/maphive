import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ActivityFilters } from "@/app/map/models/filters";

export async function POST(request: NextRequest) {
  try {
    const filters = (await request.json()) as ActivityFilters;

    const where: Prisma.ActivityWhereInput = {
      ...(filters.creatorId
        ? {
            OR: [{ creator: { id: filters.creatorId } }, { status: "published" }],
          }
        : filters.onlyPublished
        ? { status: "published" }
        : {}),
      AND: [
        filters.studyType ? { creator: { study: { type: filters.studyType } } } : {},
        filters.withCoordinates ? { address: { latitude: { not: null }, longitude: { not: null } } } : {},
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
    const activities = await prisma.activity.findMany({
      where,
      include: {
        address: true,
        creator: {
          select: {
            name: true,
            email: true,
            study: {
              select: {
                type: true,
              },
            },
          },
        },
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

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;

//   const studyType = searchParams.get("studyType") as StudyType;
//   const search = searchParams.get("search");
//   const type = searchParams.get("type");
//   const minDuration = searchParams.get("minDuration");
//   const maxDuration = searchParams.get("maxDuration");
//   const isPaid = searchParams.get("isPaid");
//   const minRating = searchParams.get("minRating");
//   const maxRating = searchParams.get("maxRating");
//   const city = searchParams.get("city");

//   const where: Prisma.ActivityWhereInput = {
//     status: "published",
//     ...(search && {
//       OR: [
//         { title: { contains: search, mode: "insensitive" } },
//         { subtitle: { contains: search, mode: "insensitive" } },
//         { description: { contains: search, mode: "insensitive" } },
//       ],
//     }),
//     ...(type && { type }),
//     ...(minDuration && { duration: { gte: parseInt(minDuration) } }),
//     ...(maxDuration && { duration: { lte: parseInt(maxDuration) } }),
//     ...(isPaid && { isPaid: isPaid === "true" }),
//     ...(minRating && { rating: { gte: parseFloat(minRating) } }),
//     ...(maxRating && { rating: { lte: parseFloat(maxRating) } }),
//     ...(city && {
//       address: {
//         city: { contains: city, mode: "insensitive" },
//       },
//     }),
//     ...(studyType && {
//       creator: {
//         study: {
//           type: studyType,
//         },
//       },
//     }),
//   };

//   const activities = await prisma.activity.findMany({
//     where,
//     include: {
//       address: true,
//       creator: {
//         select: {
//           name: true,
//           email: true,
//           study: {
//             select: {
//               type: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   return NextResponse.json(activities);
// }
