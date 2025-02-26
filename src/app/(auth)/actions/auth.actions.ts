"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-actions";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const login = actionClient.schema(loginSchema).action(async ({ parsedInput: { email, password } }) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export const signup = actionClient.schema(signupSchema).action(async ({ parsedInput: { email, password, name } }) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (data.user?.email && data.user?.user_metadata?.name) {
    await prisma.user.create({
      data: {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name,
        emailVerified: data.user?.email_confirmed_at,
      },
    });
    return {
      success: true,
    };
  }

  return {
    success: false,
    error: error?.message ?? "Something went wrong",
  };
});

export const logout = actionClient.action(async () => {
  const supabase = await createClient();

  // Sign out and clear all local storage
  const { error } = await supabase.auth.signOut();

  if (typeof window !== "undefined") {
    // Clear any local storage items related to auth
    localStorage.removeItem("supabase.auth.token");
    // Clear any other auth-related items you might have
  }

  return { success: !error };
});
