import { BookFloatAnimation } from "@/assets";
import { useEffect, useState } from "react";
import "./animation-style.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsPlus } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "quill/dist/quill.snow.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChapterCreate, useChapterUpdate } from "@/hooks/useChapterCreate";
import { createChapterData } from "@/types/types";
import ChapterForm from "./ChapterForm";
import { useParams } from "react-router-dom";
import {
  useDeleteChapter,
  useFetchAuthorAChapter,
} from "@/hooks/useFetchAuthorChapter";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";

const Chapters = () => {
  const createChapterMutation = useChapterCreate();
  const { bookSlug } = useParams();
  const [chapterData, setChapterData] = useState<createChapterData>({
    title: "",
    content: "",
    status: "Published",
    priority: 0,
    slug: "",
  });
  const [currentEditChapter, setCurrentEditChapter] = useState("0");
  const updateChapter = useChapterUpdate(currentEditChapter);
  const deleteChapter = useDeleteChapter();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [chapterUpdateData, setChapterUpdateData] = useState<createChapterData>(
    {
      title: "",
      content: "",
      status: "Published",
      priority: 0,
      slug: "",
    }
  );
  const deleteHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const chapter = event.currentTarget.closest(".chapter");
    const chapterId = chapter?.id;
    deleteChapter.mutate(chapterId!);
  };

  const editHandler = (chapter: any, id: string) => {
    setCurrentEditChapter(id);
    setChapterUpdateData(chapter);
    setEditOpen(true);
  };

  const handleEditSaveButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = { ...chapterUpdateData, slug: bookSlug! };
    updateChapter.mutate(data);
  };

  const { data, isLoading, refetch } = useFetchAuthorAChapter(bookSlug!);

  useEffect(() => {
    if (deleteChapter.isSuccess) {
      Swal.fire({
        icon: "success",
        text: "Chapter Deleted",
        timer: 2000,
      });
      refetch();
    }
  }, [deleteChapter.isSuccess]);

  useEffect(() => {
    if (createChapterMutation.isError) {
      Swal.fire({
        icon: "error",
        text: createChapterMutation.error.message,
        timer: 2000,
      });
    }
  }, [createChapterMutation.isError]);

  useEffect(() => {
    if (createChapterMutation.isSuccess) {
      setOpen(false);
      Swal.fire({
        icon: "success",
        text: "Chapter Created",
        timer: 2000,
      });
      refetch();
    }
  }, [createChapterMutation.isSuccess]);

  useEffect(() => {
    if (updateChapter.isSuccess) {
      setEditOpen(false);
      Swal.fire({
        icon: "success",
        text: "Chapter Updated",
        timer: 2000,
      });
      refetch();
    }
  }, [updateChapter.isSuccess]);

  const handleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = { ...chapterData, slug: bookSlug! };
    createChapterMutation.mutate(data);
  };

  return (

    <div className="w-full h-full ">
      <div className="w-full px-0 mx-0">
        <div className="flex flex-col w-full">
          <div className="flex border-slate-300 border-b w-full h-[40px] md:h-[80px]">
            <h1 className="dark:text-white md:my-[20px] md:pl-[40px] font-extrabold md:text-2xl">
              Chapters
            </h1>
          </div>
          <div className="flex flex-col justify-center md:px-8 md:py-4 w-full">
            {data &&
              !isLoading &&
              data.map((chapter: any) => (
                <div
                  key={chapter.chapterId}
                  className="flex flex-col justify-center shadow-secondary-foreground shadow-sm m-3 p-4 border border-border rounded-[8px] chapter"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[16px] text-primary md:text-[18px]">
                      {chapter.title}
                    </span>

                    <div className="flex items-center gap-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <HiOutlineDotsVertical className="text-xl dark:text-white" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex flex-col items-center justify-center">
                          <DropdownMenuItem
                            className="border-b border-border text-primary"
                            onClick={() =>
                              editHandler(chapter, chapter.chapterId)
                            }
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            id={chapter.chapterId}
                            className="text-red-500 chapter"
                            onClick={deleteHandler}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div
                    className="md:px-4 line-clamp-1 text-[13px] md:text-[16px] dark:text-white"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(chapter?.content!),
                    }}
                  />
                </div>
              ))}
          </div>
          {data?.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center gap-3">
                <img
                  src={BookFloatAnimation}
                  alt=""
                  className="mb-[10px] w-[88px] h-[79px] book-animation"
                />
                <p className="font-normal text-[12px] text-slate-500 md:text-lg dark:text-slate-100 text-opacity-75">
                  Could you please draft a comprehensive chapter for the book?
                </p>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="flex bg-primary hover:bg-blue-500 border-none rounded-[5px] w-[225px] md:h-[52px] text-[12px] text-slate-100 md:text-lg hover:text-slate-200"
                      onClick={() => setOpen(true)}
                    >
                      <BsPlus className="text-xl md:text-4xl" />
                      Create New Chapter
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-slate-50">
                    <DialogHeader className="flex justify-center items-center">
                      <DialogTitle className="font-bold text-xl">
                        Creating A Chapter
                      </DialogTitle>
                    </DialogHeader>
                    <ChapterForm
                      chapterData={chapterData}
                      setChapterData={setChapterData}
                    />
                    <DialogFooter className="w-[135px] h-[43px]">
                      <Button
                        onClick={handleButton}
                        type="submit"
                        className="hover:bg-blue-500 text-slate-200 hover:text-300"
                      >
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ) : (
            !isLoading && (
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center items-center">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className="flex gap-1 bg-primary hover:bg-blue-500 mx-auto border-none rounded-[5px] md:w-[150px] md:h-[44px] text-slate-100 hover:text-slate-200"
                          variant="outline"
                        >
                          <BsPlus className="text-lg md:text-xl" />
                          New Chapter
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="bg-slate-50">
                        <DialogHeader className="flex justify-center items-center">
                          <DialogTitle className="font-bold md:text-xl">
                            Creating A Chapter
                          </DialogTitle>
                        </DialogHeader>
                        <ChapterForm
                          chapterData={chapterData}
                          setChapterData={setChapterData}
                        />
                        <DialogFooter className="mx-auto md:ml-[683px] w-[135px] h-[43px]">
                          <Button
                            onClick={handleButton}
                            type="submit"
                            className="hover:bg-blue-500 text-slate-200 hover:text-300"
                          >
                            Save
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                      <DialogContent className="bg-slate-50">
                        <DialogHeader className="flex justify-center items-center">
                          <DialogTitle className="font-bold text-xl">
                            Updating A Chapter
                          </DialogTitle>
                        </DialogHeader>
                        <ChapterForm
                          chapterData={chapterUpdateData}
                          setChapterData={setChapterUpdateData}
                        />
                        <DialogFooter className="w-[135px] h-[43px]">
                          <Button
                            onClick={handleEditSaveButton}
                            type="submit"
                            className="hover:bg-blue-500 text-slate-200 hover:text-300"
                          >
                            Save
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapters;
