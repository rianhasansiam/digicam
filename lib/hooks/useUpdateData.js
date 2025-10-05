
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateData = ({ name, api, optimistic = true }) => {
  const queryClient = useQueryClient();

  // ✅ UPDATE Data with error handling and optimistic updates
  const { mutate, mutateAsync, isPending, isLoading, error } = useMutation({
    mutationFn: async ({ id, data }) => {
      try {
        const response = await axios.put(`${api}/${id}`, data);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update data');
      }
    },
    // Optimistic update for instant UI feedback
    onMutate: async ({ id, data }) => {
      if (!optimistic) return;
      
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [name] });
      
      // Snapshot the previous value
      const previousData = queryClient.getQueryData([name]);
      
      // Optimistically update to the new value
      if (previousData && Array.isArray(previousData)) {
        queryClient.setQueryData([name], 
          previousData.map(item => 
            item._id === id || item.id === id 
              ? { ...item, ...data, updatedAt: new Date().toISOString() } 
              : item
          )
        );
      }
      
      // Return context with the snapshot value
      return { previousData };
    },
    // If the mutation fails, use the context to roll back
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([name], context.previousData);
      }
    },
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [name] });
    },
  });

  return { 
    updateData: mutate, 
    updateDataAsync: mutateAsync,
    isLoading: isPending || isLoading,
    isPending, 
    error 
  };
};
