import { Book, fetchBookData } from "@/types/types";
import BaseURL from "../services/ApiEndPoint";
import { getToken } from "@/services/authService";

const token = getToken();

interface FetchAuthorBookParams {
  deBounceSearch?: string;
  sortBy?: string;
  pageCount?: number;
}

export const fetchABookAuthor = async (bookSlug: string) => {
  const response: Response = await fetch(
    `${BaseURL}/books/author/${bookSlug}`,
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
    throw new Error();
  }
  return result as Book;
};

export const fetchAllBookAuthor = async (
  params: FetchAuthorBookParams = {}
) => {
  const { deBounceSearch, sortBy, pageCount } = params;

  const queryParams = new URLSearchParams();

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
    `${BaseURL}/books/author?${queryParams.toString()}`,
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
    throw new Error();
  }
  return result as fetchBookData;
};
