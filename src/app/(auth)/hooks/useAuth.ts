"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, signup, logout } from "../actions/auth.actions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading: isLoadingSession } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await fetch("/api/user/get-me");
      return data.json() as Promise<User>;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { data: studyInfo } = useQuery({
    queryKey: ["study"],
    queryFn: async () => {
      if (!user) return null;
      const response = await fetch("/api/user/study");
      return response.json();
    },
    enabled: !!user,
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
      queryClient.clear();
      queryClient.resetQueries();
      router.push("/login");
    },
  });

  const [showStudyModal, setShowStudyModal] = useState(false);

  useEffect(() => {
    if (user && !studyInfo && !isLoadingSession) {
      setShowStudyModal(true);
    } else {
      setShowStudyModal(false);
    }
  }, [user, studyInfo, isLoadingSession]);

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
    showStudyModal,
    setShowStudyModal,
    studyInfo,
  };
}
