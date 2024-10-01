import getDeleteBooksAth from "@/api/getDeleteBookByAuthor";
import { useQuery } from "@tanstack/react-query";

const useFetchBooksAuthor = () => 
    useQuery({queryKey: ["items"], queryFn: () => getDeleteBooksAth()});

export default useFetchBooksAuthor;