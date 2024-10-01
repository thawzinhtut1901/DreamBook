import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";

export const softDeleteBook = async (bookSlug: string) => {
    const token = getToken();
    const response: Response = await fetch(`${BaseURL}/books/soft/${bookSlug}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        method: "DELETE",
        redirect: "follow",
    });

    if (!response.ok) {
        throw new Error('Failed to delete the book');
      }
    
      return response.status;
};

export const hardDeleteBook = async (bookSlugs: string[]) => {
    const token = getToken();
    const slugs = bookSlugs;
    const response: Response = await fetch(`${BaseURL}/books/hard?slugs=${slugs}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        method: "DELETE",
        redirect: "follow",
    });

    if (!response.ok) {
        throw new Error('Failed to delete the book(s)');
    }
    
    return response.status;
};
