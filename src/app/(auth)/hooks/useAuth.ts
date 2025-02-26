"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, signup, logout } from "../actions/auth.actions";
import { createClient } from "@/lib/supabase/client";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading: isLoadingSession } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user?.user_metadata;
    },
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await login({ email, password });
      if (result?.serverError) throw result.serverError;
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/map");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({ email, password, name }: { email: string; password: string; name: string }) => {
      const result = await signup({ email, password, name });
      if (result?.serverError) throw result.serverError;
      return result?.data;
    },
    onSuccess: () => {
      router.push("/verify-email");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const result = await logout();
      if (result?.serverError) throw result.serverError;
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/login");
    },
  });

  return {
    user,
    isLoadingSession,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    signUp: signUpMutation.mutate,
    isSigningUp: signUpMutation.isPending,
    signUpError: signUpMutation.error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
