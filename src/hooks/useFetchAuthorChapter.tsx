import { deleteChapter, getAuthorChapter } from "@/api/getChapter";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchAuthorAChapter = (bookSlug: string) =>
  useQuery({
    queryKey: ["authorChapter", bookSlug],
    queryFn: () => getAuthorChapter(bookSlug),
    retry(failureCount, error) {
      return error.message === "404" && failureCount == 1 ? false : true;
    },
  });

export const useDeleteChapter = () =>
  useMutation({
    mutationFn: (chapterId: string) => deleteChapter(chapterId),
  });
