import Nav from "@/components/Nav";
import { useGetMe, useGetOther, useGetUserBook } from "@/hooks/useUser";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { BsHeartFill, BsHeart, BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getToken } from "@/services/authService";
const OtherUserProfile = () => {
  const { userId } = useParams();
  const { data: userData, isLoading: ProfileIsLoading } = useGetOther(userId!);
  const {
    data: userBookData,
    isLoading: BookIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetUserBook(userId!);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const token = getToken();
  const toggleFavorite = (bookId: string, bookSlug: string) => {
    setFavorites((prevFavorites) => {
      const isFavorite = !prevFavorites[bookId];
      if (isFavorite) {
        addFavorite.mutate({ slug: bookSlug });
      } else {
        removeFavorite.mutate({ slug: bookSlug });
      }
      return { ...prevFavorites, [bookId]: isFavorite };
    });
  };
  const { data: me } = useGetMe(token!);

  const profileNavigation = (id: number) => {
    if (id === me?.userId) {
      navigate("/me/info");
    } else {
      navigate(`/profile/${id}`);
    }
  };

  useEffect(() => {
    if (userBookData) {
      const newFavorites: { [key: string]: boolean } = {};
      userBookData.pages.forEach((item) =>
        item.items.forEach((book) => {
          newFavorites[book.bookId] = Boolean(book.isFavorite);
        })
      );
      setFavorites(newFavorites);
    }
  }, [userBookData]);
  return (
    <div className="flex flex-col items-center gap-3 dark:bg-dark-bg w-full min-h-screen">
      <Nav />
      <div className="flex flex-col dark:bg-dark-bg p-10 w-full h-full">
        {!ProfileIsLoading && (
          <div className="flex md:flex-row justify-center items-center gap-5 md:gap-20 dark:bg-dark-bg shadow-border shadow-sm p-4 border-b border-b-border rounded-sm w-full">
            <div className="flex flex-col items-center gap-2">
              <img
                src={userData?.profilePicture}
                className="rounded-full w-[80px] md:w-[200px] h-[80px] md:h-[200px]"
                alt={userData?.name}
              />
              <span className="font-bold text-primary text-xl md:text-3xl">
                {userData?.name}
              </span>
            </div>
            <div className="flex flex-col gap-5 md:gap-10">
              <div className="flex gap-5 md:gap-10 h-full">
                <div className="flex flex-col">
                  <span className="font-bold text-sm md:text-lg dark:text-white">
                    Joined
                  </span>
                  <p className="font-medium text-sm dark:text-white">
                    {format(parseISO(userData?.cratedAt!), " MMM, yyyy")}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm md:text-lg dark:text-white">
                    Gender
                  </span>
                  <span className="font-medium text-sm dark:text-white">
                    {userData?.gender}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm md:text-lg dark:text-white">
                    Total Books
                  </span>
                  <span className="font-medium text-center text-sm dark:text-white">
                    {userBookData?.pages[0].meta.totalItems}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm md:text-lg dark:text-white">
                  Bio
                </span>
                <p className="line-clamp-1 font-medium text-sm dark:text-white">
                  {userData?.bio}
                </p>
              </div>
            </div>
          </div>
        )}
        {!BookIsLoading && (
          <div className="flex flex-col items-center p-5 dark:text-white">
            <h2 className="font-bold text-3xl text-bold dark:text-white">
              Books
            </h2>
            <div className="gap-5 grid grid-cols-2 p-3">
              {userBookData?.pages.map((item) =>
                item.items.map((book) => (
                  <div
                    key={book.title}
                    id={book.slug}
                    className="relative bg-slate-100 dark:bg-[#2F2F2F] shadow-md shadow-secondary-foreground mr-[21px] border dark:border-none rounded-[8px] min-w-[150px] max-w-[232px] h-[280px] dark:text-white book group"
                  >
                    <div className="group-hover:right-[10px] top-[20px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                      <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                        {favorites[book.bookId] ? (
                          <BsHeartFill
                            className="text-red-500 cursor-pointer"
                            onClick={() =>
                              toggleFavorite(book.bookId, book.slug)
                            }
                          />
                        ) : (
                          <BsHeart
                            className="text-slate-500 cursor-pointer"
                            onClick={() =>
                              toggleFavorite(book.bookId, book.slug)
                            }
                          />
                        )}
                      </div>

                      <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                        <BsEyeFill
                          className="text-slate-500 cursor-pointer"
                          onClick={() => navigate(`/book/${book.slug}`)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center bg-slate-300 dark:bg-[#3D3D3D] m-2 rounded-[8px] h-[160px]">
                      <img
                        src={book.coverImage}
                        alt={book.coverImage}
                        className="min-w-[100px] max-w-[120px] h-[140px]"
                      />
                    </div>

                    <div className="flex flex-col justify-center gap-1 ml-2">
                      <h1 className="line-clamp-1 h-6 font-bold text-[14px] md:text-[15px]">
                        {book.title}
                      </h1>
                      <div className="flex items-center gap-1 md:gap-2">
                        <img
                          src={book.category.icon}
                          alt={book.category.title}
                          className="w-[18px] md:w-6"
                        />
                        <p className="line-clamp-1 font-Inter text-[12px] text-secondary-foreground">
                          {book.category.title}
                        </p>
                      </div>
                      <div
                        onClick={() => profileNavigation(book.user.userId)}
                        className="flex items-center gap-1 md:gap-3 mt-1 cursor-pointer"
                      >
                        <img
                          src={book.user.profilePicture}
                          alt={book.user.name}
                          className="rounded-full w-[18px] md:w-6 h-[18px] md:h-6"
                        />
                        <h2 className="font-semibold text-[12px] text-black md:text-[13px]">
                          By {book.user.name}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {userBookData?.pages[0].items.length !== 0 &&
        hasNextPage &&
        !isFetching ? (
          <Button
            className="bg-primary rounded-[6px] w-24 self-center"
            onClick={() => fetchNextPage()}
          >
            Load More
          </Button>
        ) : (
          isFetchingNextPage && (
            <Button disabled className="rounded-[8px] w-24 self-center">
              <Loader2 className="text-white animate-spin" />
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default OtherUserProfile;