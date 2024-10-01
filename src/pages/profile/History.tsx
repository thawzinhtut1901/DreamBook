import BookCardSkeleton from "@/components/BookCardSkeleton";
import { useDeleteHistory, useFetchAllHistory } from "@/hooks/useBookHistory";
import { useGetMe } from "@/hooks/useUser";
import { getToken } from "@/services/authService";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const { data: getHistory, isLoading, refetch } = useFetchAllHistory();
  const deleteHistory = useDeleteHistory();
  const token = getToken();
  const { data: me } = useGetMe(token!);
  const handleDelete = (bookSlug: string) => {
    deleteHistory.mutate(bookSlug, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const profileNavigation = (id: number) => {
    if (id === me?.userId) {
      navigate("/me/info");
    } else {
      navigate(`/profile/${id}`);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center gap-2 md:gap-0 p-4 md:p-10 w-full">
        <h1 className="font-bold text-center text-xl lg:text-2xl dark:text-white">
          History
        </h1>
        {isLoading ? (
          <div className="gap-2 md:gap-4 grid grid-cols-2 md:grid-cols-4 py-4">
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
          </div>
        ) : (
          <div className="gap-2 md:gap-4 grid grid-cols-2 md:grid-cols-4 py-4">
            {getHistory?.map(
              (item) =>
                item.book && (
                  <div
                    key={item.book.title}
                    id={item.book.title}
                    className="relative bg-slate-50 dark:bg-[#2F2F2F] shadow-sm mr-[21px] border dark:border-none rounded-[8px] lg:w-[232px] min-w-[180px] max-w-[210px] h-[280px] dark:text-white book group"
                  >
                    <div className="group-hover:right-[5px] top-[10px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                      <div
                        onClick={() => handleDelete(item.book.slug)}
                        className="flex justify-center items-center bg-slate-50 dark:bg-[#2F2F2F] drop-shadow-xl border rounded-full w-8 h-8 cursor-pointer"

                      >
                        <FaTrashCan className="text-red-500 dark:text-red-400" />
                      </div>
                    </div>
                    <div className="flex justify-center items-center bg-slate-300 dark:bg-[#3D3D3D] m-2 rounded-[8px] h-[160px]">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.coverImage}
                        className="min-w-[100px] max-w-[120px] h-[140px]"
                      />
                    </div>

                    <div className="flex flex-col justify-center gap-1 ml-2">
                      <h1 className="line-clamp-1 h-6 font-bold text-[14px] md:text-[15px]">
                        {item.book.title}
                      </h1>
                      <div className="flex items-center gap-1 md:gap-2">
                        <img
                          src={item.book.category.icon}
                          alt={item.book.category.title}
                          className="w-[18px] md:w-6"
                        />
                        <p className="line-clamp-1 font-Inter text-[11px] text-secondary-foreground md:text-[12px] dark:text-white">
                          {item.book.category.title}
                        </p>
                      </div>
                      <div
                        onClick={() => profileNavigation(item?.book?.user?.userId)}
                        className="flex items-center gap-1 md:gap-3 mt-1 cursor-pointer"
                      >
                        <img
                          src={item?.book?.user?.profilePicture}
                          alt={item?.book?.user?.name}
                          className="rounded-full w-[18px] md:w-6 h-[18px] md:h-6"
                        />
                        <h2 className="font-semibold text-[12px] text-black md:text-[13px] dark:text-white">
                          By {item?.book?.user?.name}
                        </h2>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
