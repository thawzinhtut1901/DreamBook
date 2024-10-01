import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";

const restoreBook = async (bookSlugs: string[]) => {
    const token = getToken();
    const slugs = bookSlugs.join(',');
    const response: Response = await fetch(`${BaseURL}/books/restore?slugs=${encodeURIComponent(slugs)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        method: "PATCH",
        redirect: "follow",
    });

    if (!response.ok) {
        throw new Error('Failed to restore the book');
    }

    return response.status;
};

export default restoreBook;

