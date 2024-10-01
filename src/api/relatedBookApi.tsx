import { relatedBookData } from "@/types/types";
import BaseURL from "../services/ApiEndPoint";

export const relatedBookApi = async(bookSlug: string, pageParam: number) => {
    const response: Response = await fetch(`${BaseURL}/books/related?page=${pageParam}&limit=12&slug=${bookSlug}`, {
        mode: "cors",
        method: "GET",
        redirect: "follow",
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    return result as relatedBookData;
}