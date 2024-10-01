import { Book, fetchBookData } from "@/types/types";
import BaseURL from "../services/ApiEndPoint";
import { getToken } from "@/services/authService";
const token = getToken();

interface FetchAllBookParams {
  deBounceSearch?: string;
  selectedCategories?: string | number | (string | number)[];
  sortBy?: string;
  pageCount?: number;
}

export const fetchBook = async (bookSlug: string) => {
  const response: Response = await fetch(
    `${BaseURL}/books/public/${bookSlug}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "GET",
      redirect: "follow",
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch book data");
  }
  return result as Book;
};

export const fetchAllBook = async (params: FetchAllBookParams = {}) => {
  const { deBounceSearch, sortBy, selectedCategories, pageCount } = params;

  const queryParams = new URLSearchParams();
  if (selectedCategories) {
    const categoryString = Array.isArray(selectedCategories)
      ? selectedCategories.join(",")
      : selectedCategories.toString();
    queryParams.append("category_ids", categoryString);
  }
  if (deBounceSearch) {
    queryParams.append("search", deBounceSearch);
  }
  if (sortBy) {
    queryParams.append("sortBy", sortBy);
  }
  if (pageCount) {
    queryParams.append("page", pageCount.toString());
  }
  const response: Response = await fetch(
    `${BaseURL}/books/public?${queryParams.toString()}`,
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
    throw new Error(result.message || "Failed to fetch books data");
  }
  return result as fetchBookData;
};

export const fetchPopularBooks = async () => {
  const response: Response = await fetch(`${BaseURL}/books/popular?limit=10`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    method: "GET",
    redirect: "follow",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch books data");
  }
  return result as fetchBookData;
};

export const fetchLatestBooks = async () => {
  const response: Response = await fetch(
    `${BaseURL}/books/public?sortBy=latest&limit=10`,
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
    throw new Error(result.message || "Failed to fetch books data");
  }
  return result as fetchBookData;
};

export const fetchRecommendBooks = async () => {
  const response: Response = await fetch(
    `${BaseURL}/books/recommended?limit=10`,
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
    throw new Error(result.message || "Failed to fetch books data");
  }
  return result as fetchBookData;
};
