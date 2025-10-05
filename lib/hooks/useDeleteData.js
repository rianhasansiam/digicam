
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteData = ({ name, api, optimistic = true }) => {
  const queryClient = useQueryClient();

  // ✅ DELETE Data with error handling and optimistic updates
  const { mutate, mutateAsync, isPending, isLoading, error } = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axios.delete(`${api}/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete data');
      }
    },
    // Optimistic update for instant UI feedback
    onMutate: async (deletedId) => {
      if (!optimistic) return;
      
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [name] });
      
      // Snapshot the previous value
      const previousData = queryClient.getQueryData([name]);
      
      // Optimistically remove the item
      if (previousData && Array.isArray(previousData)) {
        queryClient.setQueryData([name], 
          previousData.filter(item => 
            item._id !== deletedId && item.id !== deletedId
          )
        );
      }
      
      // Return context with the snapshot value
      return { previousData };
    },
    // If the mutation fails, use the context to roll back
    onError: (err, deletedId, context) => {
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
    deleteData: mutate, 
    deleteDataAsync: mutateAsync,
    isLoading: isPending || isLoading,
    isPending, 
    error 
  };
};