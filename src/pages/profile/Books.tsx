import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@mui/material/Pagination";
import { BookFloatAnimation } from "@/assets";
import Stack from "@mui/material/Stack";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiPencil } from "react-icons/hi";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useFetchAllBookAuthor } from "@/hooks/useFetchABookAuthor";
import { getToken } from "@/services/authService";
import { useGetMe } from "@/hooks/useUser";
import BookCardSkeleton from "@/components/BookCardSkeleton";

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    category_ids: "[]",
    sortBy: "random",
  });
  const Theme = localStorage.getItem("theme");
  const token = getToken();
  const { data: me } = useGetMe(token!);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [deBounceSearch] = useDebounce(search, 500);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "random");
  const [pageCount, setPageCount] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const { data, isLoading } = useFetchAllBookAuthor({
    deBounceSearch,
    sortBy,
    pageCount,
  });
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPageCount(value);
  };

  const profileNavigation = (id: number) => {
    if (id === me?.userId) {
      navigate("/me/info");
    } else {
      navigate(`/profile/${id}`);
    }
  };

  useEffect(() => {
    const params: any = {};

    if (sortBy) {
      params.sort_by = sortBy;
    }
    if (deBounceSearch) {
      params.search = deBounceSearch;
    }
    if (pageCount) {
      params.page = pageCount.toString();
    }

    setSearchParams(params);
  }, [deBounceSearch, sortBy, setSearchParams, pageCount]);

  const navigate = useNavigate();
  if (!isLoading) {
  }
  const editHandler = (bookSlug: string) => {
    navigate(`/book-dashboard/${bookSlug}/book-details`);
  };

  return (
    <div className="items-end h-full self-end">
      <div className="flex flex-col items-center gap-5 p-10">
        <div className="flex justify-between gap-4 lg:gap-0 mt-4 w-full h-[45px] lg:h-[50px]">
          <div className="relative flex items-center gap-3 w-8/12 lg:w-full max-w-[100px] md:max-w-[280px]">
            <Select onValueChange={handleSortChange}>
              <SelectTrigger className="dark:border-dark-border w-8/12 max-w-[100px] md:max-w-[280px] h-full text-xs lg:text-md dark:text-white">
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
            className="dark:!border-dark-border dark:bg-dark-bg !border-black rounded-[8px] max-w-[200px] md:max-w-[280px] h-full lg:h-[42px] text-xs lg:text-md dark:text-white dark:placeholder:text-white placeholder:text-xs"
            onChange={(event) => {
              setSearch(event.target.value);
              setPageCount(1);
            }}
          />
        </div>
        <button className="flex items-center gap-2 bg-primary p-2 rounded-[8px] h-[40px] self-end">
          <FaPlus className="text-[13px] text-white md:text-sm" />
          <span className="md:block hidden text-[12px] text-bold text-white md:text-[14px]">
            Create New Book
          </span>
        </button>

        {isLoading ? (
          <div className="gap-2 md:gap-4 grid grid-cols-2 md:grid-cols-4 md:py-10">
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
          </div>
        ) : (
          <div className="gap-2 md:gap-4 grid grid-cols-2 md:grid-cols-4 md:py-10">
            {data?.items.map((book) => (
              <div
                key={book.bookId}
                id={book.bookId}
                className="relative bg-slate-50 dark:bg-[#2F2F2F] shadow-sm mr-[21px] border border-border dark:border-none rounded-[8px] lg:w-[232px] min-w-[160px] max-w-[210px] h-[280px] dark:text-white book group"
              >
                <div className="group-hover:right-[10px] top-[40px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                  <div className="flex justify-center items-center bg-slate-50 dark:bg-[#2F2F2F] drop-shadow-xl border rounded-full w-8 h-8">
                    <HiPencil
                      className="text-slate-500 dark:text-white cursor-pointer"
                      onClick={() => editHandler(book.slug)}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center bg-slate-300 dark:bg-[#3D3D3D] m-2 rounded-[8px] h-[160px]">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-[120px] h-[140px]"
                  />
                </div>

                <div className="flex flex-col justify-center gap-1 ml-2">
                  <h1 className="line-clamp-1 h-6 font-bold text-[15px]">
                    {book.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <img
                      src={book.category.icon}
                      alt={book.category.title}
                      className="w-6"
                    />
                    <p className="font-Inter text-[12px] text-secondary-foreground dark:text-white">
                      {book.category.title}
                    </p>
                  </div>
                  <div
                    onClick={() => profileNavigation(book.user.userId)}
                    className="flex items-center gap-3 mt-1 cursor-pointer"
                  >
                    <img
                      src={book.user.profilePicture}
                      alt={book.user.name}
                      className="rounded-full w-6 h-6"
                    />
                    <h2 className="text-[13px] text-black dark:text-white">
                      By {book.user.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading && data?.items.length === 0 && (
          <div className="top-0 bottom-0 left-0 flex flex-col justify-center items-center mx-auto my-auto w-full">
            <img
              src={BookFloatAnimation}
              alt=""
              className="mb-[10px] w-[88px] h-[79px] book-animation"
            />
            <span className="mt-2 text-2xl text-gray-300">No Book Found</span>
          </div>
        )}
        {!isLoading && data?.items.length !== 0 && (
          <Stack className="self-center" spacing={1}>
            <Pagination
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: Theme === "dark" ? "white" : "inherit",
                },
                "& .MuiPaginationItem-ellipsis": {
                  color: Theme === "dark" ? "white" : "inherit",
                },
              }}
              count={data?.meta.totalPages}
              defaultPage={1}
              boundaryCount={1}
              onChange={handlePageChange}
              page={pageCount}
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Books;
