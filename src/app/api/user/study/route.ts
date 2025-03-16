import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const study = await prisma.study.upsert({
      where: {
        userId: user.id,
      },
      update: {
        name: body.name,
        type: body.type,
        level: body.level,
      },
      create: {
        name: body.name,
        type: body.type,
        level: body.level,
        userId: user.id,
      },
    });

    return NextResponse.json(study);
  } catch (error) {
    console.error("Error updating study info:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const study = await prisma.study.findUnique({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(study);
  } catch (error) {
    console.error("Error fetching study info:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
