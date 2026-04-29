import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getInventory,
  createInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
  getInventoryByName,
  getInventoryById,
} from "../api/inventory.js";

export const useInventory = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventory,
  });

  const addMutation = useMutation({
    mutationFn: createInventoryItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInventoryItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateInventoryItem(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });

  const getByNameMutation = useMutation({
    mutationFn: (name) => getInventoryByName(name),
  });

  const getByIdMutation = useMutation({
    mutationFn: (id) => getInventoryById(id),
  });

  return {
    inventory: data,
    isLoading,
    isError,
    error,

    addInventoryItem: addMutation.mutate,
    addInventoryItemAsync: addMutation.mutateAsync,
    deleteInventoryItem: deleteMutation.mutate,
    deleteInventoryItemAsync: deleteMutation.mutateAsync,
    updateInventoryItem: updateMutation.mutate,
    updateInventoryItemAsync: updateMutation.mutateAsync,
    getInventoryByName: getByNameMutation.mutate,
    getInventoryById: getByIdMutation.mutate,

    addError: addMutation.error,
    deleteError: deleteMutation.error,
    updateError: updateMutation.error,
    getByNameError: getByNameMutation.error,
    getByIdError: getByIdMutation.error,

    addSuccess: addMutation.isSuccess,
    deleteSuccess: deleteMutation.isSuccess,
    updateSuccess: updateMutation.isSuccess,
    getByNameSuccess: getByNameMutation.isSuccess,
    getByIdSuccess: getByIdMutation.isSuccess,
  };
};
