import { addFavorite, getFavorite, removeFavorite } from "@/api/favorites";
import { favoriteData } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";

interface FetchAllFavBookParams {
  pageCount?: number;
}

export const useAddFavorite = () =>
  useMutation({
    mutationFn: (data: favoriteData) => addFavorite({ data }),
  });

export const useRemoveFavorite = () =>
  useMutation({
    mutationFn: (data: favoriteData) => removeFavorite({ data }),
  });

export const useGetFavorite = (params: FetchAllFavBookParams) =>
  useQuery({
    queryKey: ["favorites", params],
    queryFn: () => getFavorite(params),
  });
