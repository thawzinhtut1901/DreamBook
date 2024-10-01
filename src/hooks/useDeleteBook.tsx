
import { hardDeleteBook, softDeleteBook } from "@/api/deleteBookApi";
import { useMutation } from "@tanstack/react-query";

export const useSoftDeleteBook = () => 
    useMutation ({
        mutationFn: (bookSlug: string) => softDeleteBook(bookSlug)
    })


export const useHardDeleteBook = () => 
    useMutation({
        mutationFn: (bookSlugs: string[]) => hardDeleteBook(bookSlugs)
    });
    
