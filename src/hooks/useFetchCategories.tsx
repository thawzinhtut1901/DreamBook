import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api";
import {
  createInterestedCategories,
  fetchTrendingCategories,
} from "@/api/categoryApi";
import { categoryData } from "@/types/types";

export const useFetchCategories = () =>
  useQuery({ queryKey: ["category"], queryFn: fetchCategories });

export const useInterestedCategories = () =>
  useMutation({
    mutationFn: (data: categoryData) => createInterestedCategories(data),
  });

export const useFetchTrendingCategories = () =>
  useQuery({
    queryKey: ["trending category"],
    queryFn: fetchTrendingCategories,
  });
