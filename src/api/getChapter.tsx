import BaseURL from "@/services/ApiEndPoint";
import { getToken } from "@/services/authService";
import { fetchChapterData } from "@/types/types";

const token = getToken();
export const getAuthorChapter = async (bookSlug: string) => {
  const response: Response = await fetch(
    `${BaseURL}/chapters/author?slug=${bookSlug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return result as fetchChapterData;
};

export const getAuthorAChapter = async (chapterId: string) => {
  const response: Response = await fetch(
    `${BaseURL}/chapters/author/${chapterId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return result as fetchChapterData;
};

export const deleteChapter = async (chapterId: string) => {
  const response: Response = await fetch(`${BaseURL}/chapters/${chapterId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "DELETE",
    redirect: "follow",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return result;
};

export const getAllChapters = async (bookSlug: string) => {
  const response: Response = await fetch(
    `${BaseURL}/chapters/public?slug=${bookSlug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch chapters");
  }

  const data = await response.json();
  return data;
};

export const getAChapter = async (chapterId: number) => {
  const response: Response = await fetch(
    `${BaseURL}/chapters/public/${chapterId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch chapters");
  }

  const data = await response.json();
  return data;
};
