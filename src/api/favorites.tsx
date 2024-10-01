import BaseURL from "@/services/ApiEndPoint";
import { getToken } from "@/services/authService";
import { favoriteData, fetchFavoriteBookData } from "@/types/types";

const token = getToken();
interface FetchAllFavBookParams {
  pageCount?: number;
}
export const addFavorite = async ({ data }: { data: favoriteData }) => {
  const response: Response = await fetch(`${BaseURL}/favorites`, {
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
    throw new Error();
  }
  return result;
};

export const removeFavorite = async ({ data }: { data: favoriteData }) => {
  const response: Response = await fetch(`${BaseURL}/favorites`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "DELETE",
    redirect: "follow",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result;
};

export const getFavorite = async (params: FetchAllFavBookParams) => {
  const { pageCount } = params;

  const queryParams = new URLSearchParams();
  if (pageCount) {
    queryParams.append("page", pageCount.toString());
  }
  const response: Response = await fetch(
    `${BaseURL}/favorites?${queryParams.toString()}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result as fetchFavoriteBookData;
};
