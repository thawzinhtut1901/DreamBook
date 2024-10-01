import { LibraryHero } from "@/assets";
import { CategoryBooks } from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchAllBooks } from "@/hooks/useFetchBook";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDebounce } from "use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/contexts/ThemeContext";

const LibraryLayout = () => {
  const { data, isLoading } = useFetchCategories();
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    category_ids: "[]",
    sortBy: "random",
  });

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [deBounceSearch] = useDebounce(search, 500);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    JSON.parse(searchParams.get("category_ids") || "[]")
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "random");
  const [pageCount, setPageCount] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const { data: booksData, isLoading: isBooksLoading } = useFetchAllBooks({
    deBounceSearch,
    selectedCategories,
    sortBy,
    pageCount,
  });

  const { theme } = useTheme();

  useEffect(() => {
    setSelectAll(
      selectedCategories.length > 0 &&
        data?.length === selectedCategories.length
    );
  }, [selectedCategories, data]);

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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPageCount(value);
  };

  useEffect(() => {
    const params: any = {};
    if (selectedCategories.length > 0) {
      params.category_ids = JSON.stringify(selectedCategories);
    }
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
  }, [deBounceSearch, sortBy, setSearchParams, selectedCategories, pageCount]);

  return (
    <div className="w-full px-0 mx-0 ">
      <div
        className="flex flex-col dark:text-white justify-center items-center gap-4 bg-cover bg-no-repeat w-full h-[370px]  text-white dark:bg-blend-multiply dark:bg-blue-300"
        style={{ backgroundImage: `url(${LibraryHero})` }}
      >
        <h1 className="text-4xl font-extrabold">Library</h1>
        <h2 className="font-medium md:text-xl">Explore your favorite books</h2>
        <h2 className="font-medium md:text-xl">
          Reading is the best to get idea , Keep Reading
        </h2>
      </div>

      <div className="w-full mt-4 md:flex">
        <div className="md:block border-slate-400 hidden mt-2 md:px-4 border-r w-[400px]">
          <h1 className="flex justify-center mt-[20px] dark:text-white font-extrabold text-2xl text-black">
            Categories
          </h1>

          {!isLoading && data ? (
            <div className="dark:text-white flex flex-col justify-start gap-3 mt-[30px] ml-[30px]">
              <label className="flex items-center gap-2 font-medium text-lg md:text-[16px]">
                <Checkbox
                  onCheckedChange={handleSelectAll}
                  checked={selectAll}
                />
                All
              </label>
              {data.map((item) => (
                <label
                  key={item.categoryId}
                  id={item.categoryId}
                  className="flex items-center gap-2 font-medium text-lg md:text-[16px]"
                >
                  <Checkbox
                    onCheckedChange={() => {
                      categoryHandler(item.categoryId);
                    }}
                    checked={selectedCategories.includes(item.categoryId)}
                  />
                  {item.title}
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-start gap-5 mt-[30px] ml-[30px]">
              <Skeleton className="w-full h-[26px] bg-slate-200 rounded-[2px]" />
              <Skeleton className="w-full h-[26px] bg-slate-200 rounded-[2px]" />
              <Skeleton className="w-full h-[26px] bg-slate-200 rounded-[2px]" />
              <Skeleton className="w-full h-[26px] bg-slate-200 rounded-[2px]" />
              <Skeleton className="w-full h-[26px] bg-slate-200 rounded-[2px]" />
              <Skeleton className="w-full h-[26px] bg-slate-200 rounded-[2px]" />
              <Skeleton className="w-full h-[26px] bg-slate-200 rounded-[2px]" />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center w-full">
          <CategoryBooks
            search={search}
            setPageCount={setPageCount}
            setSearch={setSearch}
            setSortBy={setSortBy}
            booksData={booksData}
            isBooksLoading={isBooksLoading}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          {!isBooksLoading && booksData?.items.length !== 0 && (
            <Stack spacing={1}>
              <Pagination
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: theme === "dark" ? "white" : "inherit",
                  },
                  "& .MuiPaginationItem-ellipsis": {
                    color: theme === "dark" ? "white" : "inherit",
                  },
                }}
                count={booksData?.meta.totalPages}
                defaultPage={1}
                boundaryCount={1}
                onChange={handlePageChange}
                page={pageCount}
              />
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryLayout;
