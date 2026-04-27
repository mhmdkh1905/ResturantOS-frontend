import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../api/menu.js";

export const useMenu = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  const addMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menu"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menu"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateMenuItem(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menu"] }),
  });

  return {
    menuItems: data,
    isLoading,
    isError,
    error,

    addMenuItem: addMutation.mutate,
    addMenuItemAsync: addMutation.mutateAsync,
    deleteMenuItem: deleteMutation.mutate,
    updateMenuItem: updateMutation.mutate,

    addError: addMutation.error,
    deleteError: deleteMutation.error,
    updateError: updateMutation.error,

    addSuccess: addMutation.isSuccess,
    deleteSuccess: deleteMutation.isSuccess,
    updateSuccess: updateMutation.isSuccess,
  };
};

