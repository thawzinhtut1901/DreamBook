import {
  createBookHistory,
  deleteHistory,
  getAllBookHistory,
} from "@/api/bookHistoryApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateBookHistory = () =>
  useMutation({
    mutationFn: ({ bookSlug }: { bookSlug: string }) =>
      createBookHistory(bookSlug),
  });

export const useFetchAllHistory = () =>
  useQuery({
    queryKey: ["history"],
    queryFn: () => getAllBookHistory(),
  });

export const useDeleteHistory = () =>
  useMutation({ mutationFn: (bookSlug: string) => deleteHistory(bookSlug) });
