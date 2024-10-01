import { useState, useEffect } from "react";
import { useFetchAChapter, useFetchAllChapters } from "@/hooks/useFetchChapter";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import {
  useCreateChapterProgress,
  useFetchCurrentChapter,
  useUpdateChapterProgress,
} from "@/hooks/useChapterProgress";
import { FiAlignJustify } from "react-icons/fi";
import { LogoBlue } from "@/assets";

const ChapterRead = () => {
  const { bookSlug, chapterId } = useParams<{
    bookSlug: string;
    chapterId?: string;
  }>();
  const navigate = useNavigate();
  const { data: getChapters } = useFetchAllChapters(bookSlug!);
  const [parsedChapterId, setParsedChapterId] = useState<number>();
  const {
    data: getChapter,
    isLoading,
    error,
  } = useFetchAChapter(parsedChapterId !== undefined ? parsedChapterId : 0);

  const [activeChapterId, setActiveChapterId] = useState<number>();
  const createChapterProgress = useCreateChapterProgress();
  const { data: getChapterProgress, error: progressError } =
    useFetchCurrentChapter(bookSlug!);
  const updateProgress = useUpdateChapterProgress();
  const [showChapters, setShowChapters] = useState(false);

  const CompleteButton = () => {
    navigate(`/book/${bookSlug}`);
  };

  useEffect(() => {
    if (getChapterProgress?.chapterId) {
      setParsedChapterId(getChapterProgress.chapterId);
    } else if (chapterId) {
      setParsedChapterId(parseInt(chapterId, 10));
    }
  }, [getChapterProgress, chapterId]);

  useEffect(() => {
    if (getChapters && !parsedChapterId) {
      const initialChapterId =
        getChapterProgress?.chapterId || getChapters[0]?.chapterId;

      if (initialChapterId) {
        navigate(`/${bookSlug}/chapter/${initialChapterId}`);
        setParsedChapterId(initialChapterId);
        setActiveChapterId(initialChapterId);

        if (getChapterProgress?.chapterId === initialChapterId) {
          updateProgress.mutate({
            bookSlug: bookSlug!,
            data: { chapterId: initialChapterId },
          });
        } else {
          createChapterProgress.mutate({
            slug: bookSlug!,
            chapterId: initialChapterId,
          });
        }
      }
    }
  }, [getChapters, getChapterProgress, navigate]);

  useEffect(() => {
    if (chapterId) {
      createChapterProgress.mutate({
        slug: bookSlug!,
        chapterId: Number(chapterId),
      });
    }
  }, [progressError, chapterId, bookSlug, createChapterProgress]);

  const handleChapterSelect = (id: number) => {
    navigate(`/${bookSlug}/chapter/${id}`);
    setParsedChapterId(id);
    setActiveChapterId(id);

    if (getChapterProgress?.chapterId !== id) {
      updateProgress.mutate({ bookSlug: bookSlug!, data: { chapterId: id } });
    }
    setShowChapters(false);

    if (
      currentChapterIndex < totalChapters &&
      id === getChapters[currentChapterIndex].chapterId
    ) {
      const nextChapterId = getChapters[currentChapterIndex].chapterId;
      setParsedChapterId(nextChapterId);
      setActiveChapterId(nextChapterId);

      if (getChapterProgress?.chapterId === nextChapterId) {
        updateProgress.mutate({
          bookSlug: bookSlug!,
          data: { chapterId: nextChapterId },
        });
      }
    }
  };

  const currentChapterIndex =
    getChapters?.findIndex(
      (chapter: any) => chapter.chapterId === parsedChapterId
    ) + 1;
  const totalChapters = getChapters?.length;

  return (
    <div className="flex md:flex-row flex-col md:flex-grow dark:bg-dark-bg">
      <div className="flex md:flex-row flex-col">

        <div className="flex border-slate-300 md:hidden shadow-md border-b w-screen h-[50px]">
          <FiAlignJustify
            onClick={() => setShowChapters(!showChapters)}
            className="mt-3 ml-4 text-2xl dark:text-white cursor-pointer"
          />
          <img src={LogoBlue} className="ml-4 w-[160px] h-[50px]" />
        </div>
        <div
          className={`md:pl-[26px] pl-2 md:border-r dark:border-r-gray-500 md:border-r-slate-300 w-[120px] h-screen md:w-[267px] ${
            showChapters ? "" : "hidden md:block"
          }`}
        >
          <div
            className="flex my-2 md:my-[12.5px] md:w-[83px] md:h-[28px] text-[14px] text-blue-700 md:text-[16px] text-opacity-60 cursor-pointer"
            onClick={() => navigate(`/book/${bookSlug}`)}
          >
            <FaArrowLeft className="mx-2 mt-1" />
            <h2>Back</h2>
          </div>

          <h1 className="mb-2 md:mb-[24px] font-bold md:text-xl dark:text-white">Chapters</h1>
          <ol className="list-decimal list-inside">
            {getChapters &&
              getChapters.map((chapter: any) => (
                <li
                  className={`md:mb-[16px] dark:text-white text-[12px] md:text-[16px] mb-2 cursor-pointer ${
                    chapter.chapterId === activeChapterId
                      ? "text-primary font-semibold"
                      : ""
                  }`}
                  key={chapter.chapterId}
                  onClick={() => handleChapterSelect(chapter.chapterId)}
                >
                  {chapter.title}
                </li>
              ))}
          </ol>
        </div>
      </div>

      <div

        className={`flex flex-col w-screen h-full ${


          showChapters ? "hidden md:flex" : ""
        }`}
      >
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading chapter: {error.message}</p>}
        {getChapter && (
          <div className="md:ml-[108px] p-3 md:p-4">
            <h1 className="md:mt-[28px] font-bold text-[20px] text-primary md:text-[36px]">
              {getChapter.title}
            </h1>
            <div
              className="mt-2 md:mt-[24px] md:ml-0 font-normal text-sm md:text-lg dark:text-white"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(getChapter.content),
              }}
            />
          </div>
        )}

        <div className="flex justify-between mt-auto border-t border-t-slate-300 dark:border-t-gray-500">
          {
            currentChapterIndex > 1 ? (
              <button
                onClick={() => {
                  if (currentChapterIndex > 1) {
                    handleChapterSelect(
                      getChapters[currentChapterIndex - 2].chapterId
                    );
                  }
                }}
                disabled={currentChapterIndex <= 1}
                className="flex justify-center items-center border-slate-300 dark:border-gray-500 my-4 md:my-[15.5px] ml-1 md:ml-2 border rounded-[8px] w-[80px] md:w-[113px] h-[40px] md:h-[42px] text-[14px] md:text-[16px]"
              >
                <SlArrowLeft className="mt-[2px] mr-1 md:mr-2 w-2 md:w-[20px]" />
                Previous
              </button>
            ):
            (
              <div></div>
            )
          }



          <div className="flex items-center text-[14px] md:text-[16px] dark:text-white">
            {currentChapterIndex} / {totalChapters}
          </div>

          {
            currentChapterIndex < totalChapters ? (
              <button
                onClick={() => {
                  if (currentChapterIndex < totalChapters) {
                    handleChapterSelect(getChapters[currentChapterIndex].chapterId);
                  }
                }}
                disabled={currentChapterIndex >= totalChapters}
                className="flex justify-center items-center bg-primary my-4 md:my-[15.5px] mr-4 md:mr-2 rounded-[8px] w-[80px] md:w-[113px] h-[40px] md:h-[42px] text-[14px] text-slate-50 md:text-[16px]"
              >
                Next
                <SlArrowRight className="mt-[2px] ml-1 md:ml-2 w-2 md:w-[20px]" />
              </button>
            ): 
            (
              <button onClick={CompleteButton} className="flex justify-center items-center bg-primary my-4 md:my-[15.5px] mr-4 md:mr-2 rounded-[8px] w-[80px] md:w-[113px] h-[40px] md:h-[42px] text-[14px] text-slate-50 md:text-[16px]">Complete</button>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default ChapterRead;
