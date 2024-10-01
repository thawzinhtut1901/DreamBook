import { createChapterApi, updateChapterApi } from "@/api/createChapterApi";
import { createChapterData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const useChapterCreate = () =>
  useMutation({
    mutationFn: (data: createChapterData) => createChapterApi({ data }),
  });

export const useChapterUpdate = (ChapterId: string) =>
  useMutation({
    mutationFn: (data: createChapterData) =>
      updateChapterApi({ data, ChapterId }),
  });
