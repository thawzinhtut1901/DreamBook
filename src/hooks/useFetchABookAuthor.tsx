import { fetchAllBookAuthor, fetchABookAuthor } from "@/api/GetABookAuthorApi";
import { updateBookApi } from "@/api/updateBook";
import { updateBookType } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";

interface FetchAllBookParams {
  deBounceSearch?: string;
  sortBy?: string;
  pageCount?: number;
}

export const useFetchABookAuthor = (bookSlug: string) =>
  useQuery({
    queryKey: ["abookauthor", bookSlug],
    queryFn: () => fetchABookAuthor(bookSlug),
  });

export const useFetchAllBookAuthor = (params: FetchAllBookParams) =>
  useQuery({
    queryKey: ["abookauthor", params],
    queryFn: () => fetchAllBookAuthor(params),
  });

export const useUpdateBook = (bookSlug: string) =>
  useMutation({
    mutationFn: (data: updateBookType) => updateBookApi(bookSlug, { data }),
  });
