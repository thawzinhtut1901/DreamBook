// import { useEffect, useState } from "react";
// import {  useNavigate, useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import parse from "html-react-parser";
// import { useCreateComment } from "@/hooks/useComment";
// import { useFetchABook } from "@/hooks/useFetchBook";
// import CommentSection from "@/components/CommentSection";
// import { useGetComments } from "@/hooks/useComment";
// import { Progress } from "@radix-ui/react-progress";
// import { useFetchAllChapters } from "@/hooks/useFetchChapter";
// import { useFetchCurrentChapter } from "@/hooks/useChapterProgress";
// import { useCreateBookHistory } from "@/hooks/useBookHistory";
// import { useRelatedBook } from "@/hooks/useRelatedBook";
// import { FaArrowLeft } from "react-icons/fa";
// import { getToken } from "@/services/authService";
// import { useGetMe } from "@/hooks/useUser";

// const BookReading: React.FC = () => {
//   const navigate = useNavigate();
//   const { bookSlug } = useParams();
//   const [comment, setComment] = useState({
//     comment: "",
//     slug: "",
//   });
//   const createComment = useCreateComment();
//   const createBookHistory = useCreateBookHistory();
//   const { refetch } = useGetComments(bookSlug!);
//   const { data: fetchABook, isLoading } = useFetchABook(bookSlug!);
//   const { data: getChapters } = useFetchAllChapters(bookSlug!);
//   const { data: getChapterProgress } = useFetchCurrentChapter(bookSlug!);
//   const token = getToken();
//   const { data: me } = useGetMe(token!);
//   const { data: relatedBook } = useRelatedBook(bookSlug!);
//   console.log(relatedBook);
//   const createCommentHandler = () => {
//     if (token) {
//       setComment({ comment: "", slug: bookSlug! });
//       createComment.mutate(comment);
//     } else {
//       navigate("/auth/login");
//     }
//   };
//   const profileNavigation = (id: number) => {
//     if (id === me?.userId) {
//       navigate("/me/info");
//     } else {
//       navigate(`/profile/${id}`);
//     }
//   };
//   const startReadingHandler = () => {
//     if(token){
//       navigate(`/${bookSlug}/chapter/${firstChapterId}`)
//     }else{
//       navigate("/auth/login")
//     }
//     createBookHistory.mutate({ bookSlug: bookSlug! });
//   };

//   const totalChapters = getChapters?.length || 1;
//   const currentChapterIndex = getChapterProgress?.chapterId
//     ? getChapters.findIndex(
//         (chapter: any) => chapter.chapterId === getChapterProgress.chapterId
//       ) + 1
//     : 0;
//   const progressPercentage = (currentChapterIndex / totalChapters) * 100;
//   const firstChapterId = getChapters?.[0]?.id || "";

//   const RelatedBookHandler = (slug:string) => {
//     if(token) {
//       navigate(`/book/${slug}`)
//     }else {
//       navigate("/auth/login");
//     }
//   }

//   useEffect(() => {
//     if (createComment.isSuccess) {
//       refetch();
//     }
//   }, [createComment.isSuccess]);

//   return (
//     <div className="flex md:flex-row flex-col px-10 md:px-20 w-full min-h-screen">
//       <div className="flex-col items-center md:px-10 pt-[30px] md:pt-20 md:border-r border-border md:w-10/12 h-full">
//         {fetchABook && !isLoading && (
//           <div className="flex flex-col gap-[20px] w-full h-full">
//             <div className="flex md:flex-row flex-col md:gap-[100px] md:px-20 md:pb-20 w-full">
//               <div
//                 onClick={() => navigate(-1)}
//                 className="flex md:hidden text-blue-700 text-sm"
//               >
//                 <FaArrowLeft className="mt-[2.5px] mr-1" />
//                 <h1>Back</h1>
//               </div>

