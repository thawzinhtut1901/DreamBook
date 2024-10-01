import { Logo } from "@/assets";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { getToken } from "@/services/authService";
import { useGetMe } from "@/hooks/useUser";
import { FaAngleDown, FaHeart } from "react-icons/fa";
import ProfileDropdown from "./ui/profile-dropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "../contexts/AuthContext";
import { Skeleton } from "./ui/skeleton";

const NavBar = () => {
  const token = getToken() || "";
  const { setShowMenu } = useAuth();
  const { data, isLoading } = useGetMe(token);
  return (
    <div className=" flex justify-between items-center dark:shadow-neutral-700 dark:bg-dark-bg bg-white shadow-slate-300 shadow-sm px-6 lg:px-40 py-2 lg:py-6 w-full h-[70px] font-Inter ">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowMenu(true)}
          className="text-xl font-bold lg:hidden dark:text-white"
        >
          <RxHamburgerMenu />
        </button>
        <NavLink to={"/"}>
          <div className="w-[45px] lg:w-[70px]">
            <img src={Logo} alt="Logo" className="w-full" />
          </div>
        </NavLink>
      </div>
      <nav className="items-center hidden gap-5 lg:flex">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-primary  !text-primary-foreground h-10 w-32 rounded-md"
              : "text-black dark:text-white"
          }
          to={"/"}
        >
          <Button variant={"ghost"}>Home</Button>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-primary !text-primary-foreground h-10 w-32 rounded-md"
              : "text-black dark:text-white"
          }
          to={"/library"}
        >
          <Button variant={"ghost"}>Library</Button>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-primary !text-primary-foreground h-10 w-32 rounded-md"
              : "text-black dark:text-white"
          }
          to={"/book-create"}
        >
          <Button variant={"ghost"}>Book Crafting</Button>
        </NavLink>
      </nav>

      {!token ? (
        <div className="flex items-center gap-2">
          <NavLink className="hidden lg:block" to="/auth/login">
            <Button variant={"ghost"} className="flex items-center gap-2 dark:text-white">
              <HiMiniUserCircle className="text-2xl" /> Login
            </Button>
          </NavLink>
          <NavLink to="/auth/signup">
            <Button size={"md"}>Register</Button>
          </NavLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <NavLink
            className="flex-col items-center justify-end hidden lg:flex"
            to="/me/fav"
          >
            <FaHeart className="text-lg font-bold text-red-600" />
            <span className="text-sm font-semibold dark:text-white">
              Fav Books
            </span>
          </NavLink>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 bg-gray-200 rounded-full" />
              <FaAngleDown className="dark:text-white" />
            </div>
          ) : (
            <ProfileDropdown data={data!} />
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
