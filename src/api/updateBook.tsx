import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";
import { updateBookType } from "@/types/types";

export const updateBookApi = async (
  bookSlug: string,
  { data }: { data: updateBookType }
) => {
  const token = getToken();
  const formData = new FormData();
  formData.append("title", data.title);

  if (data.coverImage) {
    formData.append("coverImage", data.coverImage);
  }
  const keyWords: string[] = [];
  data.keywords.forEach((keyword) => keyWords.push(keyword));
  formData.append("description", data.description);
  formData.append("keywords", JSON.stringify(keyWords));
  formData.append("status", data.status);


  const response: Response = await fetch(
    `${BaseURL}/books/update/${bookSlug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      method: "PATCH",
      body: formData,
    }
  );


  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};