//               <div className="flex justify-center items-center bg-blue-200 mx-auto md:mx-0 mb-4 md:mb-0 rounded-full w-[140px] md:w-[240px] h-[140px] md:h-[240px]">
//                 <img
//                   src={fetchABook?.coverImage}
//                   alt={fetchABook?.title}
//                   className="shadow-lg shadow-secondary-foreground w-[100px] md:w-[180px] h-[150px] md:h-[260px]"
//                 />
//               </div>
//               <div className="flex flex-col justify-center gap-3 md:w-[400px]">
//                 <h1 className="font-extrabold md:text-3xl">
//                   {fetchABook.title}
//                 </h1>

//                 <div
//                   className="flex items-center gap-2 cursor-pointer"
//                   onClick={() => profileNavigation(fetchABook?.user.userId)}
//                 >
//                   <img
//                     src={fetchABook?.user?.profilePicture}
//                     alt={fetchABook?.user?.name}
//                     className="rounded-full w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
//                   />
//                   <span className="text-[12px] md:text-[15px]">
//                     By {fetchABook?.user?.name}
//                   </span>
//                 </div>
//                 <div className="flex gap-3 mt-[15px] md:mt-[20px]">
//                   <span className="font-bold md:text-lg">Category:</span>
//                   <div className="flex items-center gap-2">
//                     <img
//                       src={fetchABook?.category?.icon}
//                       alt={fetchABook?.category?.title}
//                       className="rounded-full w-[15px] md:w-[25px] h-[15px] md:h-[25px]"
//                     />
//                     <span className="text-[13px] md:text-sm">
//                       {fetchABook?.category?.title}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <span className="font-bold md:text-lg">Keywords:</span>
//                   <div className="flex items-center gap-1">
//                     {fetchABook.keywords.map((keyword, index) => (
//                       <span key={index} className="text-[13px] md:text-sm">
//                         {keyword}
//                         {index < fetchABook.keywords.length - 1 && ", "}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="md:w-full">
//                   <Progress
//                     value={progressPercentage}
//                     max={100}
//                     className="relative bg-gray-200 rounded-full w-full h-2 overflow-hidden"
//                   >
//                     <div
//                       style={{ width: `${progressPercentage}%` }}
//                       className="bg-blue-600 h-full"
//                     />
//                   </Progress>
//                   <div className="mt-2 text-[13px] md:text-sm">{`Chapter ${currentChapterIndex} of ${totalChapters}`}</div>
//                 </div>

//                 <div className="w-full md:h-5"></div>
//                 <Button onClick={startReadingHandler} size={"full"}>
//                     {" "}
//                     Start Reading
//                   </Button>
//                 {/* <NavLink to={`/${bookSlug}/chapter/${firstChapterId}`}>
//                   <Button onClick={startReadingHandler} size={"full"}>
//                     {" "}
//                     Start Reading
//                   </Button>
//                 </NavLink> */}
//               </div>
//             </div>
//             <div className="flex flex-col gap-5 md:px-20 border-b border-border min-h-[200px]">
//               <h1 className="font-bold md:text-2xl">Book Overview</h1>
//               <div className="md:text-lg">
//                 {parse(fetchABook.description || "")}
//               </div>
//             </div>
//             <div className="flex flex-col gap-5 md:px-20 md:py-5">
//               <h1 className="md:text-lg">Leave a comment</h1>
//               <textarea
//                 value={comment.comment}
//                 onChange={(event) => {
//                   setComment({
//                     comment: event.target.value,
//                     slug: bookSlug!,
//                   });
//                 }}
//                 placeholder="Type your comment"
//                 className="flex justify-center items-center px-4 py-6 border border-border rounded-[12px] w-full placeholder:text-secondary-foreground placeholder:text-opacity-50 resize-none"
//               ></textarea>
//               <Button
//                 onClick={createCommentHandler}
//                 className="rounded-[8px] !font-normal text-[13px] md:text-sm resize-none"
//                 style={{ resize: "none" }}
//               >
//                 Post Comment
//               </Button>
//             </div>

//             <CommentSection />
//           </div>
//         )}
//       </div>

//       <div className="md:mx-2">
//         <h1 className="mt-4 font-semibold text-center text-md">
//           Related Books
//         </h1>

