import { fetchMyProfile } from "@/api";
import { fetchOtherProfile, getUserBook } from "@/api/userApi";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

export const useGetMe = (token: string) =>
  useQuery({
    queryKey: ["me", token],
    queryFn: () => fetchMyProfile(token),
  });

export const useGetOther = (userId: string) =>
  useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchOtherProfile(userId),
  });

export const useGetUserBook = (userId: string) =>
  useInfiniteQuery({
    queryKey: ["userBook", userId],
    queryFn: ({ queryKey, pageParam = 1 }) =>
      getUserBook(queryKey[1], pageParam),
    initialPageParam: 1,
    retry(failureCount, error) {
      return error.message === "404" && failureCount == 1 ? false : true;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === lastPage.meta.totalPages) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
