import { getAChapter, getAllChapters } from "@/api/getChapter";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllChapters = (bookSlug: string) =>
  useQuery({
    queryKey: ["all-chapters", bookSlug],
    queryFn: () => getAllChapters(bookSlug),
  });

export const useFetchAChapter = (chapterId: number) =>
  useQuery({
    queryKey: ["chapter", chapterId],
    queryFn: () => getAChapter(chapterId),
  });
