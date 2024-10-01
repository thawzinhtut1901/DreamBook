import { CreateBookApi } from "@/api/createBookApi";
import { CreateBookData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

const useBookCreate = () =>
    useMutation({
      mutationFn: (data: CreateBookData) => CreateBookApi({data}),
    });
  
export default useBookCreate;
