import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Input } from "./input";
import { ImBooks } from "react-icons/im";
import { GoHeart } from "react-icons/go";
import { profileFetchData } from "@/types/types";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { logout } from "@/services/authService";
import { CiLogout } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "@/assets";
import { useTheme } from "../../contexts/ThemeContext";

const ProfileDropdown = ({ data }: { data: profileFetchData }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const logoutHandler = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setShowLogoutDialog(false);
    navigate("/");
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <img
            src={data.profilePicture ? data.profilePicture : Avatar}
            alt={data.name}
            className="w-10 h-10 rounded-full"
          />
          <FaAngleDown className="dark:text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px] md:w-[220px]">
          <DropdownMenuLabel>
            <div className="flex items-center gap-3">
              <img
                src={data.profilePicture ? data.profilePicture : Avatar}
                alt={data.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-lg font-bold text-black dark:text-white">
                  {data.name}
                </p>
                <p className="block w-[100px] md:w-[120px] overflow-hidden text-sm opacity-50 dark:text-white line-clamp-1 text-ellipsis">
                  {data.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="!border-none">
            <h3 className="px-2 font-bold text-[18px] dark:text-white text-black">
              Account
            </h3>
          </DropdownMenuLabel>
          <NavLink to="/me/info">
            <DropdownMenuItem>
              <div className="flex items-center gap-1 px-2">
                <FaUser className="text-[16px]" />
                <p>Profile</p>
              </div>
            </DropdownMenuItem>
          </NavLink>
          <NavLink to="/me/books">
            <DropdownMenuItem>
              <div className="flex items-center gap-1 px-2">
                <ImBooks className="text-[16px]" />
                <p>Book Lists</p>
              </div>
            </DropdownMenuItem>
          </NavLink>
          <NavLink to="/me/fav">
            <DropdownMenuItem>
              <div className="flex items-center gap-1 px-2">
                <GoHeart className="text-[16px]" />
                <p>Favorite Books</p>
              </div>
            </DropdownMenuItem>
          </NavLink>
          <DropdownMenuLabel className="!border-none">
            <h3 className="px-2 font-bold text-[18px] dark:text-white text-black">
              Theme
            </h3>
          </DropdownMenuLabel>

          <div className="flex flex-col gap-2 pb-2 text-sm">
            <div className="flex items-center gap-2 px-2 mx-4">
              <Input
                className="w-3 h-3 rounded-none"
                type="radio"
                value="light"
                checked={theme === "light"}
                onChange={(event) => {
                  setTheme(event.currentTarget.value);
                }}
                name="theme"
                id="light"
              />
              <label className="flex items-center gap-1" htmlFor="light">
                Light Mode <CiLight className="text-xl" />
              </label>
            </div>

            <div className="flex items-center gap-2 px-2 mx-4">
              <Input
                className="w-3 h-3 rounded-none"
                type="radio"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={(event) => {
                  setTheme(event.currentTarget.value);
                }}
                id="dark"
              />
              <label className="flex items-center gap-1" htmlFor="dark">
                Dark Mode <MdDarkMode />
              </label>
            </div>

            <div className="flex items-center gap-2 px-2 pb-2 mx-4 border-b border-border">
              <Input
                className="w-3 h-3 rounded-none"
                type="radio"
                name="theme"
                value="system"
                onChange={(event) => {
                  setTheme(event.currentTarget.value);
                }}
                id="system"
                checked={theme === "system"}
              />
              <label htmlFor="system">System</label>
            </div>
          </div>
          <DropdownMenuLabel className="flex justify-center !border-none">
            <button
              onClick={logoutHandler}
              className="flex items-center gap-1 font-medium text-primary"
            >
              <CiLogout className="text-lg font-bold" />
              Log Out
            </button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-white bg-red-500 rounded-md"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
