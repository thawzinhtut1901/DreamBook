import {
  createChapaterProgressApi,
  fetchProgressUpdate,
  getCurrentChapter,
} from "@/api/chapterProgressApi";
import { ChapterProgressData, UpdateProgressData } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateChapterProgress = () =>
  useMutation({
    mutationFn: (data: ChapterProgressData) =>
      createChapaterProgressApi({ data }),
  });

export const useFetchCurrentChapter = (bookSlug: string) =>
  useQuery({
    queryKey: ["current-chapter", bookSlug],
    queryFn: () => getCurrentChapter({ bookSlug }),
  });

export const useUpdateChapterProgress = () =>
  useMutation({
    mutationFn: ({
      bookSlug,
      data,
    }: {
      bookSlug: string;
      data: UpdateProgressData;
    }) => fetchProgressUpdate(bookSlug, data),
  });
