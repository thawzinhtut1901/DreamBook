import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Quill from "quill";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaListUl,
  FaListOl,
} from "react-icons/fa";
import { createChapterData } from "@/types/types";

interface ChapterFormProps {
  chapterData: createChapterData;
  setChapterData: React.Dispatch<React.SetStateAction<any>>;
}

const ChapterForm: React.FC<ChapterFormProps> = ({
  chapterData,
  setChapterData,
}) => {
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isCenterActive, setIsCenterActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);
  const [isBulletActive, setIsBulletActive] = useState(false);
  const [isOrderActive, setIsOrderActive] = useState(false);

  useEffect(() => {
    if (quillRef.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: false,
        },
      });

      quillRef.current.focus();

      quillInstance.current.on("text-change", () => {
        setChapterData((prev: any) => ({
          ...prev,
          content: quillInstance.current!.root.innerHTML || "",
        }));

        setTimeout(() => {
          const editorLength = quillInstance.current?.getLength() || 0;
          quillInstance.current?.setSelection(editorLength, 0);
        });
      });

      if (chapterData.content) {
        quillInstance.current.clipboard.dangerouslyPasteHTML(
          chapterData.content
        );
      }
    }
  }, [chapterData.content && quillRef]);

  const applyFormat = (format: string) => {
    if (quillInstance.current) {
      const cursorPosition = quillInstance.current.getSelection()?.index;
      if (cursorPosition !== null && cursorPosition !== undefined) {
        const isApplied =
          quillInstance.current.getFormat(cursorPosition)?.[format];
        const isBulletApplied =
          quillInstance.current.getFormat(cursorPosition)?.list === "bullet";
        const isOrderedApplied =
          quillInstance.current.getFormat(cursorPosition)?.list === "ordered";
        if (isApplied) {
          quillInstance.current.format(format, false);
        } else if (isBulletApplied && format === "bullet") {
          quillInstance.current.format("list", false);
        } else if (isOrderedApplied && format === "ordered") {
          quillInstance.current.format("list", false);
        } else {
          switch (format) {
            case "bold":
              quillInstance.current.format("bold", true);
              break;
            case "italic":
              quillInstance.current.format("italic", true);
              break;
            case "underline":
              quillInstance.current.format("underline", true);
              break;
            case "bullet":
              quillInstance.current.format("list", "bullet");
              break;
            case "ordered":
              quillInstance.current.format("list", "ordered");
              break;
            default:
              break;
          }
        }
      }
    }
  };

  const handleBold = () => {
    applyFormat("bold");
    setIsBoldActive(!isBoldActive);
  };

  const handleItalic = () => {
    applyFormat("italic");
    setIsItalicActive(!isItalicActive);
  };

  const handleUnderline = () => {
    applyFormat("underline");
    setIsUnderlineActive(!isUnderlineActive);
  };

  const handleBullet = () => {
    applyFormat("bullet");
    setIsBulletActive(!isBulletActive);
  };

  const handleOrder = () => {
    applyFormat("ordered");
    setIsOrderActive(!isOrderActive);
  };

  const alignLeft = () => {
    if (quillInstance.current) {
      quillInstance.current.format("align", false);
      quillInstance.current.format("align", "left");
      setIsLeftActive(!isLeftActive);
    }
  };

  const alignCenter = () => {
    if (quillInstance.current) {
      quillInstance.current.format("align", false);
      quillInstance.current.format("align", "center");
      setIsCenterActive(!isCenterActive);
    }
  };

  const alignRight = () => {
    if (quillInstance.current) {
      quillInstance.current.format("align", false);
      quillInstance.current.format("align", "right");
      setIsRightActive(!isRightActive);
    }
  };

  return (
    <>
      <div className="items-center gap-1.5 grid mx-[32px]">
        <Label htmlFor="title" className="font-semibold text-[16px]">
          Title
        </Label>
        <Input
          type="text"
          name="title"
          value={chapterData.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setChapterData((prev: any) => ({
              ...prev,
              title: event.target.value,
            }));
          }}
          id="title"
          placeholder="Title"
          className="border border-slate-300"
        />
      </div>
      <div className="items-center gap-1.5 grid mx-[32px]">
        <Label htmlFor="content" className="font-semibold text-[16px]">
          Content
        </Label>
        <div
          ref={quillRef}
          className="border-slate-300 border rounded w-full h-[200px]"
        />
        <div className="relative">
          <div className="bottom-0 absolute mb-[8px] ml-[25px]">
            <button
              type="button"
              onClick={handleBold}
              className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                isBoldActive ? "bg-blue-500 text-slate-100" : ""
              }`}
            >
              <FaBold className="w-[17px] h-[17px]" />
            </button>
            <button
              type="button"
              onClick={handleItalic}
              className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                isItalicActive ? "bg-blue-500 text-slate-100" : ""
              }`}
            >
              <FaItalic className="w-[17px] h-[17px]" />
            </button>
            <button
              type="button"
              onClick={handleUnderline}
              className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                isUnderlineActive ? "bg-blue-500 text-slate-100" : ""
              }`}
            >
              <FaUnderline className="w-[17px] h-[17px]" />
            </button>
            <button
              type="button"
              onClick={alignLeft}
              className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                isLeftActive ? "bg-blue-500 text-slate-100" : ""
              }`}
            >
              <FaAlignLeft className="w-[17px] h-[17px]" />
            </button>
            <button
              type="button"
              onClick={alignCenter}
              className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                isCenterActive ? "bg-blue-500 text-slate-100" : ""
              }`}
            >
              <FaAlignCenter className="w-[17px] h-[17px]" />
            </button>
            <button
              type="button"
              onClick={alignRight}
              className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                isRightActive ? "bg-blue-500 text-slate-100" : ""
              }`}
            >
              <FaAlignRight className="w-[17px] h-[17px]" />
            </button>
            <button
              type="button"
              onClick={handleBullet}
              className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                isBulletActive ? "bg-blue-500 text-slate-100" : ""
              }`}
            >
              <FaListUl className="w-[17px] h-[17px]" />
            </button>
            <button
              type="button"
              onClick={handleOrder}
              className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                isOrderActive ? "bg-blue-500 text-slate-100" : ""
              }`}
            >
              <FaListOl className="w-[17px] h-[17px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterForm;
