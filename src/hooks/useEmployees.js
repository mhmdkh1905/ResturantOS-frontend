import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../api/employees.js";

export const useEmployees = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const addMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateEmployee(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  return {
    employees: data,
    isLoading,
    isError,
    error,

    addEmployee: addMutation.mutate,
    deleteEmployee: deleteMutation.mutate,
    updateEmployee: updateMutation.mutate,

    addError: addMutation.error,
    deleteError: deleteMutation.error,
    updateError: updateMutation.error,

    addSuccess: addMutation.isSuccess,
    deleteSuccess: deleteMutation.isSuccess,
    updateSuccess: updateMutation.isSuccess,
  };
};
