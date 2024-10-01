import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BookFloatAnimation } from "@/assets";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { Book, fetchBookData } from "@/types/types";
import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { useEffect, useState } from "react";
import { getToken } from "@/services/authService";
import BookCard from "./BookCard";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { BiSolidCategory } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BookCardSkeleton from "./BookCardSkeleton";

interface CategoryBooksProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  booksData: fetchBookData | undefined;
  selectedCategories: string[];
  isBooksLoading: boolean;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryBooks: React.FC<CategoryBooksProps> = ({
  search,
  setSearch,
  setPageCount,
  setSortBy,
  booksData,
  isBooksLoading,
  selectedCategories,
  setSelectedCategories,
}) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const token = getToken();
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const { data, isLoading } = useFetchCategories();
  const categoryHandler = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(data ? data.map((item) => item.categoryId) : []);
    }
    setSelectAll(!selectAll);
  };
  const toggleFavorite = (bookId: string, bookSlug: string) => {
    if (token) {
      setFavorites((prevFavorites) => {
        const isFavorite = !prevFavorites[bookId];
        if (isFavorite) {
          addFavorite.mutate({ slug: bookSlug });
        } else {
          removeFavorite.mutate({ slug: bookSlug });
        }
        return { ...prevFavorites, [bookId]: isFavorite };
      });
    } else {
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    if (!token) {
      setFavorites({});
    }
  });

  useEffect(() => {
    setSelectAll(
      selectedCategories.length > 0 &&
        data?.length === selectedCategories.length
    );
  }, [selectedCategories, data]);

  useEffect(() => {
    if (booksData) {
      const newFavorites: { [key: string]: boolean } = {};
      booksData.items.forEach((book) => {
        newFavorites[book.bookId] = Boolean(book.isFavorite);
      });
      setFavorites(newFavorites);
    }
  }, [booksData]);

  return (
    <div className="flex flex-col w-full min-h-[600px] lg:min-h-screen px-4 mx-0 lg:px-10">
      <div className="flex justify-between lg:gap-0 gap-4 mt-4 h-[30px] lg:h-[50px] w-full">
        <div className="relative flex items-center w-8/12 gap-3 lg:w-full">
          <DropdownMenu>
            <DropdownMenuTrigger className=" w-[45px]  h-full md:hidden">
              <BiSolidCategory className="w-full h-full text-black border dark:text-white dark:border-dark-border border-border rounded-[4px]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-dark-bg">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <label className="flex items-center gap-2 font-medium md:text-[16px] text-[10px]">
                  <Checkbox
                    onCheckedChange={handleSelectAll}
                    checked={selectAll}
                    className="flex items-center justify-center w-2 h-2"
                  />
                  All
                </label>
              </DropdownMenuItem>
              {!isLoading && data
                ? data.map((item) => (
                    <DropdownMenuItem
                      key={item.categoryId}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <label
                        key={item.categoryId}
                        id={item.categoryId}
                        className="flex items-center gap-2 font-medium md:text-[16px] text-[10px]"
                      >
                        <Checkbox
                          onCheckedChange={() => {
                            categoryHandler(item.categoryId);
                          }}
                          checked={selectedCategories.includes(item.categoryId)}
                          className="flex items-center justify-center w-2 h-2"
                        />
                        {item.title}
                      </label>
                    </DropdownMenuItem>
                  ))
                : "Loading"}
            </DropdownMenuContent>
          </DropdownMenu>

          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-8/12 lg:w-[180px] dark:border-dark-border dark:text-white h-full text-xs lg:text-md">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="random">Sort by Random</SelectItem>
              <SelectItem value="latest">Sort by Latest</SelectItem>
              <SelectItem value="a-z">Sort by A-Z</SelectItem>
              <SelectItem value="z-a">Sort by Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          icon={<IoIosSearch className="lg:text-2xl" />}
          placeholder="Search"
          value={search}
          className="!border-black dark:bg-dark-bg dark:text-white dark:placeholder:text-white dark:!border-dark-border border rounded-[8px] w-full lg:w-[280px] h-full lg:h-[42px] text-xs lg:text-md placeholder:text-xs"
          onChange={(event) => {
            setSearch(event.target.value);
            setPageCount(1);
          }}
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-2 py-6 gap-y-4 md:grid-cols-3 lg:gap-4 lg:grid-cols-4">
        {isBooksLoading ? (
          <>
            <BookCardSkeleton key="BookSkeleton-1" />
            <BookCardSkeleton key="BookSkeleton-2" />
            <BookCardSkeleton key="BookSkeleton-3" />
            <BookCardSkeleton key="BookSkeleton-4" />
            <BookCardSkeleton key="BookSkeleton-5" />
            <BookCardSkeleton key="BookSkeleton-6" />
            <BookCardSkeleton key="BookSkeleton-7" />
            <BookCardSkeleton key="BookSkeleton-8" />
          </>
        ) : (
          booksData &&
          booksData.items.map((book: Book) => (
            <BookCard
              key={book.bookId}
              book={book}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))
        )}
      </div>
      {booksData?.items.length === 0 && (
        <div className="top-0 bottom-0 left-0 flex flex-col items-center justify-center w-full mx-auto my-auto ">
          <img
            src={BookFloatAnimation}
            alt=""
            className="mb-[10px] w-[88px] h-[79px] book-animation"
          />
          <span className="mt-2 text-2xl text-gray-300">No Book Found</span>
        </div>
      )}
    </div>
  );
};

export default CategoryBooks;
