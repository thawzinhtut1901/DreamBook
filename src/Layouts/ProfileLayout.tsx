import { useGetMe } from "@/hooks/useUser";
import { getToken, logout } from "@/services/authService";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { GoHeart } from "react-icons/go";
import { IoMdBookmarks } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import { Avatar } from "@/assets";

const ProfileLayout = () => {
  const token = getToken() || "";
  const { data, isLoading } = useGetMe(token);
  const navigate = useNavigate();

  const LogOut = () => {
    navigate("/");
    logout();
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-dark-bg">
      <Nav />
      <div className="flex w-full h-full ">
        <div className="h-dvh sticky top-0 dark:bg-dark-bg bg-white z-20 flex flex-col lg:gap-10  border-r-2 shadow-sm pt-8 lg:p-8 lg:pt-16  dark:border-dark-border border-r-border w-[90px] lg:w-[480px]">
          {!isLoading && data && (
            <div className="flex flex-col items-center gap-2 py-4 lg:flex-row lg:gap-4 lg:px-5 profile">
              <img
                src={data.profilePicture ? data.profilePicture : Avatar}
                alt={data.profilePicture}
                className="rounded-full w-[40px] lg:w-[65px] h-[40px] lg:h-[65px]"
              />
              <span className="font-bold text-[10px] text-center lg:text-base dark:text-white">
                {data.name}
              </span>
            </div>
          )}

          <div className="flex flex-col justify-center h-full gap-3 lg:gap-0 lg:h-auto">
            <NavLink
              to={"/me/info"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary lg:w-full w-[50px] !text-primary-foreground p-2 self-center lg:p-5 rounded-[8px] flex items-center justify-center lg:justify-between"
                  : "text-black dark:text-white flex items-center justify-center lg:w-full w-[50px] lg:justify-between p-2 self-center lg:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <FaUser />
                <span className="hidden lg:block">Personal Information</span>
              </div>
              <FaAngleRight className="hidden lg:block" />
            </NavLink>

            <NavLink
              to={"/me/books"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary lg:w-full w-[50px] !text-primary-foreground p-2 self-center lg:p-5 rounded-[8px] flex items-center justify-center lg:justify-between"
                  : "text-black dark:text-white flex items-center justify-center lg:w-full w-[50px] lg:justify-between p-2 self-center lg:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <ImBooks className="text-xl" />
                <span className="hidden lg:block">Book Lists</span>
              </div>
              <FaAngleRight className="hidden lg:block" />
            </NavLink>

            <NavLink
              to={"/me/fav"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary lg:w-full w-[50px] !text-primary-foreground p-2 self-center lg:p-5 rounded-[8px] flex items-center justify-center lg:justify-between"
                  : "text-black dark:text-white flex items-center justify-center lg:w-full w-[50px] lg:justify-between p-2 self-center lg:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <GoHeart className="text-xl" />
                <span className="hidden lg:block">Favorite Books</span>
              </div>
              <FaAngleRight className="hidden lg:block" />
            </NavLink>

            <NavLink
              to={"/me/history"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary lg:w-full w-[50px] !text-primary-foreground p-2 self-center lg:p-5 rounded-[8px] flex items-center justify-center lg:justify-between"
                  : "text-black dark:text-white flex items-center justify-center lg:w-full w-[50px] lg:justify-between p-2 self-center lg:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <IoMdBookmarks className="text-xl" />
                <span className="hidden lg:block">History</span>
              </div>
              <FaAngleRight className="hidden lg:block" />
            </NavLink>

            <NavLink
              to={"/me/change-password"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary lg:w-full w-[50px] !text-primary-foreground p-2 self-center lg:p-5 rounded-[8px] flex items-center justify-center lg:justify-between"
                  : "dark:text-white text-black flex items-center justify-center lg:w-full w-[50px] lg:justify-between p-2 self-center lg:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <FaUser />
                <span className="hidden lg:block">Change Password</span>
              </div>
              <FaAngleRight className="hidden lg:block" />
            </NavLink>

            <NavLink
              to={"/me/restore"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary lg:w-full w-[50px] !text-primary-foreground p-2 self-center lg:p-5 rounded-[8px] flex items-center justify-center lg:justify-between"
                  : "dark:text-white text-black flex items-center justify-center lg:w-full w-[50px] lg:justify-between p-2 self-center lg:p-5 rounded-[8px]"
              }
            >
              <div className="flex items-center gap-3">
                <FaTrashAlt />
                <span className="hidden lg:block">Recently Deleted</span>
              </div>
              <FaAngleRight className="hidden lg:block" />
            </NavLink>
          </div>

          <button
            onClick={LogOut}
            className="flex items-center justify-center gap-3 px-4 py-10 font-bold border-t border-border dark:text-white text-secondary-foreground"
          >
            <CiLogout className="text-2xl font-bold" />
            <span className="hidden lg:block ">Sign Out</span>
          </button>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
