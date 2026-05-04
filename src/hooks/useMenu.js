import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../api/menu.js";

const SAMPLE_MENU_ITEMS = [
  {
    id: "1",
    name: "Cheeseburger",
    price: 12.99,
    category: "Maine Course",
    image: "https://via.placeholder.com/300x200?text=Burger",
  },
  {
    id: "2",
    name: "Margherita Pizza",
    price: 14.99,
    category: "Main Course",
    image: "https://via.placeholder.com/300x200?text=Pizza",
  },
  {
    id: "3",
    name: "Caesar Salad",
    price: 8.99,
    category: "Salad",
    image: "https://via.placeholder.com/300x200?text=Salad",
  },
  {
    id: "4",
    name: "Chocolate Cake",
    price: 6.99,
    category: "Dessert",
    image: "https://via.placeholder.com/300x200?text=Cake",
  },
  {
    id: "5",
    name: "Coca Cola",
    price: 2.49,
    category: "Drink",
    image: "https://via.placeholder.com/300x200?text=Cola",
  },
  {
    id: "6",
    name: "Grilled Chicken",
    price: 15.99,
    category: "Main Course",
    image: "https://via.placeholder.com/300x200?text=Chicken",
  },
  {
    id: "7",
    name: "French Fries",
    price: 4.99,
    category: "Appetizer",
    image: "https://via.placeholder.com/300x200?text=Fries",
  },
  {
    id: "8",
    name: "Tomato Soup",
    price: 5.99,
    category: "Soup",
    image: "https://via.placeholder.com/300x200?text=Soup",
  },
];

export const useMenu = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  const menuItems = data?.length ? data : SAMPLE_MENU_ITEMS;

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
    menuItems,
    isLoading,
    isError,
    error,

    addMenuItem: addMutation.mutate,
    addMenuItemAsync: addMutation.mutateAsync,
    deleteMenuItem: deleteMutation.mutate,
    deleteMenuItemAsync: deleteMutation.mutateAsync,
    updateMenuItem: updateMutation.mutate,
    updateMenuItemAsync: updateMutation.mutateAsync,

    addError: addMutation.error,
    deleteError: deleteMutation.error,
    updateError: updateMutation.error,

    addSuccess: addMutation.isSuccess,
    deleteSuccess: deleteMutation.isSuccess,
    updateSuccess: updateMutation.isSuccess,
  };
};
