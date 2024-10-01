import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";
import {
    FaBold,
    FaListUl,
    FaListOl,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
  } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaItalic } from "react-icons/fa6";

const Description = () => {
    const quillRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<Quill | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isBoldActive, setIsBoldActive] = useState(false);
    const [isItalicActive, setIsItalicActive] = useState(false);
    const [isUnderlineActive, setIsUnderlineActive] = useState(false);
    const [isLeftActive, setIsLeftActive] = useState(false);
    const [isCenterActive, setIsCenterActive] = useState(false);
    const [isRightActive, setIsRightActive] = useState(false);
    const [isBulletActive, setIsBulletActive] = useState(false);
    const [isOrderActive, setIsOrderActive] = useState(false);
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        if (quillRef.current) {
          quillInstance.current = new Quill(quillRef.current, {
            theme: "snow",
            modules: {
              toolbar: false,
            },
          });
    
          quillInstance.current.on("text-change", () => {
            setDescription(quillInstance.current?.root.innerHTML || "");
          });
        }
      }, []);
    
      const applyFormat = (format: string) => {
        if (quillInstance.current) {
          const cursorPosition = quillInstance.current.getSelection()?.index;
          if (cursorPosition !== null && cursorPosition !== undefined) {
            // Check if the format is already applied
            const isApplied =
              quillInstance.current.getFormat(cursorPosition)?.[format];
            const isBulletApplied =
              quillInstance.current.getFormat(cursorPosition)?.list === "bullet";
            const isOrderedApplied =
              quillInstance.current.getFormat(cursorPosition)?.list === "ordered";
            if (isApplied) {
              quillInstance.current.format(format, false);
            } else if (isBulletApplied && format === "bullet") {
              // If bullet format is already applied, remove it
              quillInstance.current.format("list", false);
            } else if (isOrderedApplied && format === "ordered") {
              // If ordered format is already applied, remove it
              quillInstance.current.format("list", false);
            } else {
              // If format is not applied, apply it
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
          quillInstance.current.format("align", false); // Remove existing alignment
          quillInstance.current.format("align", "left"); // Apply left alignment
          setIsLeftActive(!isLeftActive);
        }
      };
    
      const alignCenter = () => {
        if (quillInstance.current) {
          quillInstance.current.format("align", false); // Remove existing alignment
          quillInstance.current.format("align", "center"); // Apply center alignment
          setIsCenterActive(!isCenterActive);
        }
      };
    
      const alignRight = () => {
        if (quillInstance.current) {
          quillInstance.current.format("align", false); // Remove existing alignment
          quillInstance.current.format("align", "right"); // Apply right alignment
          setIsRightActive(!isRightActive);
        }
      };
    
  return (
    <div className="gap-1">
            <Label
                htmlFor="description"
                className="font-semibold text-[16px]"
            >
                Description
            </Label>
            <div
                ref={quillRef}
                className="border-slate-300 border rounded w-full h-[200px]"
            />
            <div className="relative">
                <div className="bottom-0 absolute mb-[8px] ml-[25px]">
                  <button
                    onClick={handleBold}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isBoldActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaBold className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    onClick={handleItalic}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isItalicActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaItalic className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    onClick={handleUnderline}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isUnderlineActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaUnderline className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    onClick={alignLeft}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isLeftActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaAlignLeft className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    onClick={alignCenter}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isCenterActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaAlignCenter className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    onClick={alignRight}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isRightActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaAlignRight className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    onClick={handleBullet}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isBulletActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaListUl className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    onClick={handleOrder}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isOrderActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaListOl className="w-[17px] h-[17px]" />
                  </button>
                </div>
                <textarea
                  ref={textareaRef}
                  id="description"
                  name="description"
                  value={description}
                  className="hidden"
                />
            </div>
    </div>
  )
}

export default Description;