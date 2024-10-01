import BaseURL from "../services/ApiEndPoint";
import { getToken } from "@/services/authService";

const getDeleteBooksAth = async () => {
    const token = getToken();
    const response: Response = await fetch(`${BaseURL}/books/deleted`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET"
    });

    if(!response.ok) {
        throw new Error("Failed to fetch deleted books");
    }

    const data = await response.json();
    return data;
}

export default getDeleteBooksAth;