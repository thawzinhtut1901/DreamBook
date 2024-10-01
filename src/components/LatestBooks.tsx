import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { usefetchLatestBooks } from "@/hooks/useFetchBook";
import { getToken } from "@/services/authService";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { animate, useMotionValue, motion } from "framer-motion";
import useMeasure from "react-use-measure";

const LatestBooks = () => {
  const { data: booksData, isLoading: isBooksLoading } = usefetchLatestBooks();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const navigate = useNavigate();
  const token = getToken();

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

  let [ref, { width }] = useMeasure();
  const xTransition = useMotionValue(0);
  const Fast_Duration = 15;
  const Slow_Duration = 45;

  const [duration, setDuration] = useState(Fast_Duration);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 4;

    if (mustFinish) {
      controls = animate(xTransition, [xTransition.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTransition.get() / finalPosition),
        onComplete() {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTransition, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [xTransition, width, duration, rerender]);

  useEffect(() => {
    if (booksData) {
      const newFavorites: { [key: string]: boolean } = {};
      booksData.items.forEach((book) => {
        newFavorites[book.bookId] = Boolean(book.isFavorite);
      });
      setFavorites(newFavorites);
    }
  }, [booksData]);

  useEffect(() => {
    if (!token) {
      setFavorites({});
    }
  }, [token]);

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
    <div className="py-2 md:p-3 transition lg:overflow-hidden overflow-x-auto">
      {isBooksLoading ? (
        <div className="flex w-full h-[280px]">
          <BookCardSkeleton key="skeleton-1" />
          <BookCardSkeleton key="skeleton-2" />
          <BookCardSkeleton key="skeleton-3" />
          <BookCardSkeleton className="lg:block hidden" key="skeleton-4" />
          <BookCardSkeleton className="lg:block hidden" key="skeleton-5" />
          <BookCardSkeleton className="lg:block hidden" key="skeleton-6" />
        </div>
      ) : (
        booksData && (
          <motion.div
            onHoverStart={() => {
              setMustFinish(true);
              setDuration(Slow_Duration);
            }}
            onHoverEnd={() => {
              setMustFinish(true);
              setDuration(Fast_Duration);
            }}
            ref={ref}
            style={{ x: xTransition }}
            className="flex w-full h-[280px]"
          >
            {[...booksData.items].map((book) => (
              <BookCard
                key={book?.bookId}
                book={book}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </motion.div>
        )
      )}
    </div>
  );
};

export default LatestBooks;
