import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userPrisma = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  return NextResponse.json(userPrisma);
}
