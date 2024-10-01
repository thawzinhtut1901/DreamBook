import { relatedBookApi } from "@/api/relatedBookApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useRelatedBook = (bookSlug: string) =>
  useInfiniteQuery({
    queryKey: ["related", bookSlug],
    queryFn: ({ queryKey, pageParam = 1 }) =>
      relatedBookApi(queryKey[1], pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === lastPage.meta.totalPages) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
