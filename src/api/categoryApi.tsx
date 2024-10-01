import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";
import { categoryData } from "@/types/types";

export const fetchCategories = async () => {
  const response: Response = await fetch(`${BaseURL}/categories`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result as any[];
};

export const createInterestedCategories = async (data: categoryData) => {
  const token = getToken();
  const response: Response = await fetch(`${BaseURL}/interested-categories`, {
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

export const fetchTrendingCategories = async () => {
  const response: Response = await fetch(`${BaseURL}/categories?limit=6`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error();
  }
  return result as any[];
};
