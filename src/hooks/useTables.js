import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTables,
  createTable,
  deleteTable,
  updateTable,
} from "../api/tables.js";

const SAMPLE_TABLES = [
  { id: '1', number: 1, seats: 4, status: 'free' },
  { id: '2', number: 2, seats: 4, status: 'occupied' },
  { id: '3', number: 3, seats: 6, status: 'free' },
  { id: '4', number: 4, seats: 4, status: 'reserved' },
  { id: '5', number: 5, seats: 8, status: 'free' },
  { id: '6', number: 6, seats: 4, status: 'occupied' },
  { id: '7', number: 7, seats: 4, status: 'free' },
  { id: '8', number: 8, seats: 6, status: 'free' },
  { id: '9', number: 9, seats: 4, status: 'occupied' },
  { id: '10', number: 10, seats: 4, status: 'free' },
  { id: '11', number: 11, seats: 8, status: 'reserved' },
  { id: '12', number: 12, seats: 4, status: 'free' }
];

export const useTables = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  const tables = data?.length ? data : SAMPLE_TABLES;

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
    tables,
    isLoading,
    isError,
    error,

    addTable: addMutation.mutate,
    deleteTable: deleteMutation.mutate,
    deleteTableAsync: deleteMutation.mutateAsync,
    updateTable: updateMutation.mutate,
    updateTableAsync: updateMutation.mutateAsync,
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
