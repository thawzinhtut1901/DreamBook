import {
  fetchAllBook,
  fetchBook,
  fetchLatestBooks,
  fetchPopularBooks,
  fetchRecommendBooks,
} from "@/api/bookApi";
import { useQuery } from "@tanstack/react-query";

interface FetchAllBookParams {
  deBounceSearch?: string;
  selectedCategories?: string[];
  sortBy?: string;
  pageCount?: number;
}

export const useFetchABook = (bookSlug: string) =>
  useQuery({
    queryKey: ["book", bookSlug],
    queryFn: () => fetchBook(bookSlug),
  });

export const useFetchAllBooks = (params: FetchAllBookParams) =>
  useQuery({
    queryKey: ["allBooks", params],
    queryFn: () => fetchAllBook(params),
  });

export const useFetchPopularBooks = () =>
  useQuery({
    queryKey: ["popular Books"],
    queryFn: () => fetchPopularBooks(),
  });

export const usefetchLatestBooks = () =>
  useQuery({ queryKey: ["latest Books"], queryFn: () => fetchLatestBooks() });

export const useFetchRecommendBooks = () =>
  useQuery({
    queryKey: ["Recommend Books"],
    queryFn: () => fetchRecommendBooks(),
  });