//       <div className="flex flex-col mx-2">
//         {
//          relatedBook?.pages.map((page, i) => (
//           <div  className="flex flex-row md:flex-col gap-x-3 md:gap-x-0 cursor-pointer overflow-x-auto md:overflow-x-hidden" key={i}>
//             {
//               page.items.map((book:any) => (
//               <div
//               key={book?.bookId}
//               onClick={() => RelatedBookHandler(book.slug)}
//               className="flex flex-col flex-shrink-0 bg-slate-100 shadow-xl md:shadow-md my-4 border rounded-[8px] w-[232px] max-h-full cursor-pointer"
//               > 
//                 <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
//                   <img
//                     src={book.coverImage}
//                     alt=""
//                     className="w-[86px] h-[129px]"
//                   />
//                 </div>

//                 <div className="ml-2">
//                     <h1 className="font-bold text-[14px] md:text-[15px]">
//                       {book.title}
//                     </h1>
//                     <p className="flex mt-1 font-Inter font-normal text-[11px] text-gray-500 lg:text-[12px]">
//                       <img
//                         src={book.category?.icon}
//                         alt=""
//                         className="mr-2 w-[15px] md:w-[20px] h-[15px] md:h-[20px]"
//                       />
//                       {book.category?.title}
//                     </p>
//                     <h2
//                       className="flex my-2 font-bold text-[12px] md:text-[13px] cursor-pointer"
//                       onClick={() => profileNavigation(book.user.userId)}
//                     >
//                       <img
//                         src={book.user?.profilePicture}
//                         alt=""
//                         className="mr-2 rounded-full w-[18px] md:w-[20px] h-[18px] md:h-[20px]"
//                       />
//                       By {book.user?.name}
//                     </h2>
//                   </div>

//               </div>

               
//               ))
//             }
//           </div>
//          ))
//         }
//       </div>
        
//       </div>
//     </div>
//   );
// };

// export default BookReading;


