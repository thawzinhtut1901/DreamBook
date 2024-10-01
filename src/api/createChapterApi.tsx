import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";
import { createChapterData } from "@/types/types";
const token = getToken();

export const createChapterApi = async ({
  data,
}: {
  data: createChapterData;
}) => {
  const response: Response = await fetch(`${BaseURL}/chapters`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};

export const updateChapterApi = async ({
  data,
  ChapterId,
}: {
  data: createChapterData;
  ChapterId: string;
}) => {
  const response: Response = await fetch(`${BaseURL}/chapters/${ChapterId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "PATCH",
    redirect: "follow",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};
