import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return new Response("Id is required", { status: 400 });
  }
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await prisma.feedback.delete({
      where: { id: id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Feedback deletion error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return new Response("Id is required", { status: 400 });
  }
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { status } = await request.json();

    const feedback = await prisma.feedback.update({
      where: { id: id },
      data: { status },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Feedback update error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