import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { useCreateComment } from "@/hooks/useComment";
import { useFetchABook } from "@/hooks/useFetchBook";
import CommentSection from "@/components/CommentSection";
import { useGetComments } from "@/hooks/useComment";
import { Progress } from "@radix-ui/react-progress";
import { useFetchAllChapters } from "@/hooks/useFetchChapter";
import { useFetchCurrentChapter } from "@/hooks/useChapterProgress";
import { useCreateBookHistory } from "@/hooks/useBookHistory";
import { useRelatedBook } from "@/hooks/useRelatedBook";
import { FaArrowLeft } from "react-icons/fa";
import { getToken } from "@/services/authService";
import { useGetMe } from "@/hooks/useUser";
import { BsEyeFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";

const BookReading: React.FC = () => {
  const navigate = useNavigate();
  const { bookSlug } = useParams();
  const [comment, setComment] = useState({
    comment: "",
    slug: "",
  });
  const createComment = useCreateComment();
  const createBookHistory = useCreateBookHistory();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const { refetch } = useGetComments(bookSlug!);
  const { data: fetchABook, isLoading } = useFetchABook(bookSlug!);
  const { data: getChapters } = useFetchAllChapters(bookSlug!);
  const { data: getChapterProgress } = useFetchCurrentChapter(bookSlug!);
  const token = getToken();
  const { data: me } = useGetMe(token!);
  const { data: relatedBook } = useRelatedBook(bookSlug!);
  const createCommentHandler = () => {
    if (token) {
      setComment({ comment: "", slug: bookSlug! });
      createComment.mutate(comment);
    } else {
      navigate("/auth/login");
    }
  };
  const profileNavigation = (id: number) => {
    if (id === me?.userId) {
      navigate("/me/info");
    } else {
      navigate(`/profile/${id}`);
    }
  };
  const startReadingHandler = () => {
    if(token){
      navigate(`/${bookSlug}/chapter/${firstChapterId}`)
    }else{
      navigate("/auth/login")
    }
    createBookHistory.mutate({ bookSlug: bookSlug! });
  };

  const totalChapters = getChapters?.length || 1;
  const currentChapterIndex = getChapterProgress?.chapterId
    ? getChapters?.findIndex(
        (chapter: any) => chapter.chapterId === getChapterProgress.chapterId
      ) + 1
    : 0;
  const progressPercentage = (currentChapterIndex / totalChapters) * 100;
  const firstChapterId = getChapters?.[0]?.id || "";

  const RelatedBookHandler = (slug: string) => {
    if (token) {
      navigate(`/book/${slug}`);
    } else {
      navigate("/auth/login");
    }
  }

  const toggleFavorite = (bookId: number, bookSlug: string) => {
    if (token) {
      setFavorites((prevFavorites) => {
        const isFavorite = !prevFavorites[bookId!];
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
    if (createComment.isSuccess) {
      refetch();
    }
  }, [createComment.isSuccess]);

  return (
    <div className="flex md:flex-row flex-col dark:bg-dark-bg px-10 md:px-20 w-full min-h-screen">
      <div className="flex-col items-center md:px-10 pt-[30px] md:pt-20 md:border-r border-border md:w-10/12 h-full">
        {fetchABook && !isLoading && (
          <div className="flex flex-col gap-[20px] w-full h-full">
            <div className="flex md:flex-row flex-col md:gap-[100px] md:px-20 md:pb-20 w-full">
              <div
                onClick={() => navigate(-1)}
                className="flex md:hidden text-blue-700 text-sm"
              >
                <FaArrowLeft className="mt-[2.5px] mr-1" />
                <h1>Back</h1>
              </div>

              <div className="flex justify-center items-center bg-blue-200 mx-auto md:mx-0 mb-4 md:mb-0 rounded-full w-[140px] md:w-[240px] h-[140px] md:h-[240px]">
                <img
                  src={fetchABook?.coverImage}
                  alt={fetchABook?.title}
                  className="shadow-lg shadow-secondary-foreground w-[100px] md:w-[180px] h-[150px] md:h-[260px]"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 md:w-[400px]">
                <h1 className="font-extrabold md:text-3xl dark:text-white">
                  {fetchABook.title}
                </h1>

                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => profileNavigation(fetchABook?.user.userId)}
                >
                  <img
                    src={fetchABook?.user?.profilePicture}
                    alt={fetchABook?.user?.name}
                    className="rounded-full w-[20px] md:w-[30px] h-[20px] md:h-[30px]"
                  />
                  <span className="text-[12px] md:text-[15px] dark:text-white">
                    By {fetchABook?.user?.name}
                  </span>
                </div>
                <div className="flex gap-3 mt-[15px] md:mt-[20px]">
                  <span className="font-bold md:text-lg dark:text-white">
                    Category:
                  </span>
                  <div className="flex items-center gap-2">
                    <img
                      src={fetchABook?.category?.icon}
                      alt={fetchABook?.category?.title}
                      className="rounded-full w-[15px] md:w-[25px] h-[15px] md:h-[25px]"
                    />
                    <span className="text-[13px] md:text-sm dark:text-white">
                      {fetchABook?.category?.title}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold md:text-lg dark:text-white">
                    Keywords:
                  </span>
                  <div className="flex items-center gap-1">
                    {fetchABook.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="text-[13px] md:text-sm dark:text-white"
                      >
                        {keyword}
                        {index < fetchABook.keywords.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:w-full">
                  <Progress
                    value={progressPercentage}
                    max={100}
                    className="relative bg-gray-200 rounded-full w-full h-2 overflow-hidden"
                  >
                    <div
                      style={{ width: `${progressPercentage}%` }}
                      className="bg-blue-600 h-full"
                    />
                  </Progress>
                  <div className="mt-2 text-[13px] md:text-sm dark:text-white">{`Chapter ${currentChapterIndex} of ${totalChapters}`}</div>
                </div>

                <div className="w-full md:h-5"></div>
                <Button onClick={startReadingHandler} size={"full"}>
                    {" "}
                    Start Reading
                  </Button>
                {/* <NavLink to={`/${bookSlug}/chapter/${firstChapterId}`}>
                  <Button onClick={startReadingHandler} size={"full"}>
                    {" "}
                    Start Reading
                  </Button>
                </NavLink> */}
              </div>
            </div>
            <div className="flex flex-col gap-5 md:px-20 border-b border-border min-h-[200px]">
              <h1 className="font-bold md:text-2xl dark:text-white">
                Book Overview
              </h1>
              <div className="md:text-lg dark:text-white">
                {parse(fetchABook.description || "")}
              </div>
            </div>
            <div className="flex flex-col gap-5 md:px-20 md:py-5">
              <h1 className="md:text-lg dark:text-white">Leave a comment</h1>
              <textarea
                value={comment.comment}
                onChange={(event) => {
                  setComment({
                    comment: event.target.value,
                    slug: bookSlug!,
                  });
                }}
                placeholder="Type your comment"
                className="flex justify-center items-center dark:border-dark-border dark:bg-dark-bg px-4 py-6 border border-border rounded-[12px] w-full dark:text-white dark:placeholder:text-gray-400 placeholder:text-secondary-foreground placeholder:text-opacity-50 outline-none resize-none"
              ></textarea>
              <Button
                onClick={createCommentHandler}
                className="rounded-[8px] !font-normal text-[13px] md:text-sm resize-none"
                style={{ resize: "none" }}
              >
                Post Comment
              </Button>
            </div>

            <CommentSection />
          </div>
        )}
      </div>

      <div className="md:mx-2">
        <h1 className="mt-4 font-semibold text-center text-md dark:text-white">
          Related Books
        </h1>

      <div className="flex flex-col mx-2">
        {
         relatedBook?.pages.map((page, i) => (
          <div  className="flex flex-row md:flex-col gap-x-3 md:gap-x-0 cursor-pointer overflow-x-auto md:overflow-x-hidden" key={i}>
            {
              page.items.map((book:any) => (
              <div
              key={book?.bookId}
              className="flex flex-col flex-shrink-0"
              > 
              {/* bg-slate-100 shadow-xl md:shadow-md my-4 border rounded-[8px] w-[232px] max-h-full cursor-pointer group */}
                <div className="relative bg-slate-50 dark:bg-[#2F2F2F] shadow-sm mr-[21px] border dark:border-none rounded-[8px] lg:w-[232px] min-w-[160px] max-w-[210px] h-[280px] dark:text-white book group">
                  <div className="group-hover:right-[10px] top-[40px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                    <div className="flex justify-center items-center bg-slate-50 dark:bg-[#2F2F2F] drop-shadow-xl border rounded-full w-8 h-8">
                      {favorites[book.bookId] ? (
                        <BsHeartFill
                          className="text-red-500 cursor-pointer"
                          onClick={() => toggleFavorite(book.bookId, book.slug)}
                        />
                      ) : (
                        <BsHeart
                          className="text-slate-500 dark:text-white cursor-pointer"
                          onClick={() => toggleFavorite(book.bookId, book.slug)}
                        />
                      )}
                    </div>

                    <div className="flex justify-center items-center bg-slate-50 dark:bg-[#2F2F2F] drop-shadow-xl border rounded-full w-8 h-8">
                      <BsEyeFill
                        className="text-slate-500 dark:text-white cursor-pointer"
                        onClick={() => RelatedBookHandler(book.slug)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                    <img
                      src={book.coverImage}
                      alt=""
                      className="w-[86px] h-[129px]"
                    />
                  </div>

                  <div className="ml-2">
                      <h1 className="font-bold text-[14px] md:text-[15px]">
                        {book.title}
                      </h1>
                      <p className="flex mt-1 font-Inter font-normal text-[11px] text-gray-500 lg:text-[12px]">
                        <img
                          src={book.category?.icon}
                          alt=""
                          className="mr-2 w-[15px] md:w-[20px] h-[15px] md:h-[20px]"
                        />
                        {book.category?.title}
                      </p>
                      <h2
                        className="flex my-2 font-bold text-[12px] md:text-[13px] cursor-pointer"
                        onClick={() => profileNavigation(book.user.userId)}
                      >
                        <img
                          src={book.user?.profilePicture}
                          alt=""
                          className="mr-2 rounded-full w-[18px] md:w-[20px] h-[18px] md:h-[20px]"
                        />
                        By {book.user?.name}
                      </h2>
                    </div>
                </div>

                

              </div>

               
              ))
            }
          </div>
         ))
        }
      </div>
        
      </div>
    </div>
  );
};

export default BookReading;
