import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";
import { BookHistoryData } from "@/types/types";

const token = getToken();

export const createBookHistory = async (bookSlug: string) => {
  const response: Response = await fetch(`${BaseURL}/history`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "POST",
    redirect: "follow",
    body: JSON.stringify({ bookSlug }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};

export const getAllBookHistory = async () => {
  const response: Response = await fetch(`${BaseURL}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "GET",
    redirect: "follow",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result as BookHistoryData[];
};

export const deleteHistory = async (bookSlug: string) => {
  const response: Response = await fetch(
    `${BaseURL}/history?slug=${bookSlug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "DELETE",
      redirect: "follow",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete the book");
  }

  return response.status;
};
