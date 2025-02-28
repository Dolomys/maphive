import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { message, senderEmail } = await request.json();

    if (!message || !senderEmail) {
      return new Response("Message and senderEmail are required", { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        message,
        senderEmail,
        createdBy: user?.id || null,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Feedback creation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
