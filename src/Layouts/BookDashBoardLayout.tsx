import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import {
  ChapterOutline,
  FooterImg,
  LightCommentOutline,
  LightMenuBook,
} from "@/assets";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BookDashBoardLayout = () => {
  const navigate = useNavigate();
  const { bookSlug } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex md:flex-row flex-col dark:bg-dark-bg mx-0 px-0 w-full md:h-screen">
      <div className="flex justify-between items-center md:hidden bg-primary p-4">

        <button className="text-white" onClick={toggleMenu}>
          <FiAlignJustify size={24} />
        </button>
      </div>
      <div
        className={`flex flex-col dark:bg-[#163665] bg-primary bg-opacity-90 w-full md:w-[296px] h-screen overflow-y-auto transition-transform transform ${

          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 absolute md:relative z-10 md:z-auto`}
      >
        <img
          src={FooterImg}
          alt=""
          className="border-slate-300 mx-auto py-4 border-b w-[180px] md:w-[223px]"
        />

        <div className="flex flex-col gap-4 mt-6">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-slate-300 bg-opacity-50 flex w-full md:w-[296px] items-center py-4 pl-4"
                : "flex items-center py-4 pl-4"
            }
            to={`/book-dashboard/${bookSlug}/book-details`}
            onClick={handleMenuItemClick}
          >
            <img
              src={LightMenuBook}
              alt=""
              className="w-4 h-6 mr-2 md:w-6 md:h-8"
            />
            <h1 className="font-semibold text-slate-100 md:text-lg">
              Book Details
            </h1>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-slate-300 bg-opacity-50 flex w-full md:w-[296px] items-center py-4 pl-4"
                : "flex items-center py-4 pl-4"
            }
            to={`/book-dashboard/${bookSlug}/chapters`}
            onClick={handleMenuItemClick}
          >
            <img
              src={ChapterOutline}
              alt=""
              className="w-4 h-4 mr-2 md:w-6 md:h-8"
            />
            <h1 className="font-semibold text-slate-100 md:text-lg">
              Chapters
            </h1>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-slate-300 bg-opacity-50 flex w-full md:w-[296px] items-center py-4 pl-4"
                : "flex items-center py-4 pl-4"
            }
            to={`/book-dashboard/${bookSlug}/comments`}
            onClick={handleMenuItemClick}
          >
            <img
              src={LightCommentOutline}
              alt=""
              className="w-4 h-4 mr-2 md:w-6 md:h-8"
            />
            <h1 className="font-semibold text-slate-100 md:text-lg">
              Comments
            </h1>
          </NavLink>
        </div>

        <div
          className="flex h-16 pt-4 pl-4 mt-auto text-white border-t cursor-pointer border-slate-300"
          onClick={() => navigate(`/me/books`)}
        >
          <FaArrowLeft className="mt-1 mr-2 md:w-5 md:h-5" />
          <h1 className="font-medium md:text-lg">Exit to Booklists</h1>
        </div>
      </div>

      <div
        className={`flex-1 p-4 overflow-y-auto ${
          isMenuOpen ? "hidden md:block" : "block"
        }`}
      >
        <Outlet/>
      </div>
    </div>
  );
};

export default BookDashBoardLayout;
