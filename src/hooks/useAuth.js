import { useMutation } from "@tanstack/react-query";
import { login as loginApi, register as registerApi } from "../api/user";

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: loginApi,
  });

  const registerMutation = useMutation({
    mutationFn: registerApi,
  });

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,

    isLoginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
  };
};
