import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTables,
  createTable,
  deleteTable,
  updateTable,
} from "../api/tables.js";

export const useTables = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  const addMutation = useMutation({
    mutationFn: createTable,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTable,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTable(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
  });

  const updateTableStatus = useMutation({
    mutationFn: ({ id, status }) => updateTableStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
  });

  return {
    tables: data,
    isLoading,
    isError,
    error,

    addTable: addMutation.mutate,
    deleteTable: deleteMutation.mutate,
    updateTable: updateMutation.mutate,
    updateTableStatus: updateTableStatus.mutate,

    addError: addMutation.error,
    deleteError: deleteMutation.error,
    updateError: updateMutation.error,
    updateStatusError: updateTableStatus.error,
    addSuccess: addMutation.isSuccess,
    deleteSuccess: deleteMutation.isSuccess,
    updateSuccess: updateMutation.isSuccess,
    updateStatusSuccess: updateTableStatus.isSuccess,
  };
};
